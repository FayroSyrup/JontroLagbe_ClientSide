export const CATEGORIES = [
    "Construction Equipment",
    "Photography Equipment",
    "Vehicles & Transportation",
    "Agriculture Equipment",
    "Electronics",
    "Event Equipment",
] as const

export const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"] as const
export const CONDITIONS = ["New", "Excellent", "Good", "Fair"] as const

export type Category = (typeof CATEGORIES)[number]
export type RentalType = (typeof RENTAL_TYPES)[number]
export type Condition = (typeof CONDITIONS)[number]
export type EquipmentStatus = "pending" | "approved" | "rejected"

// what the add and edit form sends
export type EquipmentFormData = {
    name: string
    description: string
    category: Category | ""
    location: string
    rentalPrice: string
    rentalType: RentalType
    availableQuantity: string
    condition: Condition
    brand: string
    model: string
    image: string
    terms: string
}

export type EquipmentRow = {
    _id: string
    name: string
    description: string
    category: Category
    location: string
    rentalPrice: number
    rentalType: RentalType
    availableQuantity: number
    condition: Condition
    brand: string
    model: string
    image: string
    terms: string
    status: EquipmentStatus
    ownerId: string
    ownerName: string
    ownerEmail: string
    ownerImage?: string
    ownerPhone?: string
    createdAt: string
}

export type Paged<T> = {
    data: T[]
    total: number
    page: number
    totalPages: number
}