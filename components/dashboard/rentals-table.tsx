import { formatDate, formatPrice } from "@/lib/formatters"
import type { BookingRow } from "@/lib/types/booking"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EquipmentCell } from "@/components/dashboard/equipment-cell"
import { StatusBadge } from "@/components/dashboard/status-badge"

// owner view shows quantity, admin view shows owner information
export function RentalsTable({ bookings, variant }: { bookings: BookingRow[]; variant: "owner" | "admin" }) {
    return (
        <div className="card-soft">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        {variant === "admin" ? <TableHead>Owner</TableHead> : null}
                        <TableHead>Equipment</TableHead>
                        <TableHead>Rental duration</TableHead>
                        {variant === "owner" ? <TableHead>Quantity</TableHead> : null}
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Booking status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking._id}>
                            <TableCell>
                                <p className="font-medium">{booking.customerName}</p>
                                <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                                <p className="text-xs text-muted-foreground">{booking.contactNumber}</p>
                            </TableCell>
                            {variant === "admin" ? (
                                <TableCell>
                                    <p className="font-medium">{booking.ownerName}</p>
                                    <p className="text-xs text-muted-foreground">{booking.ownerEmail}</p>
                                </TableCell>
                            ) : null}
                            <TableCell>
                                <EquipmentCell image={booking.equipmentImage} name={booking.equipmentName} />
                            </TableCell>
                            <TableCell>
                                <p>
                                    {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
                                </p>
                                <p className="text-xs text-muted-foreground">{booking.days} day(s)</p>
                            </TableCell>
                            {variant === "owner" ? <TableCell>{booking.quantity}</TableCell> : null}
                            <TableCell className="font-medium">{formatPrice(booking.totalAmount)}</TableCell>
                            <TableCell>
                                <StatusBadge status={booking.paymentStatus} />
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={booking.bookingStatus} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}