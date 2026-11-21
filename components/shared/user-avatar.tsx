import { cn } from "@/lib/utils"

export function UserAvatar({
    name,
    image,
    className,
}: {
    name: string
    image?: string | null
    className?: string
}) {
    if (image) {
        return <img src={image} alt={name} className={cn("size-9 rounded-full object-cover", className)} />
    }
    return (
        <span
            className={cn(
                "grid size-9 place-items-center rounded-full bg-secondary font-heading text-sm font-semibold text-secondary-foreground",
                className
            )}
        >
            {name.charAt(0).toUpperCase()}
        </span>
    )
}