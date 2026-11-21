"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarCheck } from "lucide-react"
import { toast } from "sonner"

import { createBooking } from "@/lib/api/bookings"
import { formatPrice, rentalUnit } from "@/lib/formatters"
import { calculateAmount, countDays, rentalUnits } from "@/lib/pricing"
import type { RentalType } from "@/lib/types/equipment"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field } from "@/components/shared/field"

type BookingEquipment = {
    _id: string
    name: string
    rentalPrice: number
    rentalType: RentalType
    availableQuantity: number
}

export function BookingModal({ equipment }: { equipment: BookingEquipment }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [quantity, setQuantity] = useState(1)

    const today = new Date().toISOString().slice(0, 10)
    const ready = !!startDate && !!endDate && endDate >= startDate && quantity >= 1

    // live price, same rule as the server
    const days = ready ? countDays(startDate, endDate) : 0
    const units = ready ? rentalUnits(equipment.rentalType, days) : 0
    const total = ready ? calculateAmount(equipment.rentalPrice, equipment.rentalType, days, quantity) : 0
    const unitName = `${rentalUnit(equipment.rentalType)}${units > 1 ? "s" : ""}`

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)

        if (!ready) {
            toast.error("Please choose a valid start and end date")
            return
        }
        if (quantity > equipment.availableQuantity) {
            toast.error(`Only ${equipment.availableQuantity} item(s) in stock`)
            return
        }

        setLoading(true)
        const result = await createBooking({
            equipmentId: equipment._id,
            startDate,
            endDate,
            quantity,
            contactNumber: String(form.get("contactNumber")).trim(),
            deliveryAddress: String(form.get("deliveryAddress")).trim(),
            notes: String(form.get("notes") || "").trim(),
        })
        setLoading(false)

        if (!result.ok) {
            toast.error(result.message || "Could not create the booking")
            return
        }

        toast.success("Booking created", { description: "Complete the payment to confirm it." })
        setOpen(false)
        router.push(`/checkout/${result.bookingId}`)
    }

    return (
        <>
            <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={() => setOpen(true)}
                disabled={equipment.availableQuantity < 1}
            >
                <CalendarCheck className="size-4" />
                {equipment.availableQuantity < 1 ? "Unavailable" : "Book Now"}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Book {equipment.name}</DialogTitle>
                        <DialogDescription>
                            Choose your dates. We check availability and then take you to the payment page.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Rental start date" htmlFor="startDate">
                                <Input
                                    id="startDate"
                                    type="date"
                                    min={today}
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                    required
                                    className="h-11"
                                />
                            </Field>
                            <Field label="Rental end date" htmlFor="endDate">
                                <Input
                                    id="endDate"
                                    type="date"
                                    min={startDate || today}
                                    value={endDate}
                                    onChange={(event) => setEndDate(event.target.value)}
                                    required
                                    className="h-11"
                                />
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Required quantity" htmlFor="quantity" hint={`${equipment.availableQuantity} in stock`}>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min={1}
                                    max={equipment.availableQuantity}
                                    value={quantity}
                                    onChange={(event) => setQuantity(Number(event.target.value))}
                                    required
                                    className="h-11"
                                />
                            </Field>
                            <Field label="Contact number" htmlFor="contactNumber">
                                <Input id="contactNumber" name="contactNumber" type="tel" placeholder="01XXXXXXXXX" required className="h-11" />
                            </Field>
                        </div>

                        <Field label="Delivery address" htmlFor="deliveryAddress">
                            <Input id="deliveryAddress" name="deliveryAddress" placeholder="House, road, area, city" required className="h-11" />
                        </Field>

                        <Field label="Additional notes" htmlFor="notes">
                            <Textarea id="notes" name="notes" rows={3} placeholder="Anything the owner should know (optional)" />
                        </Field>

                        <div className="rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
                            {ready ? (
                                <>
                                    <p>
                                        {units} {unitName} x {quantity} item(s) x {formatPrice(equipment.rentalPrice)}
                                    </p>
                                    <p className="mt-1 font-heading text-xl font-bold">Total: {formatPrice(total)}</p>
                                </>
                            ) : (
                                <p>Select your dates to see the total price.</p>
                            )}
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                            {loading ? "Checking availability..." : "Confirm and go to payment"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}