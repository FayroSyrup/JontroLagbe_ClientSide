import type { Metadata } from "next"
import Link from "next/link"

import { getAllEquipmentAdmin } from "@/lib/api/equipment"
import { formatPrice, rentalUnit } from "@/lib/formatters"
import { buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteEquipmentButton } from "@/components/dashboard/delete-equipment-button"
import { EquipmentCell } from "@/components/dashboard/equipment-cell"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { StatusButtons } from "@/components/dashboard/status-buttons"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata: Metadata = { title: "All Equipment" }

export default async function AdminEquipmentPage() {
    const items = await getAllEquipmentAdmin()
    const pending = items.filter((item) => item.status === "pending").length

    return (
        <>
            <PageHeader title="All Equipment" subtitle={`${items.length} items, ${pending} waiting for approval.`} />

            {items.length === 0 ? (
                <EmptyState title="No equipment yet" />
            ) : (
                <div className="card-soft">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Equipment</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Qty</TableHead>
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
                                    <TableCell>
                                        <p className="font-medium">{item.ownerName}</p>
                                        <p className="text-xs text-muted-foreground">{item.ownerEmail}</p>
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
                                            <StatusButtons id={item._id} status={item.status} />
                                            <Link
                                                href={`/equipment/${item._id}`}
                                                className={buttonVariants({ variant: "outline", size: "sm" })}
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/dashboard/admin/equipment/${item._id}/edit`}
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