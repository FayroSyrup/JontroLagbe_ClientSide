"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { uploadToImgbb } from "@/lib/imgbb"
import { validatePassword } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/shared/field"
import { GoogleButton } from "@/components/auth/google-button"

export default function SignUpPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [photoFile, setPhotoFile] = useState<File | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const name = String(form.get("name")).trim()
        const email = String(form.get("email")).trim()
        const password = String(form.get("password"))
        const photoUrl = String(form.get("photoUrl") || "").trim()

        const passwordError = validatePassword(password)
        if (passwordError) {
            toast.error(passwordError)
            return
        }

        setLoading(true)
        try {
            // uploaded file wins, otherwise use the pasted link
            const image = photoFile ? await uploadToImgbb(photoFile) : photoUrl || undefined

            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
                image,
                callbackURL: "/",
            })
            if (error) {
                toast.error(error.message || "Could not create your account")
                return
            }

            toast.success("Welcome to JontroLagbe", { description: "Your account is ready." })
            router.refresh()
            router.push("/")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md">
            <h1 className="font-heading text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Join to rent equipment in a few clicks.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <Field label="Full name" htmlFor="name">
                    <Input id="name" name="name" placeholder="Your name" required className="h-11" />
                </Field>

                <Field label="Email" htmlFor="email">
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required className="h-11" />
                </Field>

                <Field label="Photo" htmlFor="photoFile" hint="Upload an image, or paste a direct image link below.">
                    <Input
                        id="photoFile"
                        type="file"
                        accept="image/*"
                        className="h-11"
                        onChange={(event) => setPhotoFile(event.target.files?.[0] ?? null)}
                    />
                    <Input id="photoUrl" name="photoUrl" type="url" placeholder="https://example.com/photo.jpg" className="h-11" />
                </Field>

                <Field label="Password" htmlFor="password" hint="At least 6 characters with one uppercase and one lowercase letter.">
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
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
                    {loading ? "Creating account..." : "Register"}
                </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
            </div>

            <GoogleButton />

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-primary hover:underline">
                    Login
                </Link>
            </p>
        </div>
    )
}