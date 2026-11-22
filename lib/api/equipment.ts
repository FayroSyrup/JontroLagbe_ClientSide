"use server"

import { revalidatePath } from "next/cache"

import { API_BASE_URL } from "@/lib/config"
import { authFetch, protectedMutation } from "@/lib/core/server"
import { toResult } from "@/lib/core/result"
import type { EquipmentFormData, EquipmentRow, EquipmentStatus, Paged } from "@/lib/types/equipment"

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

// private, the server checks the token and hides unapproved items from other users
export async function getEquipmentById(id: string): Promise<EquipmentRow | null> {
    const res = await authFetch(`${API_BASE_URL}/equipment/${id}`)
    if (!res.ok) return null
    return res.json()
}

const refreshEquipmentPages = () => {
    revalidatePath("/dashboard", "layout")
    revalidatePath("/equipment")
    revalidatePath("/")
}

export async function getMyEquipment(): Promise<EquipmentRow[]> {
    const res = await authFetch(`${API_BASE_URL}/equipment/mine`)
    return res.ok ? res.json() : []
}

export async function getAllEquipmentAdmin(): Promise<EquipmentRow[]> {
    const res = await authFetch(`${API_BASE_URL}/admin/equipment`)
    return res.ok ? res.json() : []
}

export async function createEquipment(data: EquipmentFormData) {
    const res = await protectedMutation(`${API_BASE_URL}/equipment`, "POST", data)
    refreshEquipmentPages()
    return toResult(res)
}

export async function updateEquipment(id: string, data: EquipmentFormData) {
    const res = await protectedMutation(`${API_BASE_URL}/equipment/${id}`, "PUT", data)
    refreshEquipmentPages()
    return toResult(res)
}

export async function deleteEquipment(id: string) {
    const res = await protectedMutation(`${API_BASE_URL}/equipment/${id}`, "DELETE")
    refreshEquipmentPages()
    return toResult(res)
}

export async function setEquipmentStatus(id: string, status: EquipmentStatus) {
    const res = await protectedMutation(`${API_BASE_URL}/equipment/${id}/status`, "PATCH", { status })
    refreshEquipmentPages()
    return toResult(res)
}