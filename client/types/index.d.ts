import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type SiteConfig = {
    title: string
    description: string
    url: string
    ogImage: string
    links: {
        github: string
    }
}

export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MainNavItem = NavItem

export type FeatureItem = {
    title: string
    description: string
    iconType: string
}

export type HeroConfig = {
    mainNav: MainNavItem[],
    features: FeatureItem[]
}