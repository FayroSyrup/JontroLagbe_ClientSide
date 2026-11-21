import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container-page section-y">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="mt-6 h-28 w-full rounded-2xl" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="card-soft overflow-hidden">
                        <Skeleton className="aspect-[4/3] w-full rounded-none" />
                        <div className="space-y-3 p-5">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}