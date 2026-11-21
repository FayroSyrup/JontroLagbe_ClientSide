import { Quote, Star } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { UserAvatar } from "@/components/shared/user-avatar"

const REVIEWS = [
    { name: "Nusrat Jahan", role: "Wedding photographer", rating: 5, comment: "Rented a full camera kit for a wedding shoot. Everything was clean, tested and delivered on time." },
    { name: "Tanvir Ahmed", role: "Site engineer", rating: 5, comment: "The concrete mixer saved us weeks of cost. Booking and payment took only a few minutes." },
    { name: "Farhana Akter", role: "Event organizer", rating: 4, comment: "Sound system and lights were exactly as described. The owner was very helpful and polite." },
    { name: "Rafiul Karim", role: "Farm owner", rating: 5, comment: "I rent a tractor every harvest season now. Much cheaper than buying one for a few days of work." },
]

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={index < rating ? "size-4 fill-highlight text-highlight" : "size-4 text-muted-foreground/40"}
                />
            ))}
        </div>
    )
}

export function ReviewsSection() {
    return (
        <section className="bg-muted/50">
            <div className="container-page section-y">
                <Reveal>
                    <SectionHeading
                        eyebrow="Reviews"
                        title="Loved by customers across Bangladesh"
                        subtitle="Real stories from people who rented through JontroLagbe."
                    />
                </Reveal>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {REVIEWS.map((review, index) => (
                        <Reveal key={review.name} delay={index * 0.08} className="h-full">
                            <div className="card-soft flex h-full flex-col p-6">
                                <Quote className="size-6 text-primary/40" />
                                <p className="mt-3 flex-1 text-sm text-muted-foreground">{review.comment}</p>
                                <div className="mt-5">
                                    <Stars rating={review.rating} />
                                    <div className="mt-3 flex items-center gap-3">
                                        <UserAvatar name={review.name} />
                                        <div>
                                            <p className="text-sm font-semibold">{review.name}</p>
                                            <p className="text-xs text-muted-foreground">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}