import type { Metadata } from "next"

import { getEquipmentList } from "@/lib/api/equipment"
import { getSession } from "@/lib/core/server"
import type { EquipmentFilterValues } from "@/lib/types/equipment"
import { EmptyState } from "@/components/shared/empty-state"
import { EquipmentCard } from "@/components/shared/equipment-card"
import { Pagination } from "@/components/shared/pagination"

export const metadata: Metadata = { title: "All Equipment" }

const PAGE_SIZE = 9

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function AllEquipmentPage({ searchParams }: { searchParams: SearchParams }) {
    const raw = await searchParams
    const pick = (key: string) => {
        const value = raw[key]
        return (Array.isArray(value) ? value[0] : value) ?? ""
    }

    const values: EquipmentFilterValues = {
        search: pick("search"),
        category: pick("category"),
        rentalType: pick("rentalType"),
        minPrice: pick("minPrice"),
        maxPrice: pick("maxPrice"),
        availability: pick("availability"),
        sort: pick("sort") || "newest",
    }
    const page = Math.max(Number(pick("page")) || 1, 1)

    // search, filter, sort and paging all happen on the server
    const [session, result] = await Promise.all([
        getSession(),
        getEquipmentList({ ...values, page, limit: PAGE_SIZE }),
    ])

    return (
        <div className="container-page section-y">
            <div>
                <p className="section-eyebrow">Browse</p>
                <h1 className="section-title mt-2">All Equipment</h1>
                <p className="section-sub">Find the right equipment, compare prices and book in a few clicks.</p>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
                {result.total} equipment found
            </p>

            {result.data.length === 0 ? (
                <div className="mt-4">
                    <EmptyState title="No equipment found" text="Try a different search or clear the filters." />
                </div>
            ) : (
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {result.data.map((item) => (
                        <EquipmentCard key={item._id} item={item} isLoggedIn={!!session} />
                    ))}
                </div>
            )}

            <Pagination page={result.page} totalPages={result.totalPages} basePath="/equipment" params={values} />
        </div>
    )
}