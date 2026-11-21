import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft, CalendarClock, Mail, MapPin, Package, Phone, Tag, Wrench, type LucideIcon } from "lucide-react"

import { getEquipmentById } from "@/lib/api/equipment"
import { getSession } from "@/lib/core/server"
import { formatPrice, rentalUnit } from "@/lib/formatters"
import { Badge } from "@/components/ui/badge"
import { CopyLinkButton } from "@/components/equipment/copy-link-button"
import { UserAvatar } from "@/components/shared/user-avatar"
import { cn } from "@/lib/utils"
import { getFavoriteIds } from "@/lib/api/favorites"
import { FavoriteButton } from "@/components/equipment/favorite-button"


export const metadata: Metadata = { title: "Equipment Details" }

function InfoItem({ label, value, Icon }: { label: string; value: string; Icon: LucideIcon }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3.5">
            <span className="grid size-9 place-items-center rounded-lg bg-card text-primary">
                <Icon className="size-4" />
            </span>
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
            </div>
        </div>
    )
}

export default async function EquipmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // private route, guests go to login and come back here after login
    const session = await getSession()
    if (!session) {
        redirect(`/sign-in?redirect=${encodeURIComponent(`/equipment/${id}`)}`)
    }

    const item = await getEquipmentById(id)
    if (!item) {
        notFound()
    }

    const role = session.user.role as string
    const available = item.availableQuantity > 0
    const isFavorite = role === "customer" ? (await getFavoriteIds()).includes(item._id) : false

    return (
        <div className="container-page section-y">
            <Link
                href="/equipment"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="size-4" /> Back to all equipment
            </Link>

            <div className="grid gap-8 lg:grid-cols-5">
                <div className="space-y-8 lg:col-span-3">
                    <div className="aspect-[16/10] overflow-hidden rounded-3xl border bg-muted">
                        <img src={item.image} alt={item.name} className="size-full object-cover" />
                    </div>

                    <section>
                        <h2 className="font-heading text-xl font-semibold">About this equipment</h2>
                        <p className="mt-3 whitespace-pre-line text-muted-foreground">{item.description}</p>
                    </section>

                    <section>
                        <h2 className="font-heading text-xl font-semibold">Details</h2>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <InfoItem label="Category" value={item.category} Icon={Tag} />
                            <InfoItem label="Rental type" value={item.rentalType} Icon={CalendarClock} />
                            <InfoItem label="Location" value={item.location} Icon={MapPin} />
                            <InfoItem label="Available quantity" value={String(item.availableQuantity)} Icon={Package} />
                            <InfoItem label="Condition" value={item.condition} Icon={Wrench} />
                            <InfoItem label="Brand and model" value={`${item.brand} ${item.model}`} Icon={Tag} />
                        </div>
                    </section>

                    <section className="card-soft p-6">
                        <h2 className="font-heading text-xl font-semibold">Rental terms and conditions</h2>
                        <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{item.terms}</p>
                    </section>
                </div>

                <aside className="lg:col-span-2">
                    <div className="space-y-5 lg:sticky lg:top-24">
                        <div className="card-soft p-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">{item.category}</Badge>
                                {item.status !== "approved" && (
                                    <Badge variant="outline" className="capitalize">
                                        {item.status}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="mt-3 font-heading text-2xl font-bold">{item.name}</h1>

                            <p className="mt-4">
                                <span className="font-heading text-3xl font-bold text-primary">
                                    {formatPrice(item.rentalPrice)}
                                </span>
                                <span className="text-muted-foreground"> / {rentalUnit(item.rentalType)}</span>
                            </p>

                            <p
                                className={cn(
                                    "mt-2 flex items-center gap-2 text-sm font-medium",
                                    available ? "text-success" : "text-destructive"
                                )}
                            >
                                <span className={cn("size-2 rounded-full", available ? "bg-success" : "bg-destructive")} />
                                {available ? `${item.availableQuantity} available` : "Currently unavailable"}
                            </p>

                            <div className="mt-6 space-y-3">
                                {role === "customer" ? (
                                    <>
                                        <FavoriteButton equipmentId={item._id} initialFavorite={isFavorite} />
                                    </>
                                ) : (
                                    <p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                                        Only customer accounts can book equipment.
                                    </p>
                                )}
                                <CopyLinkButton />
                            </div>
                        </div>

                        <div className="card-soft p-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Equipment owner
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <UserAvatar name={item.ownerName} image={item.ownerImage} className="size-12" />
                                <div>
                                    <p className="font-semibold">{item.ownerName}</p>
                                    <p className="text-xs text-muted-foreground">Verified owner</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                                <p className="flex items-center gap-2">
                                    <Mail className="size-4 text-primary" /> {item.ownerEmail}
                                </p>
                                {item.ownerPhone ? (
                                    <p className="flex items-center gap-2">
                                        <Phone className="size-4 text-primary" /> {item.ownerPhone}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}