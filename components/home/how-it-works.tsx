import { CalendarDays, CreditCard, PackageCheck, Search, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"

const STEPS: { title: string; text: string; Icon: LucideIcon }[] = [
    { title: "Find equipment", text: "Search by name, location or category and compare prices.", Icon: Search },
    { title: "Pick your dates", text: "Choose start and end dates. The total price updates instantly.", Icon: CalendarDays },
    { title: "Pay securely", text: "Confirm your booking and pay with Stripe in a minute.", Icon: CreditCard },
    { title: "Receive and return", text: "Get it delivered, use it, and return it when the rental ends.", Icon: PackageCheck },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="container-page section-y scroll-mt-20">
            <Reveal>
                <SectionHeading eyebrow="How it works" title="Four easy steps to your rental" />
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map(({ title, text, Icon }, index) => (
                    <Reveal key={title} delay={index * 0.08} className="h-full">
                        <div className="card-soft relative h-full p-6">
                            <span className="absolute right-5 top-4 font-heading text-4xl font-bold text-primary/15">
                                {index + 1}
                            </span>
                            <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                                <Icon className="size-6" />
                            </span>
                            <h3 className="mt-5 font-heading font-semibold">{title}</h3>
                            <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}