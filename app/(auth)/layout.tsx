import { redirect } from "next/navigation"
import { CalendarCheck, ShieldCheck, Wrench } from "lucide-react"
import { getSession } from "@/lib/core/server"
import { Logo } from "@/components/shared/logo"

const POINTS = [
    { Icon: Wrench, text: "Thousands of tools, machines and gear" },
    { Icon: ShieldCheck, text: "Verified owners and secure payments" },
    { Icon: CalendarCheck, text: "Rent by the day, week or month" },
]

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    // already logged in users do not need the login pages
    const session = await getSession()
    if (session) {
        redirect("/")
    }

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
                <div className="absolute -right-24 -top-24 size-80 rounded-full bg-primary-foreground/10" />
                <div className="absolute -bottom-32 -left-16 size-96 rounded-full bg-primary-foreground/10" />

                <Logo inverted className="relative" />

                <div className="relative">
                    <h2 className="font-heading text-4xl font-bold leading-tight">
                        Need a machine?
                        <br />
                        Rent it in minutes.
                    </h2>
                    <ul className="mt-8 space-y-4">
                        {POINTS.map(({ Icon, text }) => (
                            <li key={text} className="flex items-center gap-3 text-primary-foreground/90">
                                <span className="grid size-9 place-items-center rounded-lg bg-primary-foreground/15">
                                    <Icon className="size-4" />
                                </span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-sm text-primary-foreground/70">© JontroLagbe</p>
            </aside>

            <main className="bg-soft-glow flex flex-col items-center justify-center p-6">
                <Logo className="mb-8 lg:hidden" />
                {children}
            </main>
        </div>
    )
}