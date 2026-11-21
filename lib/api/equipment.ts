"use server"

import { API_BASE_URL } from "@/lib/config"
import type { EquipmentRow, Paged } from "@/lib/types/equipment"

export type EquipmentQuery = {
    search?: string
    category?: string
    rentalType?: string
    minPrice?: string
    maxPrice?: string
    availability?: string
    sort?: string
    page?: number
    limit?: number
}

const EMPTY: Paged<EquipmentRow> = { data: [], total: 0, page: 1, totalPages: 0 }

// public list, the server does the search, filter, sort and paging
export async function getEquipmentList(query: EquipmentQuery = {}): Promise<Paged<EquipmentRow>> {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            params.set(key, String(value))
        }
    })

    try {
        const res = await fetch(`${API_BASE_URL}/equipment?${params.toString()}`, { cache: "no-store" })
        if (!res.ok) return EMPTY
        return await res.json()
    } catch {
        // server is down, show the empty state instead of crashing the page
        return EMPTY
    }
}