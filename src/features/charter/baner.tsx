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

export default function Baner(){

    return (
        <div className="relative w-full h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden bg-premium-dark">
            <Image 
                src='/charter-baner.webp'
                quality={80} 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                alt="Charter flight banner" 
                className="brightness-[0.4] transition-transform duration-[20s] hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-premium-dark z-10" />
            
            <div className="absolute inset-0 z-20 flex items-center">
                <Container>
                    <motion.div 
                        variants={container} 
                        initial="hidden" 
                        animate="show"
                    >
                        <Grid>
                            <div className="col-span-4 md:col-span-8 lg:col-span-12 xl:col-span-10 flex flex-col gap-8">
                                <motion.span 
                                    variants={item}
                                    className="subtitle-standard"
                                >
                                    Exclusive Travel Solutions
                                </motion.span>
                                <motion.h1 
                                    className="text-h1 lg:text-h1-lg font-extralight leading-[1] tracking-tighter" 
                                    variants={item}
                                >
                                    Charter <br /> 
                                    <span className="text-neutral-400 italic">your flight</span>
                                </motion.h1>
                                <motion.p 
                                    className="description-standard max-w-2xl" 
                                    variants={item}
                                >
                                    Experience the ultimate in personalized travel. From luxurious aircraft to flexible scheduling, we cater to your every need, ensuring a seamless and unforgettable journey.
                                </motion.p>
                            </div>
                        </Grid>
                    </motion.div>
                </Container>
            </div>
        </div>
    )
}
