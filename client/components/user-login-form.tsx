"use client"

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// zod form for validation
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // validate the form
    const formValues = { email, password};
    const validation = loginFormSchema.safeParse(formValues);

    if (!validation.success) {
      // TODO: display error message
      console.error(validation.error);
      setIsLoading(false);
      return;
    }

    // api url
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/auth/signup` : "/auth/signup";

    try {

      // set the headers
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");

      // try to send the request to the api
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers
      });

      // check for errors
      if (!response.ok) {
        // log the error
        console.error(response.statusText);
        setIsLoading(false);
        return;
      }

      // check for jwt token
      const { token } = await response.json();

      // set the jwt token
      if (token) {
        // set the jwt token
        localStorage.setItem("jwt", token);
      }

      // handle the response
      if (response.ok) {
        window.location.href = "/";
        return;
      }

    } catch (error) {
      // log the error
      console.error(error);
    } finally {
      // clear the loading state
      setTimeout(() => {
        setIsLoading(false);
        // reset password fields if failed
        setPassword("");
      }, 3000);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2"> 
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <div className="grid gap-1" />
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
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
