import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us | JetFly Luxury Private Flights",
    description: "Get in touch with JetFly for luxury private jet inquiries, assistance, and global flight planning. Our dedicated team is available 24/7.",
    alternates: {
        canonical: "https://jet-fly.vercel.app/contact",
    },
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
