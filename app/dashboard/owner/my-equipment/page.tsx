import type { Metadata } from "next"
import Link from "next/link"
import { CirclePlus } from "lucide-react"

import { getMyEquipment } from "@/lib/api/equipment"
import { formatPrice, rentalUnit } from "@/lib/formatters"
import { buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteEquipmentButton } from "@/components/dashboard/delete-equipment-button"
import { EquipmentCell } from "@/components/dashboard/equipment-cell"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = { title: "My Equipment" }

export default async function MyEquipmentPage() {
    const items = await getMyEquipment()

    return (
        <>
            <PageHeader
                title="My Equipment"
                subtitle="Everything you listed for rent."
                action={
                    <Link href="/dashboard/owner/add-equipment" className={buttonVariants()}>
                        <CirclePlus className="size-4" /> Add equipment
                    </Link>
                }
            />

            {items.length === 0 ? (
                <EmptyState title="No equipment yet" text="Add your first equipment to start earning." />
            ) : (
                <div className="card-soft">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Equipment</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Rental price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <EquipmentCell image={item.image} name={item.name} sub={item.location} />
                                    </TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell className="font-medium">
                                        {formatPrice(item.rentalPrice)} / {rentalUnit(item.rentalType)}
                                    </TableCell>
                                    <TableCell>{item.availableQuantity}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={item.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <Link
                                                href={`/equipment/${item._id}`}
                                                className={buttonVariants({ variant: "outline", size: "sm" })}
                                            >
                                                View Details
                                            </Link>
                                            <Link
                                                href={`/dashboard/owner/my-equipment/${item._id}/edit`}
                                                className={buttonVariants({ variant: "outline", size: "sm" })}
                                            >
                                                Update
                                            </Link>
                                            <DeleteEquipmentButton id={item._id} name={item.name} />
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