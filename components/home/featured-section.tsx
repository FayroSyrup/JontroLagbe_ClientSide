import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { EquipmentCard } from "@/components/shared/equipment-card"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import type { EquipmentRow } from "@/lib/types/equipment"

export function FeaturedSection({ items, isLoggedIn }: { items: EquipmentRow[]; isLoggedIn: boolean }) {
    return (
        <section className="container-page section-y">
            <Reveal>
                <SectionHeading
                    eyebrow="Featured"
                    title="Fresh equipment, ready to rent"
                    subtitle="Hand picked listings from verified owners. Book in a few clicks."
                />
            </Reveal>

            {items.length === 0 ? (
                <div className="mt-12">
                    <EmptyState title="No equipment yet" text="Approved equipment will show up here." />
                </div>
            ) : (
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                        <Reveal key={item._id} delay={index * 0.06} className="h-full">
                            <EquipmentCard item={item} isLoggedIn={isLoggedIn} />
                        </Reveal>
                    ))}
                </div>
            )}

            <div className="mt-10 text-center">
                <Link href="/equipment" className={buttonVariants({ variant: "outline", size: "lg" })}>
                    Browse all equipment <ArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    )
}