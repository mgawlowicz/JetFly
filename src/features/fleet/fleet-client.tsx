"use client"
import { useState } from 'react';
import Jets from '@/features/fleet/jets';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/layout-system';
import type { PlaneCard } from '@/lib/types';

interface FleetClientProps {
    planes: PlaneCard[];
}

export default function FleetClient({ planes }: FleetClientProps) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('Default');

    const sortOptions = ['Default', 'Price: Low', 'Price: High', 'Model Name'];

    return (
        <Container className='flex flex-col gap-12 py-24'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-12 lg:gap-8'>
                <div className='flex flex-col gap-6 w-full lg:w-fit min-w-[300px]'>
                    <span className="subtitle-standard">Refine Search</span>
                    <div className="relative group">
                        <input 
                            type='text' 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='SEARCH AIRCRAFT...' 
                            className='bg-transparent border-b border-white/10 py-4 px-1 outline-none w-full text-lg lg:text-xl font-light transition-all focus:border-white group-hover:border-white/40 uppercase tracking-widest placeholder:text-neutral-700' 
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-6 w-full lg:w-fit'>
                    <span className="subtitle-standard">Sort By</span>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-0 border border-white/10 rounded-sm overflow-hidden relative w-full lg:w-fit">
                        {sortOptions.map((label) => (
                            <button 
                                key={label}
                                onClick={() => setSortBy(label)}
                                className={`relative flex-1 min-w-0 py-4 px-4 sm:px-6 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 z-10 whitespace-nowrap
                                    ${sortBy === label ? 'text-black' : 'text-neutral-400 hover:text-white'}`}
                            >
                                {sortBy === label && (
                                    <motion.div 
                                        layoutId="sort-bg"
                                        className="absolute inset-0 bg-white"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Jets search={search} sortBy={sortBy} planes={planes} />
        </Container>
    );
}
