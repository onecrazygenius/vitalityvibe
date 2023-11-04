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

const formSchema = z.object({
    start: z.date(),
    end: z.date(),
    duration: z.number(),
    quality: z.number(),
})

type FormValues = z.infer<typeof formSchema>

type SleepFormProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

export function SleepForm({ open, setOpen }: SleepFormProps) {
    const [loading, setLoading] = useState(false)
    const [hours, setHours] = useState<number | ''>(0);
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
        const inputValue = event.target.value;
        const inputMinutes = inputValue !== '' ? +inputValue * 60 : ''; // Convert to minutes or empty string
        setHours(inputMinutes);
        field.onChange(inputMinutes); // Set field value to minutes
    };

    const onSubmit = async (data: FormValues) => {
        setLoading(true)
        try {
            const session = await getSession()
            const token = session?.user.jwt
            console.log(token)
            const res = fetch('/server/metrics/sleep', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            toast({
                title: "Sleep added!",
                description: "Your sleep has been added.",
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
                name="start"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Start Time</FormLabel>
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
                        When did you fall asleep?
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>End Time</FormLabel>
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
                            When did you wake up?
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
                                value={hours === '' ? '' : hours / 60} // Display empty string or hours
                                onChange={(event) => handleInputChange(event, field)}
                            />
                        </FormControl>
                        <FormDescription>
                            How long did you sleep?
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quality"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Quality</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                className="form-input"
                                {...field}
                                onChange={event => field.onChange(+event.target.value)}
                            />
                        </FormControl>
                        <FormDescription>
                            How well did you sleep?
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