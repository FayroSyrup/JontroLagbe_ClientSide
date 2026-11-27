"use server"

import { API_BASE_URL } from "@/lib/config"
import { authFetch } from "@/lib/core/server"

export type AdminAnalytics = {
    totalUsers: number
    totalEquipment: number
    totalBookings: number
    pendingApprovals: number
    completedRentals: number
    totalRevenue: number
    monthlyBookings: { month: string; bookings: number; revenue: number }[]
    equipmentByCategory: { category: string; count: number }[]
}

export type OwnerAnalytics = {
    totalEquipment: number
    totalRentals: number
    completedRentals: number
    totalEarnings: number
    monthlyEarnings: { month: string; rentals: number; earnings: number }[]
}

export async function getAdminAnalytics(): Promise<AdminAnalytics | null> {
    const res = await authFetch(`${API_BASE_URL}/analytics/admin`)
    return res.ok ? res.json() : null
}

export async function getOwnerAnalytics(): Promise<OwnerAnalytics | null> {
    const res = await authFetch(`${API_BASE_URL}/analytics/owner`)
    return res.ok ? res.json() : null
}