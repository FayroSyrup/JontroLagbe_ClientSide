"use client"

import { useState, useTransition } from "react"
import { Heart } from "lucide-react"
import { toast } from "sonner"

import { addFavorite, removeFavorite } from "@/lib/api/favorites"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FavoriteButton({
    equipmentId,
    initialFavorite,
}: {
    equipmentId: string
    initialFavorite: boolean
}) {
    const [favorite, setFavorite] = useState(initialFavorite)
    const [pending, startTransition] = useTransition()

    const handleToggle = () => {
        startTransition(async () => {
            const result = favorite ? await removeFavorite(equipmentId) : await addFavorite(equipmentId)
            if (!result.ok) {
                toast.error(result.message || "Something went wrong")
                return
            }
            toast.success(favorite ? "Removed from favorites" : "Added to favorites")
            setFavorite(!favorite)
        })
    }

    return (
        <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleToggle} disabled={pending}>
            <Heart className={cn("size-4", favorite && "fill-destructive text-destructive")} />
            {favorite ? "Remove from favorites" : "Add to favorites"}
        </Button>
    )
}