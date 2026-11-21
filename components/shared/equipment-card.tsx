import Link from "next/link"
import { MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { formatPrice, rentalUnit } from "@/lib/formatters"
import type { EquipmentRow } from "@/lib/types/equipment"
import { cn } from "@/lib/utils"

// all cards have the same height, image ratio and button
export function EquipmentCard({ item, isLoggedIn }: { item: EquipmentRow; isLoggedIn: boolean }) {
    const available = item.availableQuantity > 0
    const detailsPath = `/equipment/${item._id}`
    // guests go to login first, then come back to the details page
    const href = isLoggedIn ? detailsPath : `/sign-in?redirect=${encodeURIComponent(detailsPath)}`

    return (
        <article className="card-soft group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                    src={item.image}
                    alt={item.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge variant="secondary" className="absolute left-3 top-3">
                    {item.category}
                </Badge>
                <Badge variant="outline" className="absolute right-3 top-3 bg-background/85">
                    {item.rentalType}
                </Badge>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 font-heading text-lg font-semibold">{item.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                </p>

                <div className="mt-4 flex items-end justify-between gap-2">
                    <p>
                        <span className="font-heading text-xl font-bold text-primary">{formatPrice(item.rentalPrice)}</span>
                        <span className="text-sm text-muted-foreground"> / {rentalUnit(item.rentalType)}</span>
                    </p>
                    <span
                        className={cn(
                            "flex items-center gap-1.5 text-xs font-medium",
                            available ? "text-success" : "text-destructive"
                        )}
                    >
                        <span className={cn("size-2 rounded-full", available ? "bg-success" : "bg-destructive")} />
                        {available ? `${item.availableQuantity} available` : "Unavailable"}
                    </span>
                </div>

                <Link href={href} className={cn(buttonVariants(), "mt-5 w-full")}>
                    View Details
                </Link>
            </div>
        </article>
    )
}