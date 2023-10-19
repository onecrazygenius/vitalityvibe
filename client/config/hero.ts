import { HeroConfig } from "@/types";

import { Icons } from "@/components/icons";

export const heroConfig: HeroConfig = {
    mainNav: [
        {
            title: "Docs",
            href: "/documentation"
        },
        {
            title: "Contact",
            href: "/contact"
        },
    ],
    features: [
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
};