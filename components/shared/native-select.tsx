import { cn } from "@/lib/utils"

// simple styled select, works the same in every shadcn setup
export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
    return (
        <select
            className={cn(
                "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
}