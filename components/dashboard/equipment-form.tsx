"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createEquipment, updateEquipment } from "@/lib/api/equipment"
import { uploadToImgbb } from "@/lib/imgbb"
import {
    CATEGORIES,
    CONDITIONS,
    RENTAL_TYPES,
    type EquipmentFormData,
    type EquipmentRow,
} from "@/lib/types/equipment"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field } from "@/components/shared/field"
import { NativeSelect } from "@/components/shared/native-select"

const toForm = (item?: EquipmentRow): EquipmentFormData => ({
    name: item?.name ?? "",
    description: item?.description ?? "",
    category: item?.category ?? "",
    location: item?.location ?? "",
    rentalPrice: item ? String(item.rentalPrice) : "",
    rentalType: item?.rentalType ?? "Daily",
    availableQuantity: item ? String(item.availableQuantity) : "1",
    condition: item?.condition ?? "Good",
    brand: item?.brand ?? "",
    model: item?.model ?? "",
    image: item?.image ?? "",
    terms: item?.terms ?? "",
})

export function EquipmentForm({
    mode,
    item,
    owner,
    redirectTo,
}: {
    mode: "add" | "edit"
    item?: EquipmentRow
    owner: { name: string; email: string }
    redirectTo: string
}) {
    const router = useRouter()
    const [form, setForm] = useState<EquipmentFormData>(toForm(item))
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const set = (key: keyof EquipmentFormData, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

    const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            set("image", await uploadToImgbb(file))
            toast.success("Image uploaded")
        } catch {
            toast.error("Image upload failed. Try again.")
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!form.image) {
            toast.error("Please upload an equipment image")
            return
        }
        setLoading(true)
        const result =
            mode === "add" || !item ? await createEquipment(form) : await updateEquipment(item._id, form)
        setLoading(false)

        if (!result.ok) {
            toast.error(result.message || "Could not save the equipment")
            return
        }
        toast.success(mode === "add" ? "Equipment added, waiting for admin approval" : "Equipment updated")
        router.push(redirectTo)
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit} className="card-soft grid gap-5 p-6 sm:grid-cols-2 md:p-8">
            <Field label="Equipment name" htmlFor="name">
                <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} required className="h-11" />
            </Field>

            <Field label="Category" htmlFor="category">
                <NativeSelect id="category" value={form.category} onChange={(e) => set("category", e.target.value)} required>
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </NativeSelect>
            </Field>

            <div className="sm:col-span-2">
                <Field label="Description" htmlFor="description">
                    <Textarea id="description" rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} required />
                </Field>
            </div>

            <Field label="Location" htmlFor="location">
                <Input id="location" value={form.location} onChange={(e) => set("location", e.target.value)} required className="h-11" />
            </Field>

            <Field label="Rental type" htmlFor="rentalType">
                <NativeSelect id="rentalType" value={form.rentalType} onChange={(e) => set("rentalType", e.target.value)}>
                    {RENTAL_TYPES.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </NativeSelect>
            </Field>

            <Field label="Rental price (USD)" htmlFor="rentalPrice">
                <Input id="rentalPrice" type="number" min={1} value={form.rentalPrice} onChange={(e) => set("rentalPrice", e.target.value)} required className="h-11" />
            </Field>

            <Field label="Available quantity" htmlFor="availableQuantity">
                <Input id="availableQuantity" type="number" min={0} value={form.availableQuantity} onChange={(e) => set("availableQuantity", e.target.value)} required className="h-11" />
            </Field>

            <Field label="Equipment condition" htmlFor="condition">
                <NativeSelect id="condition" value={form.condition} onChange={(e) => set("condition", e.target.value)}>
                    {CONDITIONS.map((condition) => (
                        <option key={condition} value={condition}>
                            {condition}
                        </option>
                    ))}
                </NativeSelect>
            </Field>

            <Field label="Status" htmlFor="status" hint="New and edited equipment waits for admin approval.">
                <Input id="status" value={mode === "add" ? "pending" : item?.status ?? "pending"} disabled className="h-11 capitalize" />
            </Field>

            <Field label="Brand" htmlFor="brand">
                <Input id="brand" value={form.brand} onChange={(e) => set("brand", e.target.value)} required className="h-11" />
            </Field>

            <Field label="Model" htmlFor="model">
                <Input id="model" value={form.model} onChange={(e) => set("model", e.target.value)} required className="h-11" />
            </Field>

            <div className="sm:col-span-2">
                <Field label="Equipment image" htmlFor="image" hint={uploading ? "Uploading..." : "Uploaded to imgbb."}>
                    <Input id="image" type="file" accept="image/*" onChange={handleImage} className="h-11" />
                    {form.image ? (
                        <img src={form.image} alt="Preview" className="mt-2 h-40 w-64 rounded-xl border object-cover" />
                    ) : null}
                </Field>
            </div>

            <div className="sm:col-span-2">
                <Field label="Rental terms and conditions" htmlFor="terms">
                    <Textarea id="terms" rows={4} value={form.terms} onChange={(e) => set("terms", e.target.value)} required />
                </Field>
            </div>

            <Field label="Owner name" htmlFor="ownerName">
                <Input id="ownerName" value={owner.name} disabled className="h-11" />
            </Field>
            <Field label="Owner email" htmlFor="ownerEmail">
                <Input id="ownerEmail" value={owner.email} disabled className="h-11" />
            </Field>

            <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={loading || uploading}>
                    {loading ? "Saving..." : mode === "add" ? "Add equipment" : "Save changes"}
                </Button>
            </div>
        </form>
    )
}