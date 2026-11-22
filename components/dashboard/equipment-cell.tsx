export function EquipmentCell({ image, name, sub }: { image: string; name: string; sub?: string }) {
    return (
        <div className="flex min-w-48 items-center gap-3">
            <img src={image} alt={name} className="size-11 shrink-0 rounded-lg bg-muted object-cover" />
            <div>
                <p className="line-clamp-1 font-medium">{name}</p>
                {sub ? <p className="text-xs text-muted-foreground">{sub}</p> : null}
            </div>
        </div>
    )
}