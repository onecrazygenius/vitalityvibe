import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "@/components/forms/login-form";
import { SignupForm } from "@/components/forms/signup-form";

export function AuthPage() {

    // if current page is login, then show signup button and vice versa
    const currentPage = window.location.pathname;

    return (
    <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-screen">
        {currentPage === "/auth/login" ? (
            <a
            href="/auth/signup"
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute right-4 top-4 md:right-8 md:top-8"
            )}
            >
            Signup
            </a>
        ) : (
            <a
            href="/auth/login"
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute right-4 top-4 md:right-8 md:top-8"
            )}
            >
            Login
            </a>
        )}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.logo className="mr-2 h-6 w-6" />
            <a href="/" className="hover:text-gray-300">
                Vitality Vibe
            </a>
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
                { currentPage === "/auth/login" ? (
                    <>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password to continue
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Signup
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create an account to get started
                        </p>
                    </>
                )}
            </div>
            { currentPage === "/auth/login" ? (
            <LoginForm />
            ) : (
            <>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
                >
                Terms of Service
                </a>{" "}
                and{" "}
                <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
                >
                Privacy Policy
                </a>
                .
            </p>
            </>
            )}
            </div>
            {/* Bottom right button for theme */}
            <div className="absolute bottom-4 right-4">
                <ThemeToggle />
            </div>
        </div>
    </div>
    )
}