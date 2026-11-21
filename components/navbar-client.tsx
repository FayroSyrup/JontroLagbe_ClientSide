"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, LogOut, Menu } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { dashboardPath } from "@/lib/types/user"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserAvatar } from "@/components/shared/user-avatar"

type NavUser = { name: string; image: string | null; role: string } | null

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "All Equipment", href: "/equipment" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
]

export function NavbarClient({ user }: { user: NavUser }) {
    const pathname = usePathname()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const isActive = (href: string) =>
        !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href))

    const handleLogout = async () => {
        await authClient.signOut()
        toast.success("Logged out successfully")
        setOpen(false)
        router.push("/")
        router.refresh()
    }

    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
            <div className="container-page flex h-16 items-center justify-between gap-4">
                <Logo />

                {/* desktop links */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                                isActive(link.href) && "bg-secondary text-secondary-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <ThemeToggle />
                    {user ? (
                        <>
                            <UserAvatar name={user.name} image={user.image} />
                            <Link href={dashboardPath(user.role)} className={buttonVariants({ variant: "secondary" })}>
                                <LayoutDashboard className="size-4" /> Dashboard
                            </Link>
                            <Button variant="outline" onClick={handleLogout}>
                                <LogOut className="size-4" /> Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
                                Login
                            </Link>
                            <Link href="/sign-up" className={buttonVariants()}>
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* mobile menu button */}
                <div className="flex items-center gap-1 lg:hidden">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setOpen(true)}>
                        <Menu className="size-5" />
                    </Button>
                </div>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="w-72">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-1 px-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground",
                                    isActive(link.href) && "bg-secondary text-secondary-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-4 flex flex-col gap-2 px-4">
                        {user ? (
                            <>
                                <Link
                                    href={dashboardPath(user.role)}
                                    onClick={() => setOpen(false)}
                                    className={buttonVariants({ variant: "secondary" })}
                                >
                                    <LayoutDashboard className="size-4" /> Dashboard
                                </Link>
                                <Button variant="outline" onClick={handleLogout}>
                                    <LogOut className="size-4" /> Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/sign-in" onClick={() => setOpen(false)} className={buttonVariants({ variant: "outline" })}>
                                    Login
                                </Link>
                                <Link href="/sign-up" onClick={() => setOpen(false)} className={buttonVariants()}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}