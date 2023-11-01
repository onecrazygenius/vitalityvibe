import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function AuthButtons() {
    return (<>
        <a href="/auth/signup" 
            className={cn(
                buttonVariants({ size: "sm" })
            )}>
            Sign Up
        </a>
        <a href="/auth/login"
            className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
                "ml-4"
            )}>
            Login
        </a></>
    )
}