import { getEquipmentList } from "@/lib/api/equipment"
import { getSession } from "@/lib/core/server"
import { CategoriesSection } from "@/components/home/categories-section"
import { CtaBanner } from "@/components/home/cta-banner"
import { FaqSection } from "@/components/home/faq-section"
import { FeaturedSection } from "@/components/home/featured-section"
import { HeroBanner } from "@/components/home/hero-banner"
import { HowItWorks } from "@/components/home/how-it-works"
import { ReviewsSection } from "@/components/home/reviews-section"
import { StatsStrip } from "@/components/home/stats-strip"
import { WhyChooseUs } from "@/components/home/why-choose-us"

export default async function HomePage() {
    // 6 approved items, the server uses a mongodb limit
    const [session, featured] = await Promise.all([
        getSession(),
        getEquipmentList({ limit: 6, sort: "newest" }),
    ])

    return (
        <>
            <HeroBanner />
            <FeaturedSection items={featured.data} isLoggedIn={!!session} />
            <CategoriesSection />
            <WhyChooseUs />
            <StatsStrip />
            <HowItWorks />
            <ReviewsSection />
            <FaqSection />
            <CtaBanner />
        </>
    )
}