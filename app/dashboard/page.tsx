import { redirect } from "next/navigation"
import { requireUser } from "@/lib/core/server"
import { dashboardPath } from "@/lib/types/user"

// /dashboard sends each role to its own dashboard
export default async function DashboardIndex() {
    const session = await requireUser()
    redirect(dashboardPath(session.user.role as string))
}