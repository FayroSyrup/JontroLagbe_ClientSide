import { CountUp } from "@/components/shared/count-up"

const STATS = [
    { value: 1200, suffix: "+", label: "Equipment listed" },
    { value: 450, suffix: "+", label: "Verified owners" },
    { value: 8000, suffix: "+", label: "Rentals completed" },
    { value: 64, suffix: "", label: "Districts covered" },
]

export function StatsStrip() {
    return (
        <section className="bg-primary text-primary-foreground">
            <div className="container-page grid grid-cols-2 gap-8 py-12 text-center md:grid-cols-4">
                {STATS.map((stat) => (
                    <div key={stat.label}>
                        <p className="font-heading text-4xl font-bold">
                            <CountUp to={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="mt-1 text-sm text-primary-foreground/80">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}