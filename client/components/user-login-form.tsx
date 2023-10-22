"use client"

import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react"

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
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);

    const { email, password } = values;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: `${window.location.origin}/dashboard`
    })

    if (result?.error) {
  
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
        duration: 5000,
      });

      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Success",
          description: "You have successfully logged in.",
          duration: 5000,
        });
      }, 1000);
  
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                   className="sr-only"
                   htmlFor="email"
                  >Email</FormLabel>
                  <FormControl>
                    <Input
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
            )}/>    
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                   className="sr-only"
                   htmlFor="password"
                  >Password</FormLabel>
                  <FormControl>
                    <Input
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
            )}/>
          </div>
          <div className="grid gap-1" />
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
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
