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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover"
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

const cardioTypes = ['CARDIO', 'STRENGTH', 'FLEXIBILITY', 'BALANCE', 'OTHER']

const formSchema = z.object({
    datetime: z.date(),
    duration: z.number(),
    calories: z.number(),
    type: z.enum(cardioTypes),
})

type FormValues = z.infer<typeof formSchema>

type ExerciseFormProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

export function ExerciseForm({ open, setOpen }: ExerciseFormProps) {
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
            const res = fetch('/server/metrics/exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            toast({
                title: "Exercise added!",
                description: "Your exercise has been added.",
            })
            setOpen(false)
            window.location.reload()
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
                    <FormLabel>Exercise Date</FormLabel>
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
                        When did you exercise?
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                className="form-input"
                                {...field}
                                onChange={event => field.onChange(+event.target.value)}
                            />
                        </FormControl>
                        <FormDescription>
                            How long did you exercise?
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
                            How many calories did you burn?
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
                                {cardioTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type.charAt(0) + type.slice(1).toLowerCase()}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormDescription>
                            What type of exercise did you do?
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