"use client"
import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
    const stats = [
        { label: "Founding year", value: "2009" },
        { label: "Fleet", value: "10" },
        { label: "SERVED AIRPORTS", value: "80+" },
        { label: "Team size", value: "130+" }
    ]

    return (
        <section className="w-full py-32 lg:py-64 bg-premium-dark overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-16 flex flex-col gap-24 lg:gap-32">
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-4"
                    >
                        <span className="subtitle-standard">Identity</span>
                        <h2 className="h2-standard">
                            Who we <br /> 
                            <span className="text-white italic">are</span>
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl text-left"
                    >
                        <p className="description-standard">
                            We are a leading luxury charter company committed to elevating the standards of air travel. With a focus on excellence and unparalleled service, we provide discerning travelers with exceptional experiences in the skies.
                        </p>
                    </motion.div>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {stats.map((stat, i) => (
                        <motion.div 
                            key={stat.label}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="bg-premium-dark py-12 lg:py-16 px-8 flex flex-col gap-6 group transition-all duration-700"
                        >
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.4em] text-neutral-400 font-bold group-hover:text-white transition-colors">
                                    {stat.label}
                                </span>
                                <div className="w-8 h-px bg-white/10 group-hover:w-16 transition-all duration-700" />
                            </div>
                            <span className="text-3xl lg:text-4xl font-extralight tracking-tighter text-neutral-400 group-hover:text-white transition-colors duration-500">
                                {stat.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
                
                
                <motion.div 
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-[21/9] lg:aspect-[1920/600] overflow-hidden group"
                >
                    <Image 
                        src={'/team-meeting.webp'} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        loading="lazy" 
                        alt="team" 
                        className="brightness-[0.7] transition-transform duration-[15s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                    <div className="absolute top-12 left-12 w-16 h-px bg-white/10 group-hover:w-32 transition-all duration-1000"></div>
                    <div className="absolute top-12 left-12 w-px h-16 bg-white/10 group-hover:h-32 transition-all duration-1000"></div>
                </motion.div>
            </div>
        </section>
    )
}