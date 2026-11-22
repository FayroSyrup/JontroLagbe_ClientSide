import { notFound } from "next/navigation"

import { getMe } from "@/lib/api/users"
import { PageHeader } from "@/components/dashboard/page-header"
import { ProfileForm } from "@/components/dashboard/profile-form"

export async function ProfileView() {
    const user = await getMe()
    if (!user) {
        notFound()
    }

    return (
        <>
            <PageHeader title="My Profile" subtitle="Update your personal information." />
            <ProfileForm user={user} />
        </>
    )
}