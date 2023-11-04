import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover"
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { getSession } from "@/lib/api"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

/* JSON
    createBy: "2"
    createDate: "2023-11-03T19:34:12.043904"
    duration: 540
    endTime: "2023-11-01T08:00:00"
    id: 1
    quality: 90
    startTime: "2023-10-31T22:00:00"
*/

const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']

const formSchema = z.object({
    datetime: z.date(),
    description: z.string(),
    type: z.enum(mealTypes),
    calories: z.number(),
})

type FormValues = z.infer<typeof formSchema>

type MealFormProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

export function MealForm({ open, setOpen }: MealFormProps) {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormValues) => {
        setLoading(true)
        try {
            const session = await getSession()
            const token = session?.user.jwt
            const res = fetch('/server/metrics/meal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            toast({
                title: "Success",
                description: "Meal added.",
            })
            setOpen(false)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong.",
            })
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="datetime"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        When did you eat?
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {mealTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type.charAt(0) + type.slice(1).toLowerCase()}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormDescription>
                            What sort of meal was it?
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                className="form-input"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            What did you eat?
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Calories</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                className="form-input"
                                {...field}
                                onChange={event => field.onChange(+event.target.value)}
                            />
                        </FormControl>
                        <FormDescription>
                            How many calories did you eat?
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                    type="submit"
                    disabled={loading}
                >
                    Submit
                </Button>
            </form>
        </Form>
    )
}