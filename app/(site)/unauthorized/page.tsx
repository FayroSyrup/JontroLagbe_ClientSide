import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function UnauthorizedPage() {
    return (
        <div className="container-page section-y flex flex-col items-center text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <ShieldAlert className="size-8" />
            </span>
            <h1 className="mt-6 font-heading text-3xl font-bold">You cannot open this page</h1>
            <p className="mt-2 max-w-md text-muted-foreground">
                Your account does not have permission to view this page. Try logging in with the right account.
            </p>
            <div className="mt-8 flex gap-3">
                <Link href="/" className={buttonVariants()}>
                    Go home
                </Link>
                <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>
                    Login
                </Link>
            </div>
        </div>
    )
}