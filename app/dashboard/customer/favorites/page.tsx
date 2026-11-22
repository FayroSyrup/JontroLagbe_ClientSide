import type { Metadata } from "next"
import Link from "next/link"

import { getFavorites } from "@/lib/api/favorites"
import { formatPrice, rentalUnit } from "@/lib/formatters"
import { buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EquipmentCell } from "@/components/dashboard/equipment-cell"
import { PageHeader } from "@/components/dashboard/page-header"
import { RemoveFavoriteButton } from "@/components/dashboard/remove-favorite-button"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = { title: "Favorites" }

export default async function FavoritesPage() {
    const favorites = await getFavorites()

    return (
        <>
            <PageHeader title="Favorites" subtitle="Equipment you saved to rent later." />

            {favorites.length === 0 ? (
                <EmptyState title="No favorites yet" text="Tap the heart on an equipment page to save it here." />
            ) : (
                <div className="card-soft">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Equipment</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {favorites.map(({ _id, equipment }) => (
                                <TableRow key={_id}>
                                    <TableCell>
                                        <EquipmentCell image={equipment.image} name={equipment.name} />
                                    </TableCell>
                                    <TableCell>{equipment.category}</TableCell>
                                    <TableCell className="font-medium">
                                        {formatPrice(equipment.rentalPrice)} / {rentalUnit(equipment.rentalType)}
                                    </TableCell>
                                    <TableCell>{equipment.location}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/equipment/${equipment._id}`}
                                                className={buttonVariants({ variant: "outline", size: "sm" })}
                                            >
                                                View Details
                                            </Link>
                                            <RemoveFavoriteButton equipmentId={equipment._id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    )
}