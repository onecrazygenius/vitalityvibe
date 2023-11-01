import "@/styles/globals.css"
import { Icons } from "@/components/icons"

export function HeroFeatures() {
    const features = [
        {
            title: "Goals",
            description: "Set goals and track your progress. Create a plan and stick to it.",
            iconType: "goals"
        },
        {
            title: "Circles",
            description: "Create circles and share your progress with your friends and family.",
            iconType: "circles"
        },
        {
            title: "Subscription",
            description: "Free and paid subscriptions using Stripe.",
            iconType: "stripe"
        }
    ]

    const getIcon = (iconType: string) => {
        switch (iconType) {
            case "goals":
                return <Icons.goals className="w-12 h-12 text-foreground" />
            case "circles":
                return <Icons.circles className="w-12 h-12 text-foreground" />
            case "stripe":
                return <Icons.stripe className="w-12 h-12 text-foreground" />
            default:
                return <Icons.goals className="w-12 h-12 text-foreground" />
        }
    }

    return (
        <section
            id="features"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Vitality Vibe aims to bring the best of a healthy lifestyle and social media together.
                We utilise tracking and connectivity to help you achieve your goals and share your progress with your friends and family. 
                You are at the center of journey and we are here to guide you along the way.
            </p>
            </div>
            <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                We also have guides to help you get started with your fitness journey with
                VitalityVibe.{" "}
                <a
                href="/"
                class="underline underline-offset-4"
                >
                Learn more
                </a>
            </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                { features.map((feature) => (
                    <div 
                    key={feature.title}
                    className="relative overflow-hidden rounded-lg border bg-background p-2"
                    >
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        {getIcon(feature.iconType)}
                        <div className="space-y-2">
                        <h3 className="font-bold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {feature.description}
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </section>
    )
}