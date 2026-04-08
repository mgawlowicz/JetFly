import Baner from "@/features/charter/baner"
import Quote from "@/features/charter/quote"
import Fleet from "@/features/charter/fleet"
import Form from "@/features/contact/form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Charter a Private Jet | JetFly Luxury Private Flights",
    description: "Book your next private flight with JetFly. Choose from our luxury fleet and experience unrivaled comfort, flexibility, and professional service.",
    alternates: {
        canonical: "https://jet-fly.vercel.app/charter",
    },
}

export default function Home() {
    return (
        <main className="flex flex-col bg-premium-dark">
            
            <Baner />
            
            
            <Quote />
            <Fleet />
            
            
            <Form />
        </main>
    )
}
