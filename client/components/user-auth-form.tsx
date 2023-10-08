"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);

  async function onProgress(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setPassword("");

    setTimeout(() => {
      setIsLoading(false);
      setShowPasswordInput(true); // Show the password input after a delay
    }, 500);
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // TODO: Send the email and password to the server
    console.log({ email, password });

    setTimeout(() => {
      setIsLoading(false);
      setEmail(""); setPassword("");
      setShowPasswordInput(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={showPasswordInput ? onSubmit : onProgress}>
        <div className="grid gap-2">
          {showPasswordInput ? (
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
          ) : (
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
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {showPasswordInput ? "Create Account" : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
