import { cn } from "@/lib/utils"

// every section uses this, so all headings look the same
export function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = "center",
    className,
}: {
    eyebrow: string
    title: string
    subtitle?: string
    align?: "center" | "left"
    className?: string
}) {
    return (
        <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="section-title mt-2">{title}</h2>
            {subtitle ? <p className={cn("section-sub", align === "center" && "mx-auto")}>{subtitle}</p> : null}
        </div>
    )
}