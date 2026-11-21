export type PaymentStatus = "unpaid" | "paid"
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"

export type BookingFormData = {
    equipmentId: string
    startDate: string
    endDate: string
    quantity: number
    contactNumber: string
    deliveryAddress: string
    notes: string
}

export type BookingRow = {
    _id: string
    equipmentId: string
    equipmentName: string
    equipmentImage: string
    rentalType: string
    unitPrice: number
    ownerId: string
    ownerName: string
    ownerEmail: string
    customerId: string
    customerName: string
    customerEmail: string
    startDate: string
    endDate: string
    days: number
    quantity: number
    contactNumber: string
    deliveryAddress: string
    notes: string
    totalAmount: number
    paymentStatus: PaymentStatus
    bookingStatus: BookingStatus
    createdAt: string
}