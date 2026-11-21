import type { RentalType } from "@/lib/types/equipment"

const DAY_MS = 24 * 60 * 60 * 1000

export const countDays = (start: string, end: string) =>
    Math.round((new Date(end).getTime() - new Date(start).getTime()) / DAY_MS) + 1

// weekly = per started week, monthly = per started 30 days
export const rentalUnits = (type: RentalType, days: number) => {
    if (type === "Weekly") return Math.ceil(days / 7)
    if (type === "Monthly") return Math.ceil(days / 30)
    return days
}

export const calculateAmount = (price: number, type: RentalType, days: number, quantity: number) =>
    price * rentalUnits(type, days) * quantity