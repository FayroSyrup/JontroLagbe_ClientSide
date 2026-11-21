import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = { title: "Contact Us" }

const INFO: { label: string; value: string; Icon: LucideIcon }[] = [
    { label: "Address", value: "Dhaka, Bangladesh", Icon: MapPin },
    { label: "Phone", value: "+880 1700 000000", Icon: Phone },
    { label: "Email", value: "hello@jontrolagbe.com", Icon: Mail },
    { label: "Support hours", value: "Sat to Thu, 9am to 6pm", Icon: Clock },
]

export default function ContactPage() {
    return (
        <section className="bg-soft-glow">
            <div className="container-page section-y">
                <Reveal>
                    <SectionHeading
                        eyebrow="Contact us"
                        title="We are happy to help"
                        subtitle="Questions about a booking or listing? Send us a message."
                    />
                </Reveal>

                <div className="mt-12 grid gap-8 lg:grid-cols-5">
                    <div className="space-y-4 lg:col-span-2">
                        {INFO.map(({ label, value, Icon }) => (
                            <div key={label} className="card-soft flex items-center gap-4 p-5">
                                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                                    <Icon className="size-5" />
                                </span>
                                <div>
                                    <p className="text-xs text-muted-foreground">{label}</p>
                                    <p className="font-medium">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}