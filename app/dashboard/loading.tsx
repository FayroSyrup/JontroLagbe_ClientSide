import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-96 max-w-full" />
            <div className="card-soft space-y-3 p-5">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-12 w-full" />
                ))}
            </div>
        </div>
    )
}