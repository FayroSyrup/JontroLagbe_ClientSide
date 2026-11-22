import type { Metadata } from "next"

import { getUsers } from "@/lib/api/users"
import { requireUser } from "@/lib/core/server"
import { formatDate } from "@/lib/formatters"
import { ROLE_LABEL } from "@/lib/types/user"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { UserActions } from "@/components/dashboard/user-actions"
import { EmptyState } from "@/components/shared/empty-state"
import { UserAvatar } from "@/components/shared/user-avatar"

export const metadata: Metadata = { title: "All Users" }

export default async function AllUsersPage() {
    const [session, users] = await Promise.all([requireUser(), getUsers()])

    return (
        <>
            <PageHeader title="All Users" subtitle={`${users.length} registered users. Change roles or block accounts.`} />

            {users.length === 0 ? (
                <EmptyState title="No users found" />
            ) : (
                <div className="card-soft">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Registered</TableHead>
                                <TableHead>Manage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <div className="flex min-w-40 items-center gap-3">
                                            <UserAvatar name={user.name} image={user.image} />
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Badge variant="secondary">{ROLE_LABEL[user.role] ?? user.role}</Badge>
                                            {user.banned ? <Badge variant="destructive">Blocked</Badge> : null}
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                                    <TableCell>
                                        <UserActions
                                            id={user._id}
                                            role={user.role}
                                            banned={!!user.banned}
                                            isSelf={user._id === session.user.id}
                                        />
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