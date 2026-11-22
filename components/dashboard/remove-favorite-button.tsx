"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

import { removeFavorite } from "@/lib/api/favorites"
import { Button } from "@/components/ui/button"

export function RemoveFavoriteButton({ equipmentId }: { equipmentId: string }) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const handleRemove = () => {
        startTransition(async () => {
            const result = await removeFavorite(equipmentId)
            if (!result.ok) {
                toast.error(result.message || "Could not remove it")
                return
            }
            toast.success("Removed from favorites")
            router.refresh()
        })
    }

    return (
        <Button variant="outline" size="sm" className="text-destructive" onClick={handleRemove} disabled={pending}>
            <Trash2 className="size-4" /> {pending ? "Removing..." : "Remove"}
        </Button>
    )
}