import { PackageSearch } from "lucide-react"

export function EmptyState({ title, text }: { title: string; text?: string }) {
    return (
        <div className="flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <PackageSearch className="size-7" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
            {text ? <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p> : null}
        </div>
    )
}