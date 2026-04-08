"use client"
import Image from "next/image"
import { motion, Variants } from "framer-motion"

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
                src='/fleet-baner-new.webp'
                quality={80} 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                alt="JetFly Fleet Banner" 
                className="brightness-[0.4] transition-transform duration-[20s] hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-premium-dark z-10" />
            
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-[1920px] mx-auto px-6 lg:px-16 w-full">
                    <motion.div 
                        variants={container} 
                        initial="hidden" 
                        animate="show"
                        className="grid grid-cols-1 lg:grid-cols-12"
                    >
                        <div className="md:col-span-8 lg:col-span-12 xl:col-span-10 flex flex-col gap-8">
                            <motion.span 
                                variants={item}
                                className="subtitle-standard"
                            >
                                World-Class Aviation
                            </motion.span>
                            <motion.h1 
                                className="text-h1 lg:text-h1-lg font-extralight leading-[1] tracking-tighter" 
                                variants={item}
                            >
                                Our <br /> 
                                <span className="text-neutral-400 italic">exceptional fleet</span>
                            </motion.h1>
                            <motion.p 
                                className="description-standard max-w-2xl" 
                                variants={item}
                            >
                                Explore our impressive collection of meticulously maintained aircraft, designed to provide unparalleled comfort and luxury during your journey. From sleek jets to spacious cabins, we offer a diverse range of options to suit your travel preferences.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
