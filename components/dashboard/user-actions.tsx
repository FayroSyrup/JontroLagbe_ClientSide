"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { changeUserRole, setUserBanned } from "@/lib/api/users"
import { ROLE_LABEL, USER_ROLES, type UserRole } from "@/lib/types/user"
import { Button } from "@/components/ui/button"
import { NativeSelect } from "@/components/shared/native-select"

export function UserActions({ id, role, banned, isSelf }: { id: string; role: UserRole; banned: boolean; isSelf: boolean }) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const handleRole = (nextRole: UserRole) => {
        startTransition(async () => {
            const result = await changeUserRole(id, nextRole)
            if (!result.ok) {
                toast.error(result.message || "Could not change the role")
                return
            }
            toast.success(`Role changed to ${ROLE_LABEL[nextRole]}`)
            router.refresh()
        })
    }

    const handleBlock = () => {
        startTransition(async () => {
            const result = await setUserBanned(id, !banned)
            if (!result.ok) {
                toast.error(result.message || "Could not update the user")
                return
            }
            toast.success(banned ? "User unblocked" : "User blocked")
            router.refresh()
        })
    }

    return (
        <div className="flex items-center gap-2">
            <NativeSelect
                aria-label="Change role"
                className="h-9 w-32"
                value={role}
                disabled={isSelf || pending}
                onChange={(event) => handleRole(event.target.value as UserRole)}
            >
                {USER_ROLES.map((item) => (
                    <option key={item} value={item}>
                        {ROLE_LABEL[item]}
                    </option>
                ))}
            </NativeSelect>
            <Button variant="outline" size="sm" disabled={isSelf || pending} onClick={handleBlock}>
                {banned ? "Unblock" : "Block"}
            </Button>
        </div>
    )
}