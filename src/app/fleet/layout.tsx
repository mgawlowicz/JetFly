import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Fleet | JetFly Luxury Private Flights",
    description: "Explore our premium selection of luxury private jets. From Gulfstream to Falcon, find the perfect aircraft for your next mission.",
    alternates: {
        canonical: "https://jet-fly.vercel.app/fleet",
    },
}

export default function FleetLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
