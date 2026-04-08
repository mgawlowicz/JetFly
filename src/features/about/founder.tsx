"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"

export default function Founder() {
    return (
        <section className="section-standard" id="founder">
            <Container>
                <Grid className="items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-4 lg:col-span-5 flex flex-col gap-8 lg:gap-10"
                    >
                        <div className="flex flex-col gap-4">
                            <span className="subtitle-standard">Leadership</span>
                            <h2 className="h2-standard">
                                Visionary <br /> 
                                <span className="text-white italic">Founder</span>
                            </h2>
                        </div>
                        <div className="flex flex-col gap-6 lg:gap-8 max-w-2xl">
                        <p className="description-standard italic">
                            Benjamin Hughes, refused to settle for the status quo. His dream of luxurious travel experiences where comfort and customer service reign supreme led to the creation of JetFly.
                        </p>
                        <p className="description-standard">
                            It&apos;s more than just a company; it&apos;s a vision to revolutionize the standards of business aviation. Thanks to his passion and determination, JetFly doesn&apos;t just offer flights; it crafts unforgettable experiences that transcend ordinary travel.
                        </p>
                    </div>
                    <div className="w-16 h-px bg-white/10 transition-all duration-1000"></div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="col-span-4 lg:col-span-7 relative w-full aspect-[4/5] lg:aspect-[16/10] overflow-hidden group"
                >
                    <Image 
                        src={'/founder-picture.webp'} 
                        fill
                        style={{ objectFit: 'cover' }}
                        loading="lazy" 
                        alt="founder-picture" 
                        className="brightness-90 transition-transform duration-[15s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                </motion.div>
            </Grid>
        </Container>
    </section>
    )
}