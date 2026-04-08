"use client"
import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import worldPaths from './world-paths.json'

import { locations, LocationData } from '@/data/locations'

interface DottedMapProps {
    activeCity: string | null
    onActiveCityChange?: (city: string | null) => void
    className?: string
}


const landmassPaths = worldPaths;

export default function DottedMap({ activeCity, onActiveCityChange, className }: DottedMapProps) {
    const project = (lat: number, lng: number) => {
        
        const x = (lng + 180) * (1000 / 360)
        
        
        const y = ((90 - lat) * (500 / 180)) + 62.5
        return { x, y }
    }

    const dots = useMemo(() => {
        const result = []
        const nx = 60 
        const ny = 30 
        for (let i = 0; i < nx; i++) {
            for (let j = 0; j < ny; j++) {
                const x = (i / nx) * 920 + 80
                const y = (j / ny) * 427.5 + 62.5
                result.push({ x, y })
            }
        }
        return result
    }, [])

    const getGeodesicCirclePaths = (lat1Deg: number, lng1Deg: number, dKm: number, strokeRange: [number, number]) => {
        const R = 6371;
        const dR = dKm / R;
        const lat1 = (lat1Deg * Math.PI) / 180;
        const lng1 = (lng1Deg * Math.PI) / 180;

        const northPoleDist = (Math.PI / 2) - lat1;
        const southPoleDist = (Math.PI / 2) + lat1;
        const encompassesNorth = dR > northPoleDist;
        const encompassesSouth = dR > southPoleDist;

        if (encompassesNorth || encompassesSouth) {
            
            const points = [];
            const poleY = encompassesNorth ? 62.5 : 562.5;

            for (let deg = -180; deg <= 180; deg += 3) {
                const deltaLng = (deg * Math.PI / 180) - lng1;

                const A = Math.sin(lat1);
                const B = Math.cos(lat1) * Math.cos(deltaLng);
                const C = Math.cos(dR);

                const root = Math.sqrt(A * A + B * B);
                if (Math.abs(C) <= root) {
                    const phi = Math.atan2(B, A);
                    const angle = Math.asin(C / root);

                    let sol1 = angle - phi;
                    let sol2 = Math.PI - angle - phi;

                    while (sol1 > Math.PI) sol1 -= 2 * Math.PI;
                    while (sol1 <= -Math.PI) sol1 += 2 * Math.PI;
                    while (sol2 > Math.PI) sol2 -= 2 * Math.PI;
                    while (sol2 <= -Math.PI) sol2 += 2 * Math.PI;

                    const epsilon = 1e-6;
                    const v1 = (sol1 >= -Math.PI / 2 - epsilon && sol1 <= Math.PI / 2 + epsilon);
                    const v2 = (sol2 >= -Math.PI / 2 - epsilon && sol2 <= Math.PI / 2 + epsilon);

                    let lat2 = null;
                    if (v1 && v2) {
                        lat2 = encompassesNorth ? Math.min(sol1, sol2) : Math.max(sol1, sol2);
                    } else if (v1) {
                        lat2 = sol1;
                    } else if (v2) {
                        lat2 = sol2;
                    }

                    if (lat2 !== null) {
                        lat2 = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, lat2));
                        points.push(project(lat2 * 180 / Math.PI, deg));
                    }
                }
            }

            if (points.length === 0) return { fill: "", stroke: "" };

            const fillPath = `M ${points[0].x},${points[0].y} ` +
                points.map(p => `L ${p.x},${p.y}`).join(' ') +
                ` L 1000,${poleY} L 0,${poleY} Z`;

            
            let strokePath = points.length > 0 ? `M ${points[0].x},${points[0].y}` : "";
            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                if (Math.abs(curr.x - prev.x) > 500) {
                    strokePath += ` M ${curr.x},${curr.y}`;
                } else {
                    strokePath += ` L ${curr.x},${curr.y}`;
                }
            }

            return { fill: fillPath, stroke: strokePath };
        }

        
        const fillPoints = [];
        const strokePoints = [];
        let prevLng = lng1Deg;

        const [start, end] = strokeRange;

        for (let i = 0; i <= 60; i++) { 
            const brngDeg = (i * 360 / 60);
            const brng = brngDeg * (Math.PI / 180);
            const lat2 = Math.asin(Math.sin(lat1) * Math.cos(dR) + Math.cos(lat1) * Math.sin(dR) * Math.cos(brng));
            let lng2 = lng1 + Math.atan2(Math.sin(brng) * Math.sin(dR) * Math.cos(lat1), Math.cos(dR) - Math.sin(lat1) * Math.sin(lat2));

            const degLat = (lat2 * 180) / Math.PI;
            let degLng = (lng2 * 180) / Math.PI;

            while (degLng - prevLng > 180) degLng -= 360;
            while (degLng - prevLng < -180) degLng += 360;
            prevLng = degLng;

            const pt = project(degLat, degLng);
            fillPoints.push(pt);

            let isInRange = false;
            if (start <= end) {
                isInRange = brngDeg >= start && brngDeg <= end;
            } else {
                isInRange = brngDeg >= start || brngDeg <= end;
            }

            if (isInRange) {
                strokePoints.push(pt);
            }
        }

        let strokePath = "";
        if (strokePoints.length > 0) {
            strokePath = `M ${strokePoints[0].x},${strokePoints[0].y}`;
            for (let i = 1; i < strokePoints.length; i++) {
                const prev = strokePoints[i - 1];
                const curr = strokePoints[i];
                if (Math.abs(curr.x - prev.x) > 500) {
                    strokePath += ` M ${curr.x},${curr.y}`;
                } else {
                    strokePath += ` L ${curr.x},${curr.y}`;
                }
            }
        }

        return {
            fill: `M ${fillPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`,
            stroke: strokePath
        };
    };

    return (
        <div 
            className={className || "relative w-full aspect-[920/427.5] overflow-hidden group"}
            style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
            }}
        >
            <div 
                className="w-full h-full"
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
                }}
            >
                <svg
                    viewBox="80 62.5 920 427.5"
                    preserveAspectRatio="xMidYMin meet"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <defs>
                    <mask id="land-mask">
                        <rect y="62.5" width="1000" height="427.5" fill="black" />
                        <g transform="translate(0, 62.5)">
                            {landmassPaths.map((path, i) => (
                                <path key={i} d={path} fill="white" />
                            ))}
                        </g>
                    </mask>
                </defs>

                
                <g mask="url(#land-mask)" className="opacity-40">
                    {dots.map((dot: { x: number, y: number }, i: number) => (
                        <circle key={i} cx={dot.x} cy={dot.y} r="1.5" fill="#9CA3AF" />
                    ))}
                </g>

                
                <AnimatePresence>
                    {locations.map((loc) => {
                        const isActive = activeCity?.includes(loc.city.split(' ')[0]) || activeCity === loc.city
                        if (!isActive) return null;

                        const isNorth = loc.lat > 0;
                        const ranges = getGeodesicCirclePaths(
                            loc.lat,
                            loc.lng,
                            9000,
                            isNorth ? [90, 270] : [270, 90]
                        );

                        const commonProps = {
                            strokeWidth: 1,
                            className: "pointer-events-none"
                        };

                        return (
                            <g key={`range-group-${loc.city}`}>
                                    <motion.path
                                        key={`fill-0-${loc.city}`}
                                        d={ranges.fill}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        fill="rgba(255,255,255,0.02)"
                                        className="pointer-events-none"
                                    />
                                    
                                    <motion.path
                                        key={`range-0-${loc.city}`}
                                        d={ranges.stroke}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        stroke="rgba(255,255,255,0.4)"
                                        {...commonProps}
                                    />
                            </g>
                        )
                    })}
                </AnimatePresence>

                
                {locations.map((loc, index) => {
                    const { x, y } = project(loc.lat, loc.lng)
                    const isActive = activeCity?.includes(loc.city.split(' ')[0]) || activeCity === loc.city
                    
                    const currentTimeUTC = new Date()
                    const localHour = (currentTimeUTC.getUTCHours() + loc.offset + 24) % 24
                    const isOpenStatus = localHour >= 9 && localHour < 18

                    const markerColor = isOpenStatus 
                        ? "#22C55E" 
                        : loc.isVip24h 
                            ? "#A855F7" 
                            : "#737373"

                    return (
                        <g 
                            key={loc.city} 
                            transform={`translate(${x}, ${y})`} 
                            className="cursor-pointer"
                            onMouseEnter={() => onActiveCityChange?.(loc.city)}
                            onMouseLeave={() => onActiveCityChange?.(null)}
                        >
                            <motion.circle
                                initial={{ r: 4 }}
                                animate={{
                                    r: isActive ? 6 : [4, 6, 4],
                                    fill: isActive ? "#ffffff" : markerColor,
                                }}
                                transition={{
                                    r: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.4
                                    },
                                    fill: { duration: 0.3 }
                                }}
                                cx={0}
                                cy={0}
                            />

                            <motion.g
                                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 5 }}
                                className="pointer-events-none"
                            >
                                <rect
                                    x={-40}
                                    y={-35}
                                    width="80"
                                    height="20"
                                    rx="10"
                                    fill="rgba(0,0,0,0.9)"
                                />
                                <text
                                    x={0}
                                    y={-21}
                                    textAnchor="middle"
                                    fill="white"
                                    className="text-[10px] font-medium tracking-tighter uppercase"
                                    style={{ fontSize: '10px' }}
                                >
                                    {loc.city}
                                </text>
                            </motion.g>
                        </g>
                    )
                })}
            </svg>
            </div>
        </div>
    )
}
