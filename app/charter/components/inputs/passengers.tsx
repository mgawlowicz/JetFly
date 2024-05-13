import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface Plane{
    slug: string;
    details: {
        capacity: number;
    }
}

interface Props{
    planes: Plane[];
    setPassengers: (value: number) => void;
    passengers: number;
    jetSlug: string;
}


const counter_icon = {
    disabled: {
        opacity: 0.5,
    },
    active: {
        opacity: 1,
    }
}

export default function PassengersInput({planes, setPassengers, passengers, jetSlug}: Props) {
    const [maxPassengers, setMaxPassengers] = useState(20);
    const [active, setActive] = useState<{ [key: string]: boolean }>({ Plus: true, Minus: false });
    
    const increaseCounter = () => {
        active['Minus'] = true
        if (passengers < maxPassengers) {
            setPassengers(passengers + 1)
            if (passengers == maxPassengers - 1) {
                active['Plus'] = false
            }
        }
    }

    const decreaseCounter = () => {
        active['Plus'] = true
        if (passengers > 0) {
            setPassengers(passengers - 1)
            if (passengers == 1) {
                active['Minus'] = false
            }
        }
    }

    const increaseMax = (value: string) => {
        const selectedPlane = planes.find(plane => plane.slug === value);
        if (selectedPlane) {
            const newMax = selectedPlane.details.capacity;
            if (newMax < passengers) {
                setPassengers(0);
                active['Minus'] = false;
            }
            setMaxPassengers(newMax)
            active['Plus'] = true;
        }
    }

    useEffect(() => {
        increaseMax(jetSlug);
    }, [jetSlug]);

    return (
        <div className="flex gap-2 items-center">
            <motion.div variants={counter_icon} animate={active['Minus'] ? "active" : "disabled"} initial="disabled">
                <Image src={"/minus.png"} width={20} height={20} alt="minus-icon" onClick={decreaseCounter} className="select-none" />
            </motion.div>
            <p className="font-semibold w-4 text-center">{passengers}</p>
            <motion.div variants={counter_icon} animate={active['Plus'] ? "active" : "disabled"}>
                <Image src={"/plus.png"} width={20} height={20} alt="plus-icon" onClick={increaseCounter} className="select-none" />
            </motion.div>
        </div>
    )
}