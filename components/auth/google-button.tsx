"use client"

import { useState } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function GoogleButton({ redirectTo = "/" }: { redirectTo?: string }) {
    const [loading, setLoading] = useState(false)

    const handleGoogle = async () => {
        setLoading(true)
        const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirectTo })
        if (error) {
            toast.error(error.message || "Google login failed")
            setLoading(false)
        }
    }

    return (
        <Button type="button" variant="outline" className="h-11 w-full" onClick={handleGoogle} disabled={loading}>
            <span className="grid size-5 place-items-center rounded-full border font-heading text-xs font-bold">G</span>
            {loading ? "Redirecting..." : "Continue with Google"}
        </Button>
    )
}