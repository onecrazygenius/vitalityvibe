import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default async function IndexPage() {

  const features = [
    {
      "title": "Goals",
      "description": "Set goals and track your progress. Create a plan and stick to it.",
      "icon": <Icons.goals className="w-12 h-12" />
    },
    {
      "title": "Circles",
      "description": "Create circles and share your progress with your friends and family.",
      "icon": <Icons.circles className="w-12 h-12" />
    },
    {
      "title": "Subscription",
      "description": "Free and paid subscriptions using Stripe.",
      "icon": <Icons.stripe className="w-12 h-12" />
    }
  ]

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          {/* 
            TODO: remove currently in beta 
          */}
          <span className="text-xs font-bold text-white bg-teal-500 rounded-full px-2 py-1 uppercase tracking-wide">
            v0.1.0 Beta Build
          </span>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            An new way to lead a &nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">
              healthy
            </span> 
            &nbsp;life.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            VitalityVibe is a new way to lead a healthy life. We provide you with the tools to track your health and wellness, 
            and share it with your friends and family. 
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "px-4"
              )}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
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
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          { features.map((feature) => (
            <div 
              key={feature.title}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                {feature.icon}
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
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            We also have guides to help you get started with your fitness journey with
            VitalityVibe.{" "}
            <Link
              href="/"
              className="underline underline-offset-4"
            >
              Learn more
            </Link>
          </p>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            VitalityVibe is open source and powered by open source software. <br />{" "}
            The code is available on{" "}
            {/* Github button */}
            <Link
              href="/"
              className="underline underline-offset-4"
            >
              Github
              <Icons.gitHub className="inline-block w-4 h-4 ml-1" />
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}