import type { RentalType } from "@/lib/types/equipment"

export const formatPrice = (amount: number) =>
    amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const UNIT: Record<RentalType, string> = { Daily: "day", Weekly: "week", Monthly: "month" }
export const rentalUnit = (type: RentalType | string) => UNIT[type as RentalType] ?? "day"

// fixed en-US so server and browser show the same text
export const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })

export const formatRelativeTime = (date: string) => {
    const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000)
    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`
    return formatDate(date)
}