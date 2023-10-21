"use client";

import Link from "next/link"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

import { UserAuthForm } from "@/components/user-login-form"
import { Icons } from "@/components/icons"
import { 
  Button,
  buttonVariants,
} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import PageTransition from "@/components/page-transition"

type AuthenticationPageProps = {}
type AuthenticationPageRef = React.ForwardedRef<HTMLDivElement>

export default function AuthenticationPage(
  props: AuthenticationPageProps,
  ref: AuthenticationPageRef
) {
  const { setTheme } = useTheme()

  return (
    <PageTransition ref={ref}>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-screen">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Signup
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.logo className="mr-2 h-6 w-6" />
            <Link href="/" className="hover:text-gray-300">
              Vitality Vibe
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;
                <span className="text-xl font-semibold italic">
                  The ability to track my exercise progress and share with my
                  friends is amazing. I love using Vitality Vibe!
                </span>
                &rdquo;
              </p>
              <footer className="text-sm">Jamie Young</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to continue
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {/* Bottom right button for theme */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="absolute bottom-4 right-4 z-50"
              >
                <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </PageTransition>
  )
}