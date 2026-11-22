import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getEquipmentById } from "@/lib/api/equipment"
import { requireUser } from "@/lib/core/server"
import { EquipmentForm } from "@/components/dashboard/equipment-form"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = { title: "Update Equipment" }

export default async function EditMyEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await requireUser()
    const item = await getEquipmentById(id)

    // an owner can only edit their own equipment
    if (!item || item.ownerId !== session.user.id) {
        notFound()
    }

    return (
        <>
            <PageHeader title="Update Equipment" subtitle="After you save, an admin checks it again." />
            <EquipmentForm
                mode="edit"
                item={item}
                owner={{ name: item.ownerName, email: item.ownerEmail }}
                redirectTo="/dashboard/owner/my-equipment"
            />
        </>
    )
}