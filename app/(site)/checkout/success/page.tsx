import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { CheckCircle2, XCircle } from "lucide-react"

import { verifyCheckout } from "@/lib/api/payments"
import { requireRole } from "@/lib/core/server"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/shared/reveal"

export const metadata: Metadata = { title: "Payment Result" }

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    await requireRole("customer")
    const { session_id } = await searchParams
    if (!session_id) {
        redirect("/equipment")
    }

    // safe to run again on reload, the server ignores a payment it already saved
    const result = await verifyCheckout(session_id)
    const success = result.success === true

    return (
        <div className="container-page section-y flex justify-center">
            <Reveal className="w-full max-w-lg">
                <div className="card-soft p-8 text-center md:p-10">
                    <span
                        className={`mx-auto grid size-16 place-items-center rounded-full ${
                            success ? "bg-secondary text-success" : "bg-muted text-destructive"
                        }`}
                    >
                        {success ? <CheckCircle2 className="size-9" /> : <XCircle className="size-9" />}
                    </span>

                    <h1 className="mt-6 font-heading text-2xl font-bold">
                        {success ? "Payment successful" : "We could not confirm your payment"}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {success
                            ? "Your booking is confirmed. The owner has been notified and will arrange the delivery."
                            : result.message || "If money was taken from your card, please contact support."}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link href="/dashboard/customer/my-rentals" className={buttonVariants()}>
                            View my rentals
                        </Link>
                        <Link href="/equipment" className={buttonVariants({ variant: "outline" })}>
                            Browse more
                        </Link>
                    </div>
                </div>
            </Reveal>
        </div>
    )
}