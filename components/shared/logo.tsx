import Link from "next/link"
import { Cog } from "lucide-react"
import { cn } from "@/lib/utils"

// same logo size and style everywhere
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
    return (
        <Link href="/" className={cn("flex items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-9 place-items-center rounded-xl",
                    inverted ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                )}
            >
                <Cog className="size-5" />
            </span>
            <span className="font-heading text-xl font-bold tracking-tight">JontroLagbe</span>
        </Link>
    )
}