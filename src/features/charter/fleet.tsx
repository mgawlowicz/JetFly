"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Fleet() {
    const planes = [
        {
            brand: "Gulfstream",
            model: "G550",
            price: "4999",
            image: "/Jets/gulfstream-g550/g-550.webp",
            slug: "gulfstream-g550"
        },
        {
            brand: "Gulfstream",
            model: "G600",
            price: "8999",
            image: "/Jets/gulfstream-g600/g-600.webp",
            slug: "gulfstream-g600"
        },
        {
            brand: "Dassault",
            model: "Falcon 7X",
            price: "6999",
            image: "/Jets/dassault-falcon-7x/falcon-7x.webp",
            slug: "dassault-falcon-7x"
        }
    ]

    return (
        <section className="w-full py-32 lg:py-48 bg-premium-dark overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline mb-24"
                >
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <span className="subtitle-standard">Exclusive Fleet</span>
                        <h2 className="h2-standard">Premium <br /> <span className="text-white italic">Selection</span></h2>
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                        <Link href="/fleet" className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 hover:text-white transition-all border-b border-white/5 hover:border-white pb-2 duration-500">
                            Explore Entire Fleet
                        </Link>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {planes.map((plane, index) => (
                        <motion.div
                            key={plane.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <Link href={`/fleet/${plane.slug}`} className="group relative block w-full aspect-[4/5] overflow-hidden rounded-sm transition-all duration-700">
                                <Image 
                                    src={plane.image} 
                                    fill 
                                    alt={`${plane.brand} ${plane.model}`} 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="brightness-[0.5] object-cover transition-transform duration-[2s] group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                                
                                <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 font-bold block mb-1 group-hover:text-white/60 transition-colors duration-700">{plane.brand}</span>
                                        <h3 className="text-4xl lg:text-5xl font-extralight tracking-tighter group-hover:translate-x-2 transition-transform duration-700 uppercase">{plane.model}</h3>
                                    </div>
                                    
                                    <div className="flex justify-between items-end w-full">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[8px] uppercase tracking-[0.4em] text-neutral-400 font-bold block">From</span>
                                            <p className="text-2xl font-light tracking-tighter text-white/80 group-hover:text-white transition-colors duration-700">${plane.price.toLocaleString()}<span className="text-sm font-extralight text-neutral-400 ml-2 italic group-hover:text-white/60">/ h</span></p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:scale-110">
                                            <span className="text-xl font-light">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
