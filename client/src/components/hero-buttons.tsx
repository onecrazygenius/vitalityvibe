import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroButtons() {
    return (
        <div className="space-x-4">
            <a href="/login" className={cn(buttonVariants({ size: "lg" }), "animate-pulse")}>
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