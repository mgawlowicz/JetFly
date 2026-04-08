import Experience from '@/features/home/experience'
import Baner from '@/features/home/baner'
import Fleet from '@/features/fleet/fleet'
import Map from '@/features/map/map'
import Form from '@/features/contact/form'

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JetFly",
    url: "https://jet-fly.vercel.app",
    logo: "https://jet-fly.vercel.app/logo.png",
    description:
      "JetFly delivers unforgettable luxury travel experiences through premium private jet charters.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "concierge@jetfly.com",
      contactType: "customer service",
      availableLanguage: ["English", "Polish"],
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <OrganizationJsonLd />
      <Baner />
      <Experience />
      <Fleet />
      <Map />
      <Form />
    </main>
  );
}
