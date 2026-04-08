import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import jets from "@/data/data.json"
import { Container } from "@/components/layout/layout-system"
import { HeroBanner, SpecsGrid, InteriorGallery } from "@/features/fleet/jet-detail-client"
import Form from "@/features/contact/form"
import type { Plane } from "@/lib/types"

const ArrowLeft = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
)


export function generateStaticParams() {
    return (jets as Plane[]).map((jet) => ({
        jetSlug: jet.slug,
    }))
}


interface PageProps {
    params: Promise<{ jetSlug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { jetSlug } = await params
    const plane = (jets as Plane[]).find((j) => j.slug === jetSlug)
    if (!plane) return {}

    return {
        title: `${plane.brand} ${plane.model} | JetFly Fleet`,
        description: plane.description.slice(0, 160),
        alternates: {
            canonical: `https://jet-fly.vercel.app/fleet/${jetSlug}`,
        },
    }
}


function ProductJsonLd({ plane }: { plane: Plane }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${plane.brand} ${plane.model}`,
        description: plane.description,
        brand: {
            "@type": "Brand",
            name: plane.brand,
        },
        image: `https://jet-fly.vercel.app/Jets/${plane.slug}/${plane.image.url}`,
        offers: {
            "@type": "Offer",
            price: plane.details.price,
            priceCurrency: "USD",
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            availability: "https://schema.org/InStock",
            url: `https://jet-fly.vercel.app/fleet/${plane.slug}`,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}


export default async function JetPage({ params }: PageProps) {
    const { jetSlug } = await params
    const data = (jets as Plane[]).find((j) => j.slug === jetSlug)

    if (!data) {
        notFound()
    }

    const specs = [
        { label: "Cruise Speed", value: `${data.details.speed} km/h` },
        { label: "Max Range", value: data.details.range.toString().includes('km') ? data.details.range : `${data.details.range} nm` },
        { label: "Passenger Capacity", value: `Up to ${data.details.capacity}` },
        { label: "Starting Price", value: `$${data.details.price} / h`, highlight: true },
    ]

    const interiorImages = [
        data.image.interior.first,
        data.image.interior.second,
        data.image.interior.third,
    ]

    return (
        <main className="flex flex-col bg-premium-dark min-h-screen">
            <ProductJsonLd plane={data} />

            
            <div className="relative w-full h-[80vh] lg:h-screen overflow-hidden bg-premium-dark">
                <Image
                    src={`/Jets/${data.slug}/${data.image.url}`}
                    alt={data.image.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="brightness-[0.4] transition-transform duration-[15s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-premium-dark z-10" />

                <div className="absolute inset-x-0 top-32 lg:top-40 z-30">
                    <Container>
                        <Link
                            href="/fleet"
                            className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group mb-8 w-fit pointer-events-auto"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Back to Fleet</span>
                        </Link>
                    </Container>
                </div>

                <div className="absolute inset-0 z-20 flex items-center">
                    <Container>
                        <HeroBanner
                            brand={data.brand}
                            model={data.model}
                            description={data.description}
                            imageUrl={data.image.url}
                            imageAlt={data.image.alt}
                        />
                    </Container>
                </div>
            </div>

            
            <Container className="py-24 lg:py-48">
                <div className="flex flex-col gap-24">
                    <div className="flex flex-col gap-6">
                        <span className="subtitle-standard">
                            Capabilities
                        </span>
                        <h2 className="text-2xl lg:text-4xl font-extralight tracking-tight leading-tight">
                            Technical <span className="text-neutral-400">Specifications</span>
                        </h2>
                    </div>

                    <SpecsGrid specs={specs} />
                </div>
            </Container>

            
            <Container className="pb-24 lg:pb-36">
                <div className="flex flex-col gap-12 lg:gap-20">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="flex flex-col gap-6">
                            <span className="subtitle-standard">
                                Craftsmanship
                            </span>
                            <h3 className="text-2xl lg:text-4xl font-extralight tracking-tight leading-tight">
                                Exquisite <span className="text-neutral-400">Interior</span>
                            </h3>
                        </div>
                        <p className="description-standard max-w-md">
                            Every detail is meticulously crafted to ensure the highest standards of luxury and comfort throughout your journey.
                        </p>
                    </div>

                    <InteriorGallery slug={data.slug} images={interiorImages} />
                </div>
            </Container>

            <Form />
        </main>
    )
}