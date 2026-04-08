import { useState, useEffect, useMemo, useCallback } from "react";
import type { PlaneBasic } from "@/lib/types";
import { calculateDistance } from "@/lib/utils/distance";

export interface LocationPoint {
    id: string;
    cityName: string;
    cityCode: string;
    point: { lat: number, lng: number, name: string } | null;
}

export const parsePlaneRange = (rangeStr: string): number => {
    if (!rangeStr) return 0;
    return parseInt(rangeStr.replace(/[,km\s]/gi, ''));
}

export const useFlightCalculator = (planes: PlaneBasic[]) => {
    
    const [tripType, setTripType] = useState('one-way');
    const [departure, setDeparture] = useState<LocationPoint>({ id: 'dep', cityName: '', cityCode: '', point: null });
    const [destinations, setDestinations] = useState<LocationPoint[]>([{ id: 'dest-1', cityName: '', cityCode: '', point: null }]);
    
    const [flightHours, setFlightHours] = useState<number>(2);
    
    const [jet, setJet] = useState('')
    const [jetSlug, setJetSlug] = useState('')
    const [passengers, setPassengers] = useState(0)
    const [datetime, setDatetime] = useState<Date | null>(null)

    const fetchCoords = async (code: string) => {
        if (!code) return null;
        try {
            const res = await fetch(`/api/city-coords?cityCode=${code}`);
            const data = await res.json();
            if (data.lat) return data;
        } catch (e) {
            console.error("Failed to fetch coords for:", code, e);
        }
        return null;
    }

    useEffect(() => {
        if (departure.cityCode && !departure.point) {
            fetchCoords(departure.cityCode).then(point => {
                if (point) setDeparture(prev => ({ ...prev, point }));
            });
        }
    }, [departure.cityCode, departure.point]);

    useEffect(() => {
        destinations.forEach(dest => {
            if (dest.cityCode && !dest.point) {
                fetchCoords(dest.cityCode).then(point => {
                    if (point) setDestinations(prev => prev.map(d => d.id === dest.id ? { ...d, point } : d));
                });
            }
        });
    }, [destinations]);

    const waypointsContent = useMemo(() => {
        const points: { lat: number, lng: number, name: string }[] = [];
        if (departure.point) points.push(departure.point);

        if (tripType !== 'on-hours') {
            destinations.forEach(d => {
                if (d.point) points.push(d.point);
            });

            if (tripType === 'round-trip' && departure.point && destinations.some(d => d.point)) {
                points.push(departure.point);
            }
        }
        return points;
    }, [departure, destinations, tripType]);

    const segments = useMemo(() => {
        const dists = [];
        if (waypointsContent.length > 1) {
            for (let i = 0; i < waypointsContent.length - 1; i++) {
                dists.push(calculateDistance(waypointsContent[i], waypointsContent[i + 1]));
            }
        }
        return dists;
    }, [waypointsContent]);

    const totalDistance = segments.reduce((a, b) => a + b, 0);

    const selectedPlane = useMemo(() => planes.find(plane => plane.slug === jetSlug) || null, [jetSlug, planes]);

    const { price, isRangeExceeded } = useMemo(() => {
        if (!selectedPlane) return { price: 0, isRangeExceeded: false };

        let calculatedPrice = 0;
        let rangeLimitHit = false;

        const planeRange = parsePlaneRange(selectedPlane.details.range as unknown as string);

        if (tripType === 'on-hours') {
            calculatedPrice = selectedPlane.details.price * flightHours;
        } else {
            segments.forEach(dist => {
                if (dist > planeRange) rangeLimitHit = true;
            });

            const time = totalDistance / selectedPlane.details.speed;
            if (time > 1) {
                calculatedPrice = Math.ceil(time * selectedPlane.details.price);
            } else if (time > 0) {
                calculatedPrice = selectedPlane.details.price * 2;
            }
        }

        return { price: calculatedPrice, isRangeExceeded: rangeLimitHit };
    }, [selectedPlane, totalDistance, segments, tripType, flightHours]);

    const isFormValid = useMemo(() => {
        if (!selectedPlane || !passengers || !datetime || !departure.cityCode || isRangeExceeded) return false;
        if (tripType === 'on-hours') return flightHours > 0;
        if (destinations.some(d => !d.cityCode)) return false;
        return true;
    }, [selectedPlane, passengers, datetime, departure, destinations, tripType, flightHours, isRangeExceeded]);

    const addDestination = useCallback(() => {
        setDestinations(prev => [...prev, { id: `dest-${Date.now()}`, cityName: '', cityCode: '', point: null }]);
    }, []);

    const removeDestination = useCallback((id: string) => {
        setDestinations(prev => prev.filter(d => d.id !== id));
    }, []);

    const updateDestination = useCallback((id: string, field: keyof LocationPoint, value: any) => {
        setDestinations(prev => {
            const current = prev.find(d => d.id === id);
            if (current && current[field] === value) return prev;

            return prev.map(d => {
                if (d.id === id) {
                    const updated = { ...d, [field]: value };
                    if (field === 'cityCode' && value !== d.cityCode) updated.point = null;
                    return updated;
                }
                return d;
            });
        });
    }, []);

    const handleDepartureCityUpdate = useCallback((cityName: string) => {
        setDeparture(prev => {
            if (prev.cityName === cityName) return prev;
            return { ...prev, cityName: cityName };
        });
    }, []);

    const handleDepartureCodeUpdate = useCallback((cityCode: string) => {
        setDeparture(prev => {
            if (prev.cityCode === cityCode) return prev;
            return { ...prev, cityCode: cityCode, point: null };
        });
    }, []);

    return {
        tripType, setTripType,
        departure, setDeparture,
        destinations, setDestinations,
        flightHours, setFlightHours,
        jet, setJet,
        jetSlug, setJetSlug,
        passengers, setPassengers,
        datetime, setDatetime,
        waypointsContent,
        totalDistance,
        price,
        isRangeExceeded,
        isFormValid,
        selectedPlane,
        addDestination,
        removeDestination,
        updateDestination,
        handleDepartureCityUpdate,
        handleDepartureCodeUpdate
    };
};
