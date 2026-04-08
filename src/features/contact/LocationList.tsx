"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { locations } from '@/data/locations'

interface LocationListProps {
    activeId: string | null
    onActiveChange: (id: string | null) => void
}

export default function LocationList({ activeId, onActiveChange }: LocationListProps) {
    const [currentTimeUTC, setCurrentTimeUTC] = useState(new Date())
    const [expandedId, setExpandedId] = useState<string | null>(null)

    useEffect(() => {
        const timer = setInterval(() => setCurrentTimeUTC(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    const isOfficeOpen = (offset: number) => {
        const localHour = (currentTimeUTC.getUTCHours() + offset + 24) % 24
        return localHour >= 9 && localHour < 18 
    }

    const toggleAccordion = (id: string, label: string) => {
        if (expandedId === id) {
            setExpandedId(null)
            onActiveChange(null)
        } else {
            setExpandedId(id)
            onActiveChange(label)
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            {locations.map((loc, idx) => {
                const isOpen = isOfficeOpen(loc.offset)
                const isExpanded = expandedId === loc.id
                return (
                    <div
                        key={loc.id}
                        className="border-b border-white/5"
                    >
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onClick={() => toggleAccordion(loc.id, loc.label)}
                            onMouseEnter={() => !isExpanded && onActiveChange(loc.label)}
                            onMouseLeave={() => !isExpanded && onActiveChange(null)}
                            className="w-full relative flex items-center justify-between py-4 lg:py-6 group transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <span className={`text-xs uppercase tracking-[0.3em] transition-colors duration-500 
                                    ${activeId === loc.label || isExpanded ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                                    {loc.city}
                                </span>
                                <div className="flex items-center gap-2">
                                    {isOpen ? (
                                        
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" title="Office Open" />
                                    ) : loc.isVip24h ? (
                                        
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                                            <span className="text-[8px] font-bold text-purple-400 tracking-[0.2em] uppercase whitespace-nowrap">ONLY VIP</span>
                                        </div>
                                    ) : (
                                        
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 transition-colors duration-500" title="Office Closed" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <motion.span 
                                    animate={{ rotate: isExpanded ? 45 : 0 }}
                                    className={`text-3xl font-extralight transition-colors ${activeId === loc.label || isExpanded ? 'text-white' : 'text-neutral-400'}`}
                                >
                                    +
                                </motion.span>
                            </div>
                        </motion.button>

                        <motion.div
                            initial="closed"
                            animate={isExpanded ? "open" : "closed"}
                            variants={{
                                open: { 
                                    height: 'auto', 
                                    opacity: 1,
                                    transition: {
                                        height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                                        opacity: { duration: 0.3, delay: 0.1 }
                                    }
                                },
                                closed: { 
                                    height: 0, 
                                    opacity: 0,
                                    transition: {
                                        height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                                        opacity: { duration: 0.2 }
                                    }
                                }
                            }}
                            className="overflow-hidden"
                        >
                            <div className="pb-8">
                                <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Location</span>
                                        <p className="text-neutral-200 text-sm font-medium leading-relaxed mb-1">
                                            {loc.area}
                                        </p>
                                        <p className="text-neutral-400 text-sm font-light leading-relaxed">
                                            {loc.address}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Contact</span>
                                        <div className="flex flex-col text-xs uppercase tracking-widest text-neutral-400 font-medium gap-1">
                                            <span className="hover:text-white transition-colors">{loc.email}</span>
                                            <span className="hover:text-white transition-colors">{loc.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )
            })}
        </div>
    )
}
