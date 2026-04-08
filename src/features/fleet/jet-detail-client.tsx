"use client"
import Image from "next/image"
import { useState } from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
}

interface HeroBannerProps {
    brand: string
    model: string
    description: string
    imageUrl: string
    imageAlt: string
}

export function HeroBanner({ brand, model, description, imageUrl, imageAlt }: HeroBannerProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8"
        >
            <motion.span
                variants={itemVariants}
                className="subtitle-standard"
            >
                {brand} Presents
            </motion.span>
            <motion.h1
                className="text-4xl lg:text-[5.625rem] font-extralight leading-[1] tracking-tighter"
                variants={itemVariants}
            >
                {brand} <br />
                <span className="text-neutral-400 italic">{model}</span>
            </motion.h1>
            <motion.p
                className="description-standard max-w-2xl"
                variants={itemVariants}
            >
                {description}
            </motion.p>
        </motion.div>
    )
}

interface SpecsGridProps {
    specs: { label: string; value: string; highlight?: boolean }[]
}

export function SpecsGrid({ specs }: SpecsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {specs.map((spec, i) => (
                <motion.div
                    key={spec.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="bg-premium-dark py-12 lg:py-16 px-8 flex flex-col gap-6 group transition-all duration-700"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.4em] text-neutral-400 font-bold group-hover:text-white transition-colors">
                            {spec.label}
                        </span>
                        <div className="w-8 h-px bg-white/10 group-hover:w-16 transition-all duration-700" />
                    </div>
                    <span className={`text-3xl lg:text-4xl font-extralight tracking-tighter transition-colors
                        ${spec.highlight ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                        {spec.value}
                    </span>
                </motion.div>
            ))}
        </div>
    )
}

interface InteriorImage {
    url: string
    alt: string
}

interface InteriorGalleryProps {
    slug: string
    images: InteriorImage[]
}

export function InteriorGallery({ slug, images }: InteriorGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {images.map((interior, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 1 }}
                        className="relative aspect-[4/5] overflow-hidden group border border-white/5 cursor-zoom-in bg-neutral-900"
                        onClick={() => setSelectedImage(`/Jets/${slug}/${interior.url}`)}
                    >
                        <Image
                            src={`/Jets/${slug}/${interior.url}`}
                            fill
                            quality={90}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            alt={interior.alt}
                            className="transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">Explore Detail</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:p-24 cursor-zoom-out"
                    >
                        <motion.button
                            className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <span className="text-xs uppercase tracking-[0.4em]">Close</span>
                        </motion.button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={selectedImage}
                                alt="Aircraft Interior detail"
                                fill
                                quality={100}
                                priority
                                style={{ objectFit: 'contain' }}
                                className="select-none"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
