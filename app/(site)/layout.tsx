import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

// header, dynamic content, footer
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SiteNavbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <SiteFooter />
        </>
    )
}