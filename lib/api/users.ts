"use server"

import { revalidatePath } from "next/cache"

import { API_BASE_URL } from "@/lib/config"
import { authFetch, protectedMutation } from "@/lib/core/server"
import { toResult } from "@/lib/core/result"
import type { UserRole, UserRow } from "@/lib/types/user"

export async function getMe(): Promise<UserRow | null> {
    const res = await authFetch(`${API_BASE_URL}/users/me`)
    return res.ok ? res.json() : null
}

export async function updateProfile(data: { name: string; image: string; phone: string; address: string }) {
    const res = await protectedMutation(`${API_BASE_URL}/users/me`, "PATCH", data)
    revalidatePath("/dashboard", "layout")
    return toResult(res)
}

// admin only
export async function getUsers(): Promise<UserRow[]> {
    const res = await authFetch(`${API_BASE_URL}/users`)
    return res.ok ? res.json() : []
}

export async function changeUserRole(id: string, role: UserRole) {
    const res = await protectedMutation(`${API_BASE_URL}/users/${id}/role`, "PATCH", { role })
    revalidatePath("/dashboard/admin/users")
    return toResult(res)
}

export async function setUserBanned(id: string, banned: boolean) {
    const res = await protectedMutation(`${API_BASE_URL}/users/${id}/status`, "PATCH", { banned })
    revalidatePath("/dashboard/admin/users")
    return toResult(res)
}