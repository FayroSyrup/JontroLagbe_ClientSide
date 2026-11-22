"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { setEquipmentStatus } from "@/lib/api/equipment"
import type { EquipmentStatus } from "@/lib/types/equipment"
import { Button } from "@/components/ui/button"

export function StatusButtons({ id, status }: { id: string; status: EquipmentStatus }) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const change = (next: EquipmentStatus) => {
        startTransition(async () => {
            const result = await setEquipmentStatus(id, next)
            if (!result.ok) {
                toast.error(result.message || "Could not change the status")
                return
            }
            toast.success(`Equipment ${next}`)
            router.refresh()
        })
    }

    return (
        <>
            <Button size="sm" disabled={pending || status === "approved"} onClick={() => change("approved")}>
                Approve
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="text-destructive"
                disabled={pending || status === "rejected"}
                onClick={() => change("rejected")}
            >
                Reject
            </Button>
        </>
    )
}