import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getEquipmentById } from "@/lib/api/equipment"
import { EquipmentForm } from "@/components/dashboard/equipment-form"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = { title: "Update Equipment" }

export default async function AdminEditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const item = await getEquipmentById(id)
    if (!item) {
        notFound()
    }

    return (
        <>
            <PageHeader title="Update Equipment" subtitle="Admin edits keep the current approval status." />
            <EquipmentForm
                mode="edit"
                item={item}
                owner={{ name: item.ownerName, email: item.ownerEmail }}
                redirectTo="/dashboard/admin/equipment"
            />
        </>
    )
}