import type { Metadata } from "next"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = { title: "Login" }

export default async function SignInPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>
}) {
    const params = await searchParams
    // only allow paths inside our own site
    const target = params.redirect
    const redirectTo = target && target.startsWith("/") && !target.startsWith("//") ? target : "/"

    return <SignInForm redirectTo={redirectTo} />
}