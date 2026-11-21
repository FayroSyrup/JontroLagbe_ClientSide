import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"

export function CtaBanner() {
    return (
        <section className="container-page section-y">
            <Reveal>
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-12">
                    <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary-foreground/10" />
                    <div className="absolute -bottom-20 -left-10 size-64 rounded-full bg-primary-foreground/10" />
                    <h2 className="relative font-heading text-3xl font-bold md:text-4xl">
                        Got equipment sitting idle?
                    </h2>
                    <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/85">
                        List it on JontroLagbe and earn from every rental. It takes only a few minutes.
                    </p>
                    <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                        <Link href="/sign-up" className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "h-11")}>
                            Get started
                        </Link>
                        <Link
                            href="/equipment"
                            className={cn(
                                buttonVariants({ size: "lg", variant: "ghost" }),
                                "h-11 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
                            )}
                        >
                            Browse equipment
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}