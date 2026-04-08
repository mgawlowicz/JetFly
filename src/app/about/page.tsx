import Baner from "@/features/about/baner"
import Pros from "@/features/about/pros"
import AboutSection from "@/features/about/about"
import Founder from "@/features/about/founder"
import Numbers from "@/features/about/numbers"
import Form from "@/features/contact/form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us | JetFly Luxury Private Flights",
    description: "Learn more about JetFly's mission to deliver unforgettable luxury travel experiences. Our team of aviation experts is committed to excellence.",
    alternates: {
        canonical: "https://jet-fly.vercel.app/about",
    },
}

export default function Home() {

    return (
        <main className="flex flex-col bg-premium-dark text-white min-h-screen">
            <Baner/>
            <Pros/>
            <AboutSection/>
            <Founder/>
            <Numbers/>
            <Form />
        </main>
    )
}