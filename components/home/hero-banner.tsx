"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, Search, ShieldCheck } from "lucide-react"

import { HERO_IMAGE } from "@/lib/constants"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroBanner() {
    return (
        <section className="bg-soft-glow">
            <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                        <BadgeCheck className="size-4 text-primary" /> Trusted equipment rental marketplace
                    </span>

                    <h1 className="mt-5 font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                        Rent the right equipment,{" "}
                        <span className="text-primary">only when you need it.</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                        Browse machines, cameras, vehicles and event gear from verified owners. Book for a day, a week
                        or a month and pay securely online.
                    </p>

                    {/* quick search, opens the All Equipment page */}
                    <form action="/equipment" className="mt-8 flex max-w-lg gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input name="search" placeholder="Search camera, drill, tractor..." className="h-12 bg-card pl-9" />
                        </div>
                        <Button type="submit" className="h-12 px-6">
                            Search
                        </Button>
                    </form>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link href="/equipment" className={cn(buttonVariants({ size: "lg" }), "h-11")}>
                            Browse equipment <ArrowRight className="size-4" />
                        </Link>
                        <Link href="/sign-up" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11")}>
                            List your equipment
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                >
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl border bg-secondary shadow-lg">
                        <img src={HERO_IMAGE} alt="Construction equipment at work" className="size-full object-cover" />
                    </div>

                    <motion.div
                        className="card-soft absolute -bottom-5 left-4 flex items-center gap-3 px-4 py-3 shadow-lg md:-left-6"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <span className="grid size-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                            <ShieldCheck className="size-5" />
                        </span>
                        <div>
                            <p className="text-sm font-semibold">Verified owners</p>
                            <p className="text-xs text-muted-foreground">Every listing is approved</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute -top-4 right-4 rounded-2xl bg-highlight px-4 py-2 text-sm font-semibold text-highlight-foreground shadow-lg"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                        From $15 / day
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}