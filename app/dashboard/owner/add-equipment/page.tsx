import type { Metadata } from "next"

import { requireUser } from "@/lib/core/server"
import { EquipmentForm } from "@/components/dashboard/equipment-form"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = { title: "Add Equipment" }

export default async function AddEquipmentPage() {
    const session = await requireUser()

    return (
        <>
            <PageHeader title="Add Equipment" subtitle="List your equipment for rent. An admin approves it before it goes live." />
            <EquipmentForm
                mode="add"
                owner={{ name: session.user.name, email: session.user.email }}
                redirectTo="/dashboard/owner/my-equipment"
            />
        </>
    )
}