"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/shared/field"
import { GoogleButton } from "@/components/auth/google-button"

export function SignInForm({ redirectTo }: { redirectTo: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)

        setLoading(true)
        const { error } = await authClient.signIn.email({
            email: String(form.get("email")).trim(),
            password: String(form.get("password")),
        })
        setLoading(false)

        if (error) {
            toast.error(error.message || "Wrong email or password")
            return
        }

        toast.success("Logged in successfully")
        router.refresh()
        router.push(redirectTo)
    }

    return (
        <div className="w-full max-w-md">
            <h1 className="font-heading text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Login to manage your rentals.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <Field label="Email" htmlFor="email">
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required className="h-11" />
                </Field>

                <Field label="Password" htmlFor="password">
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Your password"
                            required
                            className="h-11 pr-11"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            aria-label="Show or hide password"
                            className="absolute inset-y-0 right-3 text-muted-foreground"
                        >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                </Field>

                <Button type="submit" className="h-11 w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
            </div>

            <GoogleButton redirectTo={redirectTo} />

            <p className="mt-6 text-center text-sm text-muted-foreground">
                New to JontroLagbe?{" "}
                <Link href="/sign-up" className="font-medium text-primary hover:underline">
                    Register
                </Link>
            </p>
        </div>
    )
}