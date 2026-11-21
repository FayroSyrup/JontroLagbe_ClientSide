import { ChevronDown } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"

const FAQS = [
    { q: "How is the rental price calculated?", a: "The price depends on the rental type. Daily items are charged per day, weekly items per started week and monthly items per started month, multiplied by the quantity." },
    { q: "Can I rent more than one item?", a: "Yes. Choose the quantity in the booking form. We check that enough items are free for your dates." },
    { q: "Is my payment safe?", a: "Payments are handled by Stripe. We never see or store your card details." },
    { q: "What if I do not pay after booking?", a: "Unpaid bookings are held for 30 minutes and then released automatically so others can book." },
    { q: "How can I list my own equipment?", a: "Create an account and ask an admin to switch it to an Owner account. Then add your equipment and wait for approval." },
]

export function FaqSection() {
    return (
        <section className="bg-muted/50">
            <div className="container-page section-y">
                <Reveal>
                    <SectionHeading eyebrow="FAQ" title="Questions people often ask" />
                </Reveal>

                <Reveal className="mx-auto mt-10 max-w-3xl space-y-3">
                    {FAQS.map((faq) => (
                        <details key={faq.q} className="card-soft group px-5 py-4">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                                {faq.q}
                                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
                        </details>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}