import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const STYLES: Record<string, string> = {
    approved: "bg-success/15 text-success",
    paid: "bg-success/15 text-success",
    confirmed: "bg-success/15 text-success",
    completed: "bg-secondary text-secondary-foreground",
    pending: "bg-warning/15 text-warning",
    unpaid: "bg-warning/15 text-warning",
    rejected: "bg-destructive/15 text-destructive",
    cancelled: "bg-destructive/15 text-destructive",
}

export function StatusBadge({ status }: { status: string }) {
    return (
        <Badge variant="outline" className={cn("border-transparent capitalize", STYLES[status])}>
            {status}
        </Badge>
    )
}