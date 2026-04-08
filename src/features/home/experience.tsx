"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"

export default function Experience() {

  return (
    <section className="section-standard overflow-hidden mb-12 lg:mb-20">
      <Container className="mb-24 lg:mb-32">
        <div className="flex flex-col gap-12 lg:gap-20">
          <Grid>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-4 md:col-span-8 lg:col-span-8"
            >
              <span className="subtitle-standard">Our Philosophy</span>
              <h2 className="h2-standard">
                Experience <br /> 
                <span className="text-white italic">is everything</span>
              </h2>
            </motion.div>
          </Grid>
          
          <Grid>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-4 md:col-span-12 lg:col-start-9 lg:col-span-4 text-left"
            >
              <p className="description-standard">
                Experience luxury travel like never before. Elevate your journey with our private fleet of luxurious aircraft. With JetFly every moment in the air is unforgettable.
              </p>
            </motion.div>
          </Grid>
        </div>
      </Container>

      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[16/10] lg:aspect-[3/1] overflow-hidden group"
      >
        <Image
          src='/gulfstreamG600-interior.webp'
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          alt="Gulfstream G600 Interior"
          className="transition-transform duration-[15s] group-hover:scale-110 brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
        
        
        <div className="absolute top-12 left-12 w-16 h-px bg-white/10 group-hover:w-32 transition-all duration-1000"></div>
        <div className="absolute top-12 left-12 w-px h-16 bg-white/10 group-hover:h-32 transition-all duration-1000"></div>
      </motion.div>
    </section>
  )
}