"use server"

import { API_BASE_URL } from "@/lib/config"
import { authFetch, protectedMutation } from "@/lib/core/server"
import type { BookingFormData, BookingRow } from "@/lib/types/booking"

export async function createBooking(data: BookingFormData) {
    const res = await protectedMutation(`${API_BASE_URL}/bookings`, "POST", data)
    const result = await res.json()
    return {
        ok: res.ok,
        message: result.message as string | undefined,
        bookingId: result.insertedId as string | undefined,
    }
}

export async function getBookingById(id: string): Promise<BookingRow | null> {
    const res = await authFetch(`${API_BASE_URL}/bookings/${id}`)
    if (!res.ok) return null
    return res.json()
}