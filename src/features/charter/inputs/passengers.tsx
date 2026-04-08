import { useState, useEffect } from "react"

interface Plane {
    brand: string;
    model: string;
    details: {
        capacity: number;
    }
    slug: string;
}

interface Props {
    planes: Plane[];
    setPassengers: (value: number) => void;
    passengers: number;
    jetSlug: string;
}

export default function PassengersInput({ planes, setPassengers, passengers, jetSlug }: Props) {
    const [maxPassengers, setMaxPassengers] = useState(0)

    useEffect(() => {
        const selectedPlane = planes.find(plane => plane.slug === jetSlug);
        if (selectedPlane) {
            setMaxPassengers(selectedPlane.details.capacity)
        } else {
            setMaxPassengers(0)
            setPassengers(0) 
        }
    }, [jetSlug, planes, setPassengers])

    const increment = () => {
        if (jetSlug && passengers < maxPassengers) setPassengers(passengers + 1)
    }

    const decrement = () => {
        if (jetSlug && passengers > 0) setPassengers(passengers - 1)
    }

    const isDisabled = !jetSlug

    return (
        <div className={`flex items-center gap-8 py-4 border-b border-white/10 transition-opacity duration-300 ${isDisabled ? 'opacity-30' : 'opacity-100'}`}>
            <button 
                onClick={decrement}
                disabled={isDisabled}
                className={`w-8 h-8 flex items-center justify-center border border-white/5 rounded-full transition-all text-xl font-extralight ${isDisabled ? 'cursor-not-allowed' : 'hover:border-white/40 text-neutral-400 hover:text-white'}`}
            >
                -
            </button>
            <span className={`text-2xl font-light min-w-[2ch] text-center ${isDisabled ? 'text-neutral-400/60' : 'text-white'}`}>
                {passengers}
            </span>
            <button 
                onClick={increment}
                disabled={isDisabled}
                className={`w-8 h-8 flex items-center justify-center border border-white/5 rounded-full transition-all text-xl font-extralight ${isDisabled ? 'cursor-not-allowed' : 'hover:border-white/40 text-neutral-400 hover:text-white'}`}
            >
                +
            </button>
            {maxPassengers > 0 && jetSlug && (
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">Max {maxPassengers}</span>
            )}
            {isDisabled && (
                <span className="text-[10px] uppercase tracking-widest text-neutral-400/60">Select Jet first</span>
            )}
        </div>
    )
}
