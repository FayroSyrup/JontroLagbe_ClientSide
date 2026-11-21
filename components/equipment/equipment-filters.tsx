"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import { CATEGORIES, RENTAL_TYPES, type EquipmentFilterValues } from "@/lib/types/equipment"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/shared/native-select"


const SORT_OPTIONS = [
    { value: "newest", label: "Recently added" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
]

export function EquipmentFilters({ values }: { values: EquipmentFilterValues }) {
    const router = useRouter()
    const pathname = usePathname()

    // typed text is kept here until the user presses search
    const [search, setSearch] = useState(values.search)
    const [minPrice, setMinPrice] = useState(values.minPrice)
    const [maxPrice, setMaxPrice] = useState(values.maxPrice)

    // change some filters and always go back to page 1
    const update = (changes: Partial<EquipmentFilterValues>) => {
        const next = { ...values, ...changes }
        const params = new URLSearchParams()
        Object.entries(next).forEach(([key, value]) => {
            if (value && !(key === "sort" && value === "newest")) params.set(key, value)
        })
        const query = params.toString()
        router.push(query ? `${pathname}?${query}` : pathname)
    }

    // selects also keep the text the user already typed
    const apply = (changes: Partial<EquipmentFilterValues> = {}) =>
        update({ search: search.trim(), minPrice, maxPrice, ...changes })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        apply()
    }

    const chips: { label: string; clear: Partial<EquipmentFilterValues> }[] = []
    if (values.search) chips.push({ label: `Search: ${values.search}`, clear: { search: "" } })
    if (values.category) chips.push({ label: values.category, clear: { category: "" } })
    if (values.rentalType) chips.push({ label: values.rentalType, clear: { rentalType: "" } })
    if (values.availability) {
        chips.push({
            label: values.availability === "available" ? "Available only" : "Unavailable only",
            clear: { availability: "" },
        })
    }
    if (values.minPrice) chips.push({ label: `Min $${values.minPrice}`, clear: { minPrice: "" } })
    if (values.maxPrice) chips.push({ label: `Max $${values.maxPrice}`, clear: { maxPrice: "" } })

    return (
        <div className="card-soft mt-8 p-4 md:p-5">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by name, location or category"
                            className="h-11 pl-9"
                        />
                    </div>
                    <Button type="submit" className="h-11 px-6">
                        Search
                    </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                    <NativeSelect
                        aria-label="Category"
                        value={values.category}
                        onChange={(event) => apply({ category: event.target.value })}
                    >
                        <option value="">All categories</option>
                        {CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </NativeSelect>

                    <NativeSelect
                        aria-label="Rental type"
                        value={values.rentalType}
                        onChange={(event) => apply({ rentalType: event.target.value })}
                    >
                        <option value="">Any rental type</option>
                        {RENTAL_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </NativeSelect>

                    <NativeSelect
                        aria-label="Availability"
                        value={values.availability}
                        onChange={(event) => apply({ availability: event.target.value })}
                    >
                        <option value="">Any availability</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </NativeSelect>

                    <NativeSelect
                        aria-label="Sort by"
                        value={values.sort}
                        onChange={(event) => apply({ sort: event.target.value })}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </NativeSelect>

                    <Input
                        type="number"
                        min={0}
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                        placeholder="Min price"
                        aria-label="Minimum price"
                        className="h-11"
                    />
                    <Input
                        type="number"
                        min={0}
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                        placeholder="Max price"
                        aria-label="Maximum price"
                        className="h-11"
                    />
                </div>
            </form>

            {chips.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
                    {chips.map((chip) => (
                        <button
                            key={chip.label}
                            type="button"
                            onClick={() => update(chip.clear)}
                            className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
                        >
                            {chip.label} <X className="size-3" />
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => router.push(pathname)}
                        className="text-xs font-medium text-primary hover:underline"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    )
}