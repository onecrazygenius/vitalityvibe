import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

type MainNavProps = {
  session?: any
}

type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export function MainNav({session}: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  let items: NavItem[] = []

  if (session) {
    items = [
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Metrics",
        href: "/metrics",
      }
    ]
  } else {
    items = [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "About",
        href: "/about",
      }
    ]
  }

  // get current path segment
  const segment = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : ""

  return (
    <div className="flex gap-6 md:gap-10">
      <a href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          VitalityVibe
        </span>
      </a>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <a
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items} />
      )}
    </div>
  )
}