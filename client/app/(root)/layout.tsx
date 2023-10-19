import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { heroConfig } from "@/config/hero"

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={heroConfig.mainNav} />
          <nav>
            <Link 
              href="/signup" 
              className={cn(
                buttonVariants({ size: "sm" }),
                "animate-pulse"
              )}>
              Sign Up
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
                "ml-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter/>
    </div>
  )
}