import type { Metadata } from "next"

import { getAllBookings } from "@/lib/api/bookings"
import { PageHeader } from "@/components/dashboard/page-header"
import { RentalsTable } from "@/components/dashboard/rentals-table"
import { EmptyState } from "@/components/shared/empty-state"
import { Pagination } from "@/components/shared/pagination"

export const metadata: Metadata = { title: "All Rentals" }

export default async function AdminRentalsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams
    const result = await getAllBookings(Math.max(Number(page) || 1, 1))

    return (
        <>
            <PageHeader title="All Rentals" subtitle={`${result.total} bookings on the platform.`} />

            {result.data.length === 0 ? (
                <EmptyState title="No rentals yet" />
            ) : (
                <RentalsTable bookings={result.data} variant="admin" />
            )}

            <Pagination page={result.page} totalPages={result.totalPages} basePath="/dashboard/admin/rentals" />
        </>
    )
}