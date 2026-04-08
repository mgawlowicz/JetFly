"use client"
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { PlaneCard } from "@/lib/types";

interface JetProps {
    search: string;
    sortBy: string;
    planes: PlaneCard[];
}

export default function Jets({ search, sortBy, planes }: JetProps) {
    const filteredPlanes = useMemo(() => {
        let result = [...planes];

        
        if (search) {
            result = result.filter(plane => 
                plane.brand.toLowerCase().includes(search.toLowerCase()) || 
                plane.model.toLowerCase().includes(search.toLowerCase())
            );
        }

        
        switch (sortBy) {
            case 'Price: Low':
                result.sort((a, b) => a.details.price - b.details.price);
                break;
            case 'Price: High':
                result.sort((a, b) => b.details.price - a.details.price);
                break;
            case 'Model Name':
                result.sort((a, b) => a.model.localeCompare(b.model));
                break;
            default:
                break;
        }

        return result;
    }, [search, sortBy, planes]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
            <AnimatePresence mode='popLayout'>
                {filteredPlanes.map((plane, index) => (
                    <motion.div
                        layout
                        key={plane.slug}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            duration: 0.4, 
                            delay: index * 0.05,
                            layout: { duration: 0.4, ease: "easeOut" }
                        }}
                    >
                        <Link href={`/fleet/${plane.slug}`} className="group relative block w-full aspect-[4/5] overflow-hidden rounded-sm transition-all duration-700 bg-neutral-900">
                            <Image 
                                src={`/Jets/${plane.slug}/${plane.image.url}`} 
                                fill 
                                alt={plane.image.alt} 
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="brightness-[0.5] object-cover transition-transform duration-[2s] group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
                            
                            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 font-bold block mb-1 group-hover:text-white/60 transition-colors duration-700">{plane.brand}</span>
                                    <h2 className="text-3xl lg:text-5xl font-extralight tracking-tighter group-hover:translate-x-2 transition-transform duration-700 uppercase">{plane.model}</h2>
                                </div>
                                
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[8px] uppercase tracking-[0.4em] text-neutral-400 font-bold block">Base Rate</span>
                                        <p className="text-2xl font-light tracking-tighter text-white/80 group-hover:text-white transition-colors duration-700">${plane.details.price.toLocaleString()}<span className="text-sm font-extralight text-neutral-400 ml-2 italic group-hover:text-white/60">/ h</span></p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:scale-110">
                                        <span className="text-xl font-light">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}