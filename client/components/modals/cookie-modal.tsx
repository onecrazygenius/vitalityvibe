"use client"

import * as z from "zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { 
    CardTitle, 
    CardDescription, 
    CardHeader, 
    CardContent, 
} from "@/components/ui/card"
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Modal } from "@/components/ui/modal"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useCookieModal } from "@/hooks/use-cookie-modal";
import { useToast } from "@/components/ui/use-toast"

const schema = z.object({
    essential: z.boolean(),
    analytics: z.boolean(),
    marketing: z.boolean(),
})

export function CookieModal() {
    const cookieModal = useCookieModal();
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("cookie="))
        ?.split("=")[1]

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            essential: cookie ? JSON.parse(cookie).essential : true,
            analytics: cookie ? JSON.parse(cookie).analytics : false,
            marketing: cookie ? JSON.parse(cookie).marketing : false,
        },
    })

    const selectAll = () => {
        form.setValue("essential", true)
        form.setValue("analytics", true)
        form.setValue("marketing", true)
    }

    const onSubmit = (data: z.infer<typeof schema>) => {
        setLoading(true)

        // create a react cookie with the data
        const cookie = {
            essential: data.essential,
            analytics: data.analytics,
            marketing: data.marketing,
        }
        document.cookie = `cookie=${JSON.stringify(cookie)};max-age=31536000;path=/;`

        toast({
            title: "Cookie Preferences Saved",
            description: "Your cookie preferences have been saved.",
            variant: "success",
        })

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <Modal
            isOpen={cookieModal.isOpen} 
            onClose={cookieModal.onClose}
        >
            <CardHeader className="border-b border-dark-gray-300 pb-4">
                <div className="flex items-center">
                <svg
                    className=" mr-2"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M16 15.5v.01" />
                    <path d="M12 12v.01" />
                    <path d="M11 17v.01" />
                    <path d="M7 14v.01" />
                </svg>
                <CardTitle>Cookie Preferences</CardTitle>
                </div>
                <CardDescription>
                Manage your cookie settings. You can enable or disable different types of cookies below.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="essential"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-start space-y-2">
                                    <div>
                                        <FormLabel htmlFor="essential">Essential Cookies</FormLabel>
                                        <FormDescription className="text-dark-gray-500 text-sm">
                                        These cookies are required for the website to function properly.
                                        </FormDescription>
                                    </div>
                                    <FormControl className="ml-auto">
                                        <Switch 
                                            id="essential" 
                                            className="ml-auto" 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="analytics"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-start space-y-2">
                                    <div>
                                        <FormLabel htmlFor="analytics">Analytics Cookies</FormLabel>
                                        <FormDescription className="text-dark-gray-500 text-sm">
                                        These cookies allow us to count visits and traffic sources, so we can measure and improve the performance
                                        of our site.
                                        </FormDescription>
                                    </div>
                                    <FormControl className="ml-auto">
                                        <Switch 
                                            id="analytics"
                                            className="ml-auto" 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marketing"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-start space-y-2">
                                    <div>
                                        <FormLabel htmlFor="marketing">Marketing Cookies</FormLabel>
                                        <FormDescription className="text-dark-gray-500 text-sm">
                                        These cookies are used by advertising companies to serve ads that are relevant to your interests.
                                        </FormDescription>
                                    </div>
                                    <FormControl className="ml-auto">
                                        <Switch 
                                            id="marketing"
                                            className="ml-auto" 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="border-t border-dark-gray-300 mt-4" />
                        <div className="flex items-center justify-between">
                            <Label className="text-dark-gray-500 text-sm">
                                <a
                                    className="underline underline-offset-4 cursor-pointer"
                                    onClick={selectAll}
                                >
                                    Select All
                                </a>
                            </Label>
                            <Button 
                                className="ml-auto" 
                                type="submit"
                                onClick={cookieModal.onClose}
                                >
                            Save Preferences
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Form>
        </Modal>
    )
}