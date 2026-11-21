import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { CATEGORIES } from "@/lib/types/equipment"
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/shared/social-icons"

const SOCIALS = [
    { label: "X", href: "https://x.com", Icon: XIcon },
    { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
    { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
    { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
]

export function SiteFooter() {
    return (
        <footer className="border-t bg-card">
            <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                        Rent the equipment you need from verified owners, for as long as you need it.
                    </p>
                    <div className="mt-5 flex gap-2">
                        {SOCIALS.map(({ label, href, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className="grid size-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                            >
                                <Icon className="size-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-heading text-sm font-semibold">Quick links</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                        <li><Link href="/equipment" className="hover:text-foreground">All Equipment</Link></li>
                        <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading text-sm font-semibold">Categories</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {CATEGORIES.map((category) => (
                            <li key={category}>
                                <Link
                                    href={`/equipment?category=${encodeURIComponent(category)}`}
                                    className="hover:text-foreground"
                                >
                                    {category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading text-sm font-semibold">Contact</h3>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Dhaka, Bangladesh</li>
                        <li className="flex items-center gap-2"><Phone className="size-4 text-primary" /> +880 1700 000000</li>
                        <li className="flex items-center gap-2"><Mail className="size-4 text-primary" /> hello@jontrolagbe.com</li>
                    </ul>
                </div>
            </div>
            <div className="border-t py-5 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} JontroLagbe. All rights reserved.
            </div>
        </footer>
    )
}