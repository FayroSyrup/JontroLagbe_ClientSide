"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone } from "lucide-react"
import { toast } from "sonner"

import { updateProfile } from "@/lib/api/users"
import { uploadToImgbb } from "@/lib/imgbb"
import { ROLE_LABEL, type UserRow } from "@/lib/types/user"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/shared/field"
import { UserAvatar } from "@/components/shared/user-avatar"

export function ProfileForm({ user }: { user: UserRow }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [photoFile, setPhotoFile] = useState<File | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        setLoading(true)
        try {
            // a new file wins, otherwise keep the link in the box
            const image = photoFile ? await uploadToImgbb(photoFile) : String(form.get("image") || "").trim()
            const result = await updateProfile({
                name: String(form.get("name")).trim(),
                image,
                phone: String(form.get("phone") || "").trim(),
                address: String(form.get("address") || "").trim(),
            })
            if (!result.ok) {
                toast.error(result.message || "Could not update your profile")
                return
            }
            toast.success("Profile updated")
            setPhotoFile(null)
            router.refresh()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="card-soft flex flex-col items-center p-8 text-center">
                <UserAvatar name={user.name} image={user.image} className="size-24 text-3xl" />
                <h2 className="mt-4 font-heading text-xl font-semibold">{user.name}</h2>
                <Badge variant="secondary" className="mt-2">
                    {ROLE_LABEL[user.role] ?? user.role}
                </Badge>
                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-2">
                        <Mail className="size-4 text-primary" /> {user.email}
                    </p>
                    {user.phone ? (
                        <p className="flex items-center justify-center gap-2">
                            <Phone className="size-4 text-primary" /> {user.phone}
                        </p>
                    ) : null}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="card-soft space-y-5 p-6 md:p-8 lg:col-span-2">
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                        <Input id="name" name="name" defaultValue={user.name} required className="h-11" />
                    </Field>
                    <Field label="Email" htmlFor="email" hint="Email cannot be changed.">
                        <Input id="email" value={user.email} disabled className="h-11" />
                    </Field>
                    <Field label="Phone number" htmlFor="phone">
                        <Input id="phone" name="phone" type="tel" defaultValue={user.phone ?? ""} className="h-11" />
                    </Field>
                    <Field label="Address" htmlFor="address">
                        <Input id="address" name="address" defaultValue={user.address ?? ""} className="h-11" />
                    </Field>
                </div>

                <Field label="Profile image" htmlFor="photoFile" hint="Upload a new image or edit the link below.">
                    <Input
                        id="photoFile"
                        type="file"
                        accept="image/*"
                        className="h-11"
                        onChange={(event) => setPhotoFile(event.target.files?.[0] ?? null)}
                    />
                    <Input id="image" name="image" type="url" defaultValue={user.image ?? ""} placeholder="https://..." className="h-11" />
                </Field>

                <Button type="submit" size="lg" disabled={loading}>
                    {loading ? "Saving..." : "Save changes"}
                </Button>
            </form>
        </div>
    )
}