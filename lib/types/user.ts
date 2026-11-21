export type UserRole = "customer" | "owner" | "admin"

export const USER_ROLES: UserRole[] = ["customer", "owner", "admin"]

export const ROLE_LABEL: Record<UserRole, string> = {
    customer: "Customer",
    owner: "Owner",
    admin: "Admin",
}

// where each role lands when they click Dashboard
export const dashboardPath = (role?: string) =>
    `/dashboard/${role === "owner" || role === "admin" ? role : "customer"}`

export type UserRow = {
    _id: string
    name: string
    email: string
    image?: string
    role: UserRole
    phone?: string
    address?: string
    banned?: boolean
    createdAt: string
}