"use server"

import { revalidatePath } from "next/cache"

import { API_BASE_URL } from "@/lib/config"
import { authFetch, protectedMutation } from "@/lib/core/server"
import type { EquipmentRow } from "@/lib/types/equipment"

export type FavoriteRow = {
    _id: string
    equipmentId: string
    createdAt: string
    equipment: EquipmentRow
}

// only call these for customer accounts, other roles get a 403
export async function getFavoriteIds(): Promise<string[]> {
    const res = await authFetch(`${API_BASE_URL}/favorites/ids`)
    return res.ok ? res.json() : []
}

export async function getFavorites(): Promise<FavoriteRow[]> {
    const res = await authFetch(`${API_BASE_URL}/favorites`)
    return res.ok ? res.json() : []
}

export async function addFavorite(equipmentId: string) {
    const res = await protectedMutation(`${API_BASE_URL}/favorites`, "POST", { equipmentId })
    const result = await res.json()
    revalidatePath("/dashboard/customer/favorites")
    return { ok: res.ok, message: result.message as string | undefined }
}

export async function removeFavorite(equipmentId: string) {
    const res = await protectedMutation(`${API_BASE_URL}/favorites/${equipmentId}`, "DELETE")
    const result = await res.json()
    revalidatePath("/dashboard/customer/favorites")
    return { ok: res.ok, message: result.message as string | undefined }
}