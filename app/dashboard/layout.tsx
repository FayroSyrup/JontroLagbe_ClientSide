import { requireUser } from "@/lib/core/server"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await requireUser()

    return (
        <DashboardShell
            user={{
                name: session.user.name,
                email: session.user.email,
                image: session.user.image ?? null,
                role: (session.user.role as string) || "customer",
            }}
        >
            {children}
        </DashboardShell>
    )
}