"use client"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Grid } from "@/components/layout/layout-system"

interface JetItemProps {
  brand: string;
  model: string;
  price: string;
  slug: string;
  image: string;
  delay?: number;
  priority?: boolean;
}

const JetItem = ({ brand, model, price, slug, image, delay = 0, priority = false }: JetItemProps) => (
  <motion.div
    className="w-full"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
  >
    <Link href={`/fleet/${slug}`} className="group relative block w-full aspect-[16/9] md:aspect-[21/9] xl:aspect-[32/9] overflow-hidden border-b border-white/5 transition-all duration-700">
      <Image
        src={image}
        fill
        style={{ objectFit: "cover" }}
        sizes="100vw"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        alt={model}
        className="transition-transform duration-[2s] ease-out group-hover:scale-[1.05] brightness-[0.5] group-hover:brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-1000 z-10" />
      <div className="absolute inset-0 z-20">
        <Container className="h-full py-12 lg:py-20 flex flex-col justify-between">
          <Grid className="w-full items-start">
            <div className="col-span-4 lg:col-span-8 flex flex-col gap-2 lg:gap-4">
              <span className="subtitle-standard group-hover:text-white/60 transition-colors duration-700">{brand}</span>
              <h3 className="text-4xl lg:text-6xl xl:text-h1-lg font-extralight tracking-tighter transition-transform duration-700 group-hover:translate-x-2 uppercase">{model}</h3>
            </div>
          </Grid>

          <div className="flex flex-row justify-between items-end w-full gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Base Rate</p>
              <p className="text-2xl lg:text-4xl font-light tracking-tighter text-white/80 group-hover:text-white transition-colors duration-700">${price}<span className="text-xl font-extralight text-neutral-400 ml-4 italic group-hover:text-white/60 transition-colors duration-700">/ hour</span></p>
            </div>
            <div className="flex justify-end items-center gap-8 pb-1">
              <span className="hidden lg:block text-[10px] uppercase tracking-[0.5em] font-bold text-white/0 group-hover:text-white/40 transition-all duration-1000 blur-sm group-hover:blur-0 translate-x-8 group-hover:translate-x-0">Explore Aircraft</span>
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:scale-110">
                <span className="text-2xl font-light">→</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Link>
  </motion.div>
)

export default function Fleet() {
  return (
    <section className="section-standard">
      <Container className="mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Grid className="items-baseline">
            <div className="col-span-4 md:col-span-5 lg:col-span-8">
              <h2 className="h2-standard">
                Premium <br /> <span className="text-white italic">Selection</span>
              </h2>
            </div>
            <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:text-right">
              <Link href="/fleet" className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 hover:text-white transition-all border-b border-transparent hover:border-white pb-2 duration-500">
                Explore Entire Fleet
              </Link>
            </div>
          </Grid>
        </motion.div>
      </Container>

      <div className="flex flex-col border-t border-white/5">
        <JetItem
          brand="Gulfstream"
          model="G550"
          price="4,999"
          slug="gulfstream-g550"
          image="/g550.webp"
          priority={true}
        />
        <JetItem
          brand="Gulfstream"
          model="G600"
          price="6,999"
          slug="gulfstream-g600"
          image="/g600.webp"
          delay={0.1}
        />
        <JetItem
          brand="Dassault"
          model="Falcon 7X"
          price="7,999"
          slug="dassault-falcon-7x"
          image="/falcon7x.webp"
          delay={0.2}
        />
      </div>
    </section>
  )
}