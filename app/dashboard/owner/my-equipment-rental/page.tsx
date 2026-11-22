import type { Metadata } from "next"

import { getOwnerBookings } from "@/lib/api/bookings"
import { PageHeader } from "@/components/dashboard/page-header"
import { RentalsTable } from "@/components/dashboard/rentals-table"
import { EmptyState } from "@/components/shared/empty-state"
import { Pagination } from "@/components/shared/pagination"

export const metadata: Metadata = { title: "My Equipment Rental" }

export default async function OwnerRentalsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams
    const result = await getOwnerBookings(Math.max(Number(page) || 1, 1))

    return (
        <>
            <PageHeader title="My Equipment Rental" subtitle="Paid rentals of your equipment." />

            {result.data.length === 0 ? (
                <EmptyState title="No rentals yet" text="When a customer pays for your equipment, it appears here." />
            ) : (
                <RentalsTable bookings={result.data} variant="owner" />
            )}

            <Pagination page={result.page} totalPages={result.totalPages} basePath="/dashboard/owner/my-equipment-rental" />
        </>
    )
}