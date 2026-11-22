export function PageHeader({
    title,
    subtitle,
    action,
}: {
    title: string
    subtitle?: string
    action?: React.ReactNode
}) {
    return (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>
            {action}
        </div>
    )
}