import { NextResponse } from "next/server"

import { API_BASE_URL } from "@/lib/config"
import { getSession } from "@/lib/core/server"
import { stripe } from "@/lib/stripe"
import type { BookingRow } from "@/lib/types/booking"

export async function POST(req: Request) {
    const session = await getSession()
    if (!session || session.user.role !== "customer") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { bookingId } = await req.json()

    // the price always comes from our server, never from the browser
    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        headers: { authorization: `Bearer ${session.session.token}` },
        cache: "no-store",
    })
    if (!res.ok) {
        return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    const booking: BookingRow = await res.json()
    if (booking.customerId !== session.user.id) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }
    if (booking.paymentStatus === "paid") {
        return NextResponse.json({ message: "This booking is already paid" }, { status: 409 })
    }
    if (booking.bookingStatus === "cancelled") {
        return NextResponse.json({ message: "This booking expired. Please book again." }, { status: 409 })
    }

    const origin = process.env.BETTER_AUTH_URL || new URL(req.url).origin

    try {
        const checkout = await stripe.checkout.sessions.create({
            mode: "payment",
            customer_email: session.user.email,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(booking.totalAmount * 100),
                        product_data: {
                            name: booking.equipmentName,
                            description: `${booking.startDate} to ${booking.endDate}, ${booking.quantity} item(s)`,
                            // stripe only accepts public https images
                            ...(booking.equipmentImage.startsWith("https://") ? { images: [booking.equipmentImage] } : {}),
                        },
                    },
                },
            ],
            // the success page uses these to verify the payment
            metadata: { userId: session.user.id, bookingId: booking._id },
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout/${booking._id}?canceled=1`,
        })

        return NextResponse.json({ url: checkout.url })
    } catch (err) {
        console.log("stripe error", err)
        return NextResponse.json({ message: "Could not start the payment" }, { status: 500 })
    }
}