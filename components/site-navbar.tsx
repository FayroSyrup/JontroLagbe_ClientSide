import { getSession } from "@/lib/core/server"
import { NavbarClient } from "../components/navbar-client"

export async function SiteNavbar() {
    const session = await getSession()

    const user = session
        ? {
              name: session.user.name,
              image: session.user.image ?? null,
              role: (session.user.role as string) || "customer",
          }
        : null

    return <NavbarClient user={user} />
}