import type { Metadata } from "next"
import Link from "next/link"

import { getMyBookings } from "@/lib/api/bookings"
import { formatDate, formatPrice } from "@/lib/formatters"
import { buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EquipmentCell } from "@/components/dashboard/equipment-cell"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { Pagination } from "@/components/shared/pagination"

export const metadata: Metadata = { title: "My Rentals" }

export default async function MyRentalsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams
    const result = await getMyBookings(Math.max(Number(page) || 1, 1))

    return (
        <>
            <PageHeader title="My Rentals" subtitle="All your bookings with their payment and rental status." />

            {result.data.length === 0 ? (
                <EmptyState title="No rentals yet" text="Book some equipment and it will show up here." />
            ) : (
                <div className="card-soft">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Equipment</TableHead>
                                <TableHead>Start date</TableHead>
                                <TableHead>End date</TableHead>
                                <TableHead>Booking date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Booking status</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result.data.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>
                                        <EquipmentCell
                                            image={booking.equipmentImage}
                                            name={booking.equipmentName}
                                            sub={`${booking.quantity} item(s)`}
                                        />
                                    </TableCell>
                                    <TableCell>{formatDate(booking.startDate)}</TableCell>
                                    <TableCell>{formatDate(booking.endDate)}</TableCell>
                                    <TableCell>{formatDate(booking.createdAt)}</TableCell>
                                    <TableCell className="font-medium">{formatPrice(booking.totalAmount)}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={booking.paymentStatus} />
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={booking.bookingStatus} />
                                    </TableCell>
                                    <TableCell>
                                        {booking.paymentStatus === "unpaid" && booking.bookingStatus === "pending" ? (
                                            <Link
                                                href={`/checkout/${booking._id}`}
                                                className={buttonVariants({ size: "sm" })}
                                            >
                                                Pay now
                                            </Link>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Pagination page={result.page} totalPages={result.totalPages} basePath="/dashboard/customer/my-rentals" />
        </>
    )
}