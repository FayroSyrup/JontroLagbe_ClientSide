import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Info } from "lucide-react"

import { getBookingById } from "@/lib/api/bookings"
import { requireRole } from "@/lib/core/server"
import { formatDate, formatPrice } from "@/lib/formatters"
import { buttonVariants } from "@/components/ui/button"
import { PayButton } from "@/components/payment/pay-button"

export const metadata: Metadata = { title: "Payment" }

export default async function CheckoutPage({
    params,
    searchParams,
}: {
    params: Promise<{ bookingId: string }>
    searchParams: Promise<{ canceled?: string }>
}) {
    const session = await requireRole("customer")
    const { bookingId } = await params
    const { canceled } = await searchParams

    const booking = await getBookingById(bookingId)
    if (!booking || booking.customerId !== session.user.id) {
        notFound()
    }
    if (booking.paymentStatus === "paid") {
        redirect("/dashboard/customer/my-rentals")
    }

    const expired = booking.bookingStatus === "cancelled"

    return (
        <div className="container-page section-y">
            <h1 className="section-title">Complete your payment</h1>
            <p className="section-sub">Your items are held for 30 minutes after booking.</p>

            {canceled && !expired && (
                <p className="mt-6 flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                    <Info className="size-4 text-primary" /> Payment was canceled. You can try again below.
                </p>
            )}

            <div className="mt-8 grid gap-8 lg:grid-cols-5">
                <div className="card-soft overflow-hidden lg:col-span-3">
                    <div className="aspect-[16/7] bg-muted">
                        <img src={booking.equipmentImage} alt={booking.equipmentName} className="size-full object-cover" />
                    </div>
                    <div className="p-6">
                        <h2 className="font-heading text-xl font-semibold">{booking.equipmentName}</h2>
                        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                            <div>
                                <dt className="text-muted-foreground">Rental period</dt>
                                <dd className="font-medium">
                                    {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Quantity</dt>
                                <dd className="font-medium">{booking.quantity}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Contact number</dt>
                                <dd className="font-medium">{booking.contactNumber}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Delivery address</dt>
                                <dd className="font-medium">{booking.deliveryAddress}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="card-soft space-y-5 p-6 lg:sticky lg:top-24">
                        <h2 className="font-heading text-lg font-semibold">Order summary</h2>
                        <div className="flex items-center justify-between border-t pt-4">
                            <span className="text-muted-foreground">Total amount</span>
                            <span className="font-heading text-2xl font-bold text-primary">
                                {formatPrice(booking.totalAmount)}
                            </span>
                        </div>

                        {expired ? (
                            <>
                                <p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                                    This booking expired because it was not paid in time. Please book again.
                                </p>
                                <Link href="/equipment" className={buttonVariants({ size: "lg", className: "w-full" })}>
                                    Browse equipment
                                </Link>
                            </>
                        ) : (
                            <>
                                <PayButton bookingId={booking._id} amount={formatPrice(booking.totalAmount)} />
                                <p className="text-center text-xs text-muted-foreground">
                                    Test mode: use card 4242 4242 4242 4242, any future date and any CVC.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}