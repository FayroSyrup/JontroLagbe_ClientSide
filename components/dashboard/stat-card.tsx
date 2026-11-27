import type { LucideIcon } from "lucide-react"

export function StatCard({
    label,
    value,
    Icon,
    hint,
}: {
    label: string
    value: string | number
    Icon: LucideIcon
    hint?: string
}) {
    return (
        <div className="card-soft p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <span className="grid size-9 place-items-center rounded-lg bg-secondary text-secondary-foreground">
                    <Icon className="size-4" />
                </span>
            </div>
            <p className="mt-3 font-heading text-3xl font-bold">{value}</p>
            {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
    )
}