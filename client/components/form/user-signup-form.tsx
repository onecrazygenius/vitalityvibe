"use client"

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// zod form for validation
const signupFormSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(100)
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 symbol"),
  confirmPassword: z.string().min(8).max(100)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setIsLoading(true);

    const { name, email, password } = values;

    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

    try {
      // next-auth signup
      const result = await fetch(url + '/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!result.ok) {
        const errorData = await result.text() 
        
        if (errorData === "User already exists") {
          form.setError("email", {
            type: "manual",
            message: "Email unavailable.",
          });
        }

        if (errorData === "Invalid input data") {
          form.setError("email", {
            type: "manual",
            message: "Invalid fields.",
          });
        }

        throw new Error(errorData)
      } 

      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Account Created",
          description: "You have signed up!",
          duration: 5000,
        });
      }, 500);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="sr-only">
                    Display Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Your Name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="sr-only">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="sr-only">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1" />
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Account
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button> */}
      </div>
  );
}
