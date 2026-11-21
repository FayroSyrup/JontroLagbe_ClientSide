"use client"

import { Link2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function CopyLinkButton() {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied")
    }

    return (
        <Button type="button" variant="ghost" className="w-full" onClick={handleCopy}>
            <Link2 className="size-4" /> Copy link
        </Button>
    )
}