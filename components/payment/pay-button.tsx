"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function PayButton({ bookingId, amount }: { bookingId: string; amount: string }) {
    const [loading, setLoading] = useState(false)

    const handlePay = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ bookingId }),
            })
            const data = await res.json()
            if (!res.ok || !data.url) {
                throw new Error(data.message || "Could not start the payment")
            }
            // go to the stripe page
            window.location.href = data.url
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong")
            setLoading(false)
        }
    }

    return (
        <Button size="lg" className="h-12 w-full" onClick={handlePay} disabled={loading}>
            <Lock className="size-4" />
            {loading ? "Opening Stripe..." : `Pay ${amount} with Stripe`}
        </Button>
    )
}