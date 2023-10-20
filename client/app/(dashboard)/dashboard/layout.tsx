
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { dashboardConfig } from "@/config/dashboard"
import { UserAccountNav } from "@/components/user-account-nav"

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: "Name",
              image: "",
              email: "email@email.com",
            }}
          />
        </div>
      </header>
      <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      <SiteFooter/>
    </div>
  )
}