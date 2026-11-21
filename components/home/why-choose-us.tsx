import { CalendarClock, Lock, ShieldCheck, Wallet, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"

const BENEFITS: { title: string; text: string; Icon: LucideIcon }[] = [
    { title: "Affordable prices", text: "Rent only for the days you need instead of buying costly equipment.", Icon: Wallet },
    { title: "Verified owners", text: "Every listing is checked and approved by our team before it goes live.", Icon: ShieldCheck },
    { title: "Flexible periods", text: "Choose daily, weekly or monthly rental to match your project.", Icon: CalendarClock },
    { title: "Secure payments", text: "Pay online with Stripe. Your card details never touch our server.", Icon: Lock },
]

export function WhyChooseUs() {
    return (
        <section className="container-page section-y">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <Reveal>
                    <SectionHeading
                        align="left"
                        eyebrow="Why choose us"
                        title="Renting made simple, safe and fair"
                        subtitle="We connect owners and customers in one transparent marketplace, so both sides know what to expect."
                    />
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2">
                    {BENEFITS.map(({ title, text, Icon }, index) => (
                        <Reveal key={title} delay={index * 0.08} className="h-full">
                            <div className="card-soft h-full p-6">
                                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                                    <Icon className="size-5" />
                                </span>
                                <h3 className="mt-4 font-heading font-semibold">{title}</h3>
                                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}