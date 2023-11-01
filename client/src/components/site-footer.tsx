import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { CookieConsent } from "@/components/cookie-consent"
import { useCookieModal } from "@/hooks/use-cookie-modal"

export function SiteFooter() {
  const onOpen = useCookieModal((state) => state.onOpen);
  const isOpen = useCookieModal((state) => state.isOpen);

  // try get cookie from browser
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie="))
      ?.split("=")[1];
      
    if (!cookie) {
      onOpen();
    }
  }, [onOpen]);

  return (
    <footer>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; 2023
            <a
              href="/"
              className="text-primary-500 hover:text-primary-600"
            >
              {" "}
              VitalityVibe
            </a>
            . All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <CookieConsent />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}