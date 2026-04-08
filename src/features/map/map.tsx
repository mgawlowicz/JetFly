"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
const DottedMap = dynamic(() => import("./DottedMap"), { ssr: false })
import { Container, Grid } from "@/components/layout/layout-system"
import LocationList from "@/features/contact/LocationList"

export default function Map() {
  const [activeCity, setActiveCity] = useState<string | null>(null)

  return (
    <section className="w-full py-32 lg:py-64 bg-premium-dark overflow-hidden">
      <Container>
        <div className="flex flex-col gap-24 lg:gap-40">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Grid className="items-end">
                <div className="col-span-4 lg:col-span-6 space-y-6">
                <span className="subtitle-standard">Global Presence</span>
                <h2 className="h2-standard">Around <br /> <span className="text-neutral-400 italic">the world</span></h2>
                </div>
                <div className="col-span-4 lg:col-start-8 lg:col-span-5 lg:pb-4 text-left">
                <p className="description-standard">
                    At JetFly, we understand that the world is your playground. That is why we have strategically placed our offices across the globe, ensuring that no matter where you are, we are nearby to cater to your every travel need.
                </p>
                </div>
            </Grid>
          </motion.div>

          
          <Grid className="items-stretch">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-4 lg:col-span-4 h-full flex flex-col justify-start overflow-hidden"
            >
              <LocationList 
                activeId={activeCity}
                onActiveChange={setActiveCity}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-4 lg:col-start-6 lg:col-span-7 relative w-full h-full flex items-start"
            >
              <DottedMap activeCity={activeCity} onActiveCityChange={setActiveCity} />
            </motion.div>
          </Grid>
        </div>
      </Container>
    </section>
  )
}