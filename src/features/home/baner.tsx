"use client"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"

const container: Variants = {
    hidden: {
        opacity:0
    },
    show: {
        opacity:1,
        transition: {
            staggerChildren: 0.2, 
            delayChildren: 0.3,
        }
    }
}

const mainItem: Variants =  {
    hidden: { 
        opacity: 0,
        y: 20, 
    },
    show: {
        opacity: 1,
        y:0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
}

const item: Variants = {
    hidden: {
        opacity:0,
        y: 20,
    },
    show: {
        opacity:1,
        y:0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
}

const arrow: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1, delay: 1.5 }}
}

export default function Baner(){

    return (
        <div className="relative w-full h-screen overflow-hidden bg-premium-dark">
            <Image 
                src='/baner.webp'
                quality={80} 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                alt="JetFly Hero - Luxury Private Jet" 
                className="brightness-[0.6] transition-transform duration-[20s] hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-premium-dark z-10" />
            
            <div className="absolute inset-0 z-20 flex items-center">
                <Container className="h-full flex flex-col justify-center">
                    <motion.div 
                        variants={container} 
                        initial="hidden" 
                        animate="show"
                    >
                        <Grid>
                            <div className="col-span-4 md:col-span-6 lg:col-span-10 xl:col-span-8 flex flex-col gap-12">
                                <div className="space-y-8">
                                    <motion.span 
                                        variants={item}
                                        className="subtitle-standard"
                                    >
                                        Premium Private Aviation
                                    </motion.span>
                                    <motion.h1 
                                        className="text-h1 lg:text-h1-lg font-extralight leading-[1] tracking-tighter" 
                                        variants={mainItem}
                                    >
                                        A new better way <br /> 
                                        <span className="text-neutral-400 italic">of private flying</span>
                                    </motion.h1>
                                    <motion.p 
                                        className="description-standard max-w-2xl" 
                                        variants={item}
                                    >
                                        Renting a private jet has never been so easy. Experience unparalleled comfort and precision in the skies.
                                    </motion.p>
                                </div>
                                
                                <motion.div variants={item} className="flex flex-wrap gap-6 items-center">
                                    <Link href="/charter" className="relative group px-12 py-5 bg-white text-black border border-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-700 hover:bg-transparent hover:text-white active:scale-95 overflow-hidden">
                                        Charter jet
                                    </Link>
                                    <Link href="/fleet" className="relative group px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-700 hover:border-white/40 hover:bg-white/5 active:scale-95">
                                        Our Fleet
                                    </Link>
                                </motion.div>
                            </div>
                        </Grid>
                    </motion.div>
                </Container>
            </div>
            
            <motion.div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30" 
                variants={arrow} 
                initial="hidden" 
                animate="show"
            >
                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                    <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold group-hover:text-white/50 transition-colors duration-500">Scroll</span>
                    <div className="w-px h-16 bg-gradient-to-b from-white/20 via-white/20 to-transparent group-hover:h-24 transition-all duration-1000"></div>
                </div>
            </motion.div>
        </div>
    )
}