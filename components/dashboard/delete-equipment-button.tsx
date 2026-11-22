"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

import { deleteEquipment } from "@/lib/api/equipment"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"

export function DeleteEquipmentButton({ id, name }: { id: string; name: string }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [pending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteEquipment(id)
            if (!result.ok) {
                toast.error(result.message || "Could not delete the equipment")
                return
            }
            toast.success("Equipment deleted")
            setOpen(false)
            router.refresh()
        })
    }

    return (
        <>
            <Button variant="outline" size="sm" className="text-destructive" onClick={() => setOpen(true)}>
                <Trash2 className="size-4" /> Delete
            </Button>
            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                title="Delete this equipment?"
                description={`"${name}" will be removed from the platform. This cannot be undone.`}
                confirmLabel="Delete"
                loading={pending}
                onConfirm={handleDelete}
            />
        </>
    )
}