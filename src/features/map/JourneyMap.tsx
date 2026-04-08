import React, { useMemo, useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import worldPaths from './world-paths.json'

export interface JourneyPoint {
    lat: number;
    lng: number;
    name: string;
}

interface JourneyMapProps {
    waypoints: JourneyPoint[];
    className?: string;
}

const landmassPaths = worldPaths;

export default function JourneyMap({ waypoints, className }: JourneyMapProps) {
    const project = (lat: number, lng: number) => {
        const x = (lng + 180) * (1000 / 360)
        const y = ((90 - lat) * (500 / 180)) + 62.5
        return { x, y, name: '' }
    }

    const [viewBox, setViewBox] = useState("80 62.5 920 427.5");
    const [zoom, setZoom] = useState(1);

    const { adjustedPoints, path, targetViewBox, targetZoom } = useMemo(() => {
        const defaultViewBox = "80 62.5 920 427.5"; 
        
        if (!waypoints || waypoints.length === 0) {
            return { adjustedPoints: [], path: null, targetViewBox: defaultViewBox, targetZoom: 1 };
        }

        const pts = waypoints.map(w => ({ ...project(w.lat, w.lng), name: w.name }));

        
        for (let i = 1; i < pts.length; i++) {
            const prev = pts[i - 1];
            const curr = pts[i];
            if (Math.abs(curr.x - prev.x) > 500) {
                if (curr.x > prev.x) {
                    curr.x -= 1000;
                } else {
                    curr.x += 1000;
                }
            }
        }

        let minX = Math.min(...pts.map(p => p.x));
        let maxX = Math.max(...pts.map(p => p.x));
        let minY = Math.min(...pts.map(p => p.y));
        let maxY = Math.max(...pts.map(p => p.y));

        const paddingX = pts.length > 1 ? Math.max(45, (maxX - minX) * 0.7) : 250;
        const paddingY = pts.length > 1 ? Math.max(25, (maxY - minY) * 0.7) : 125;
        
        minX -= paddingX;
        maxX += paddingX;
        minY -= paddingY;
        maxY += paddingY;

        const targetWidth = Math.max(80, maxX - minX);
        const targetHeight = Math.max(40, maxY - minY);
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        
        let finalWidth = targetWidth;
        let finalHeight = targetHeight;
        if (finalWidth / finalHeight > 2.15) finalHeight = finalWidth / 2.15;
        else finalWidth = finalHeight * 2.15;

        const finalX = Math.max(-1000, Math.min(2000 - finalWidth, centerX - finalWidth / 2));
        const finalY = Math.max(0, Math.min(562.5 - finalHeight, centerY - finalHeight / 2));
        
        const resViewBox = `${finalX} ${finalY} ${finalWidth} ${finalHeight}`;
        const resZoom = 920 / finalWidth;

        let pathString = null;
        if (pts.length > 1) {
            pathString = `M ${pts[0].x},${pts[0].y}`;
            for (let i = 0; i < pts.length - 1; i++) {
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const dr = Math.sqrt(dx * dx + dy * dy);
                const lift = dr * 0.4;
                const cpX = (p1.x + p2.x) / 2;
                const cpY = ((p1.y + p2.y) / 2) - lift;
                pathString += ` Q ${cpX},${cpY} ${p2.x},${p2.y}`;
            }
        }

        return {
            adjustedPoints: pts,
            path: pathString,
            targetViewBox: resViewBox,
            targetZoom: resZoom
        }
    }, [waypoints]);

    useEffect(() => {
        if (targetViewBox) setViewBox(targetViewBox);
        if (targetZoom) setZoom(targetZoom);
    }, [targetViewBox, targetZoom]);

    const dotSpacing = useMemo(() => {
        if (zoom > 6.5) return 1.5;
        if (zoom > 3.8) return 3.0;
        if (zoom > 1.8) return 6.0;
        return 12.0;
    }, [zoom]);

    const progress = useMotionValue(0);
    const [pathRef, setPathRef] = useState<SVGPathElement | null>(null);
    
    useEffect(() => {
        progress.set(0);
        if (!path) return;
        
        
        const pointsCount = Math.max(1, adjustedPoints.length - 1);
        const controls = animate(progress, 1, {
            duration: 4 * pointsCount,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
        });
        return () => controls.stop();
    }, [path, progress, adjustedPoints.length]);

    const planeX = useTransform(progress, (t) => {
        if (!pathRef) return adjustedPoints[0]?.x || 0;
        try {
            const length = pathRef.getTotalLength();
            return pathRef.getPointAtLength(t * length).x;
        } catch (e) { return adjustedPoints[0]?.x || 0; }
    });

    const planeY = useTransform(progress, (t) => {
        if (!pathRef) return adjustedPoints[0]?.y || 0;
        try {
            const length = pathRef.getTotalLength();
            return pathRef.getPointAtLength(t * length).y;
        } catch (e) { return adjustedPoints[0]?.y || 0; }
    });

    const planeRotate = useTransform(progress, (t) => {
        if (!pathRef || adjustedPoints.length < 2) return 0;
        try {
            const length = pathRef.getTotalLength();
            const step = 0.001;
            const t1 = Math.max(0, t - step);
            const t2 = Math.min(1, t + step);
            const p1_ = pathRef.getPointAtLength(t1 * length);
            const p2_ = pathRef.getPointAtLength(t2 * length);
            return Math.atan2(p2_.y - p1_.y, p2_.x - p1_.x) * (180 / Math.PI);
        } catch (e) { return 0; }
    });

    const planeOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

    return (
        <div 
            className={className || "relative w-full aspect-[2.15/1] overflow-hidden"}
            style={{
                WebkitMaskImage: 'radial-gradient(50% 100% at 50% 50%, black 20%, transparent 100%)',
                maskImage: 'radial-gradient(50% 100% at 50% 50%, black 20%, transparent 100%)'
            }}
        >
            <motion.svg
                animate={{ viewBox }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <mask id="land-mask-live">
                        <rect x="-1000" y="62.5" width="3000" height="427.5" fill="black" />
                        <g transform="translate(0, 62.5)">
                            {landmassPaths.map((path, i) => <path key={`c-${i}`} d={path} fill="white" />)}
                        </g>
                        <g transform="translate(1000, 62.5)">
                            {landmassPaths.map((path, i) => <path key={`r-${i}`} d={path} fill="white" />)}
                        </g>
                        <g transform="translate(-1000, 62.5)">
                            {landmassPaths.map((path, i) => <path key={`l-${i}`} d={path} fill="white" />)}
                        </g>
                    </mask>

                    <pattern id="dot-pattern" x="0" y="0" width={dotSpacing} height={dotSpacing} patternUnits="userSpaceOnUse">
                        <circle cx={dotSpacing/2} cy={dotSpacing/2} r={0.8 / zoom} fill="#4B5563" />
                    </pattern>

                    <filter id="plane-shadow" x="-100%" y="-100%" width="300%" height="300%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="black" floodOpacity="0.5" />
                    </filter>
                </defs>

                <rect x="-1000" width="3000" height="600" mask="url(#land-mask-live)" fill="url(#dot-pattern)" className="opacity-50" />

                <AnimatePresence>
                    {adjustedPoints.length > 0 && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {path && (
                                <g>
                                    <path id="animated-flight-path" d={path} stroke="rgba(255,255,255,0.2)" strokeWidth={1 / zoom} fill="none" />
                                    
                                    <motion.path
                                        ref={setPathRef}
                                        d={path} stroke="white" strokeWidth={1.5 / zoom} fill="none"
                                        style={{ pathLength: progress }}
                                    />
                                    
                                    <motion.g 
                                        style={{ x: planeX, y: planeY, rotate: planeRotate, opacity: planeOpacity }}
                                        className="pointer-events-none z-50"
                                    >
                                        <motion.g animate={{ scale: 0.85 / zoom }} style={{ transformOrigin: "center" }}>
                                            <rect x="-20" y="-20" width="40" height="40" fill="transparent" />
                                            <path 
                                                d="M 8,-1.5 L 2,-1.5 L -3,-8 L -5,-8 L -1,-1.5 L -5,-1.5 L -7,-3.5 L -8.5,-3.5 L -7,0 L -8.5,3.5 L -7,3.5 L -5,1.5 L -1,1.5 L -5,8 L -3,8 L 2,1.5 L 8,1.5 C 9.5,1.5 10,0.5 10,0 C 10,-0.5 9.5,-1.5 8,-1.5 Z" 
                                                fill="white"
                                                filter="url(#plane-shadow)"
                                            />
                                        </motion.g>
                                    </motion.g>
                                </g>
                            )}

                            {adjustedPoints.map((pt, i) => (
                                <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
                                    <motion.g animate={{ scale: 1 / zoom }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: "center" }}>
                                        <rect x="-30" y="-30" width="60" height="60" fill="transparent" pointerEvents="none" />
                                        <motion.circle initial={{ r: 0 }} animate={{ r: 4 }} fill={i === 0 ? "#10B981" : i === adjustedPoints.length - 1 ? "#3B82F6" : "#F59E0B"} />
                                        <motion.circle 
                                            initial={{ r: 0 }} 
                                            animate={{ r: [4, 12, 4], opacity: [1, 0, 1] }} 
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} 
                                            stroke={i === 0 ? "#10B981" : i === adjustedPoints.length - 1 ? "#3B82F6" : "#F59E0B"} strokeWidth={0.5} fill="none" 
                                        />
                                        <text y="-16" textAnchor="middle" fill={i === 0 ? "#10B981" : i === adjustedPoints.length - 1 ? "#3B82F6" : "#F59E0B"} className="font-bold pointer-events-none" style={{ fontSize: `4px`, letterSpacing: `0.2em`, opacity: 0.9 }}>
                                            {i === 0 ? 'DEPARTURE' : i === adjustedPoints.length - 1 ? 'ARRIVAL' : `STOP ${i}`}
                                        </text>
                                        <text y="-8" textAnchor="middle" fill="white" className="font-bold pointer-events-none" style={{ fontSize: `7px`, letterSpacing: `0.1em`, opacity: 1 }}>
                                            {pt.name}
                                        </text>
                                    </motion.g>
                                </g>
                            ))}
                        </motion.g>
                    )}
                </AnimatePresence>
            </motion.svg>
        </div>
    )
}
