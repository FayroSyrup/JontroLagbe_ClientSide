"use server"

import { API_BASE_URL } from "@/lib/config"
import { protectedMutation } from "@/lib/core/server"

// the server asks stripe if the payment is real, then saves the payment and updates the booking
export async function verifyCheckout(sessionId: string) {
    const res = await protectedMutation(`${API_BASE_URL}/payments/checkout-verify`, "POST", { sessionId })
    const result = await res.json()
    return result as { success?: boolean; message?: string; alreadyVerified?: boolean }
}