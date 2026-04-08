"use client"
import Image from "next/image"
import { useState } from "react"
import dynamic from "next/dynamic"
const DottedMap = dynamic(() => import("@/features/map/DottedMap"), { ssr: false })
import LocationList from "@/features/contact/LocationList"
import Form from "@/features/contact/form"
import { motion } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"

export default function ContactPage() {
    const [activeCity, setActiveCity] = useState<string | null>(null)

    return (
        <main className="flex flex-col bg-premium-dark text-white overflow-hidden">
            
            <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                    <Image
                        src='/jet-sunset.webp'
                        fill
                        className="object-cover opacity-60"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                        alt="jet-sunset"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-transparent to-transparent" />
                </div>

                <Container className="h-full py-12 lg:pb-32 flex flex-col justify-center relative z-20">
                    <Grid>
                        <div className="col-span-4 lg:col-span-12 xl:col-span-8 flex flex-col items-start text-left">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="subtitle-standard text-white/60"
                            >
                                Get in Touch
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-h1 lg:text-h1-lg font-extralight tracking-tighter leading-[0.9] mb-8 text-white"
                            >
                                Contact <span className="text-white/40 italic lowercase">Us</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="description-standard max-w-2xl text-white/70"
                            >
                                We are a leading luxury charter company committed to elevating the standards of air travel. With a focus on excellence and unparalleled service, we provide discerning travelers with exceptional experiences in the skies.
                            </motion.p>
                        </div>
                    </Grid>
                </Container>
            </div>

            <section className="section-standard">
                <Container className="flex flex-col gap-24 lg:gap-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Grid className="items-end">
                            <div className="col-span-4 lg:col-span-6 space-y-6">
                                <span className="subtitle-standard">Global Presence</span>
                                <h2 className="h2-standard">
                                    Around <br /> <span className="text-white italic">the world</span>
                                </h2>
                            </div>
                            <div className="col-span-4 lg:col-start-8 lg:col-span-5 lg:pb-4 text-left">
                                <p className="description-standard">
                                    At JetFly, we understand that the world is your playground. That is why we have strategically placed our offices across the globe, ensuring that no matter where you are, we are nearby to cater to your every travel need.
                                </p>
                            </div>
                        </Grid>
                    </motion.div>

                    
                    <Grid className="items-stretch h-auto min-h-[600px] mb-32">
                        
                        <div className="col-span-4 lg:col-span-4 h-full flex flex-col justify-start overflow-hidden">
                            <LocationList
                                activeId={activeCity}
                                onActiveChange={setActiveCity}
                            />
                        </div>

                        
                        <div className="col-span-4 lg:col-start-6 lg:col-span-7 relative w-full h-full min-h-[400px] lg:min-h-0">
                            <DottedMap
                                activeCity={activeCity}
                                onActiveCityChange={setActiveCity}
                                className="relative w-full overflow-hidden group pt-12"
                            />
                        </div>
                    </Grid>
                </Container>
            </section>

            <Form />
        </main>
    )
}