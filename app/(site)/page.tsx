import { getEquipmentList } from "@/lib/api/equipment"
import { getSession } from "@/lib/core/server"
import { FeaturedSection } from "@/components/home/featured-section"
import { HeroBanner } from "@/components/home/hero-banner"
import { CategoriesSection } from "@/components/home/categories-section"
import {WhyChooseUs} from "@/components/home/why-choose-us"
import { StatsStrip } from "@/components/home/stats-strip"
import { ReviewsSection } from "@/components/home/reviews-section"


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
            <ReviewsSection />  
        </>
    )
}