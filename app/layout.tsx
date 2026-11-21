import type { Metadata } from "next"
import { DM_Sans, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })

export const metadata: Metadata = {
    title: {
        default: "JontroLagbe | Rent the equipment you need",
        template: "%s | JontroLagbe",
    },
    description:
        "JontroLagbe connects equipment owners and customers. Browse, book and rent equipment for the time you need.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${sora.variable} ${dmSans.variable}`}>
            <body>
                <ThemeProvider>
                    {children}
                    <Toaster richColors position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    )
}