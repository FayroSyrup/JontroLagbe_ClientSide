import Link from "next/link"
import { Camera, Cpu, HardHat, PartyPopper, Tractor, Truck, ArrowUpRight, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Category } from "@/lib/types/equipment"

const CATEGORY_INFO: { name: Category; text: string; Icon: LucideIcon }[] = [
    { name: "Construction Equipment", text: "Drills, mixers, scaffolding and heavy tools", Icon: HardHat },
    { name: "Photography Equipment", text: "Cameras, lenses, lights and tripods", Icon: Camera },
    { name: "Vehicles & Transportation", text: "Vans, pickups and delivery vehicles", Icon: Truck },
    { name: "Agriculture Equipment", text: "Tractors, sprayers and farm tools", Icon: Tractor },
    { name: "Electronics", text: "Projectors, laptops, speakers and more", Icon: Cpu },
    { name: "Event Equipment", text: "Tents, stages, sound and lighting", Icon: PartyPopper },
]

export function CategoriesSection() {
    return (
        <section className="bg-muted/50">
            <div className="container-page section-y">
                <Reveal>
                    <SectionHeading
                        eyebrow="Categories"
                        title="Popular equipment categories"
                        subtitle="Pick a category and see what is available near you."
                    />
                </Reveal>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {CATEGORY_INFO.map(({ name, text, Icon }, index) => (
                        <Reveal key={name} delay={index * 0.06} className="h-full">
                            <Link
                                href={`/equipment?category=${encodeURIComponent(name)}`}
                                className="card-soft group flex h-full items-start gap-4 p-6 transition-all hover:-translate-y-1 hover:shadow-md"
                            >
                                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="size-6" />
                                </span>
                                <div className="flex-1">
                                    <h3 className="font-heading font-semibold">{name}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                                </div>
                                <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}