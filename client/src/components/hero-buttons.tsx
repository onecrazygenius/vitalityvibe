import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroButtons() {
    return (
        <div className="space-x-4">
            <a href="/auth/login" className={cn(buttonVariants({ size: "lg" }), "focus:animate-bounce")}>
            Get Started
            </a>
            <a
            href="/"
            className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "px-4"
            )}
            >
            Learn More
            </a>
	  </div>
    )
}