"use client"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        }
    }
}

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
}

export default function Baner() {
    return (
        <section className="relative w-full h-[70vh] md:h-[72vh] lg:h-[75vh] bg-premium-dark overflow-hidden">
            
            <Image
                src='/cockpit-view.webp'
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                alt="cockpit view"
                className="brightness-[0.4] transition-transform duration-[20s] hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-premium-dark z-10" />

            
            <div className="relative z-20 h-full flex flex-col pt-32 lg:pt-48">
                <Container>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <Grid className="items-end">
                            <motion.div
                                variants={item}
                                className="col-span-4 md:col-span-5 lg:col-span-8 flex flex-col gap-4"
                            >
                                <span className="subtitle-standard">World-Class Aviation</span>
                                <h1 className="text-h1 lg:text-h1-lg font-extralight tracking-tighter leading-[0.9]">
                                    Let&apos;s get to <br />
                                    <span className="text-neutral-400 italic lowercase">know each other</span>
                                </h1>
                            </motion.div>

                            <motion.div
                                variants={item}
                                className="col-span-4 md:col-span-3 lg:col-span-4 lg:pb-4"
                            >
                                <p className="description-standard italic">
                                    Welcome aboard JetFly! Whether you&apos;re a traveler or a frequent flyer, we&apos;re here to make your journey unforgettable. Sit back, relax, and let&apos;s create amazing memories.
                                </p>
                            </motion.div>
                        </Grid>
                    </motion.div>
                </Container>
            </div>

        </section>
    )
}