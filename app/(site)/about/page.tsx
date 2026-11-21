import type { Metadata } from "next"
import Link from "next/link"
import { Handshake, Leaf, Target, type LucideIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = { title: "About Us" }

const VALUES: { title: string; text: string; Icon: LucideIcon }[] = [
    { title: "Our mission", text: "Make good equipment reachable for everyone, without the cost of buying it.", Icon: Target },
    { title: "Trust first", text: "Owners are verified and every listing is approved before customers can see it.", Icon: Handshake },
    { title: "Less waste", text: "Shared equipment means fewer machines sitting unused and a lighter footprint.", Icon: Leaf },
]

export default function AboutPage() {
    return (
        <>
            <section className="bg-soft-glow">
                <div className="container-page section-y">
                    <Reveal>
                        <SectionHeading
                            eyebrow="About us"
                            title="A fair marketplace for renting equipment"
                            subtitle="JontroLagbe means 'machine needed'. We help owners earn from idle equipment and help customers find exactly what they need."
                        />
                    </Reveal>
                </div>
            </section>

            <section className="container-page section-y">
                <div className="grid gap-5 md:grid-cols-3">
                    {VALUES.map(({ title, text, Icon }, index) => (
                        <Reveal key={title} delay={index * 0.08} className="h-full">
                            <div className="card-soft h-full p-7">
                                <span className="grid size-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                                    <Icon className="size-6" />
                                </span>
                                <h3 className="mt-5 font-heading text-lg font-semibold">{title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/equipment" className={buttonVariants({ size: "lg" })}>
                        Start browsing
                    </Link>
                </div>
            </section>
        </>
    )
}