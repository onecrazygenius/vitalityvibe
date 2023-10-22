import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/profile-form"

import PageTransition from "@/components/page-transition"
import { getServerSession } from "next-auth";

export default async function SettingsProfilePage() {

  // get the user session
  const session = await getServerSession()
  if (!session) return null
  const user = session.user

  return (
    <PageTransition>
        <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
            </p>
        </div>
        <Separator />
        <ProfileForm user={user} />
        </div>
    </PageTransition>
  )
}