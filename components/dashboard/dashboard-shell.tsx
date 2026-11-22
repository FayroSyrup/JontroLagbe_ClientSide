"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    ClipboardList,
    CirclePlus,
    Heart,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Receipt,
    UserRound,
    Users,
    type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { ROLE_LABEL, type UserRole } from "@/lib/types/user"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserAvatar } from "@/components/shared/user-avatar"

type ShellUser = { name: string; email: string; image: string | null; role: string }
type NavItem = { label: string; href: string; Icon: LucideIcon; exact?: boolean }

const NAV: Record<string, NavItem[]> = {
    customer: [
        { label: "My Rentals", href: "/dashboard/customer/my-rentals", Icon: Receipt },
        { label: "Favorites", href: "/dashboard/customer/favorites", Icon: Heart },
        { label: "Profile", href: "/dashboard/customer/profile", Icon: UserRound },
    ],
    owner: [
        { label: "Overview", href: "/dashboard/owner", Icon: LayoutDashboard, exact: true },
        { label: "Add Equipment", href: "/dashboard/owner/add-equipment", Icon: CirclePlus },
        { label: "My Equipment", href: "/dashboard/owner/my-equipment", Icon: Package },
        { label: "My Equipment Rental", href: "/dashboard/owner/my-equipment-rental", Icon: ClipboardList },
        { label: "My Profile", href: "/dashboard/owner/profile", Icon: UserRound },
    ],
    admin: [
        { label: "Overview", href: "/dashboard/admin", Icon: LayoutDashboard, exact: true },
        { label: "All Users", href: "/dashboard/admin/users", Icon: Users },
        { label: "All Equipment", href: "/dashboard/admin/equipment", Icon: Package },
        { label: "All Rentals", href: "/dashboard/admin/rentals", Icon: ClipboardList },
        { label: "My Profile", href: "/dashboard/admin/profile", Icon: UserRound },
    ],
}

function SidebarContent({
    user,
    onNavigate,
    onLogout,
}: {
    user: ShellUser
    onNavigate?: () => void
    onLogout: () => void
}) {
    const pathname = usePathname()
    const items = NAV[user.role] ?? NAV.customer

    const isActive = (item: NavItem) =>
        item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/")

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-5">
                <Logo />
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive(item) &&
                                "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                        )}
                    >
                        <item.Icon className="size-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* user profile section */}
            <div className="space-y-3 border-t p-4">
                <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} image={user.image} className="size-10" />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                <Badge variant="secondary" className="capitalize">
                    {ROLE_LABEL[user.role as UserRole] ?? user.role}
                </Badge>
                <Button variant="outline" size="sm" className="w-full" onClick={onLogout}>
                    <LogOut className="size-4" /> Logout
                </Button>
            </div>
        </div>
    )
}

export function DashboardShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await authClient.signOut()
        toast.success("Logged out successfully")
        router.push("/")
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
            <aside className="sticky top-0 hidden h-screen border-r bg-sidebar lg:block">
                <SidebarContent user={user} onLogout={handleLogout} />
            </aside>

            <div className="flex min-w-0 flex-col">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur md:px-8">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            aria-label="Open menu"
                            onClick={() => setOpen(true)}
                        >
                            <Menu className="size-5" />
                        </Button>
                        <p className="font-heading font-semibold capitalize">{user.role} dashboard</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                            <Home className="size-4" /> Home
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>

                <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-72 p-0">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <SidebarContent user={user} onNavigate={() => setOpen(false)} onLogout={handleLogout} />
                </SheetContent>
            </Sheet>
        </div>
    )
}
