import Baner from '@/features/fleet/baner';
import Form from '@/features/contact/form';
import FleetClient from '@/features/fleet/fleet-client';
import jets from '@/data/data.json';
import type { Plane } from '@/lib/types';

export default function FleetPage() {
  const planes = (jets as Plane[]).map((jet) => ({
    brand: jet.brand,
    model: jet.model,
    slug: jet.slug,
    details: { price: jet.details.price },
    image: { url: jet.image.url, alt: jet.image.alt },
  }));

  return (
    <main className='flex flex-col bg-premium-dark min-h-screen'>
      <Baner />
      <FleetClient planes={planes} />
      <Form />
    </main>
  );
}
