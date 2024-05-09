"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Plane {
    brand: string;
    model: string;
    details: {
        capacity: number;
    }
    slug: string;
}

const counter_icon = {
    disabled: {
        opacity:0.5,
    },
    active: {
        opacity:1,
    }
}

export default function Quote() {
    const [price, setPrice ] = useState(0)
    const [departure , setDeparture] = useState('')
    const [arrival , setArrival] = useState('')

    const [counter, setCounter] = useState(0)
    const [maxPassengers, setMaxPassengers] = useState(20);
    const [active, setActive] = useState<{ [key: string]: boolean }>({ Plus: true, Minus: false });

    const [planes, setPlanes] = useState<Plane[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        const res = await fetch('api/jets');
        const data = await res.json();
        console.log(data)
        setPlanes(Object.values(data.data));
        };

        fetchData();
    }, []);

    const increaseCounter = () => {
        active['Minus'] = true
        if(counter < maxPassengers){
            setCounter(counter + 1)
            if(counter == maxPassengers - 1){
                active['Plus'] = false
            }
        }
    }

    const decreaseCounter = () => {
        active['Plus'] = true
        if(counter > 0){
            setCounter(counter - 1)
            if(counter == 1){
                active['Minus'] = false
            }
        }
    }

    const increaseMax = (value: string) => {
        const selectedPlane = planes.find(plane => plane.slug === value);
        if(selectedPlane){
            const newMax = selectedPlane.details.capacity;
            if(newMax < counter){
                setCounter(0);
                active['Minus'] = false;
            }
            setMaxPassengers(newMax)
            active['Plus'] = true;
        }
    }

    return (
        <div className="flex flex-col gap-8 px-4 lg:px-16">
            <h3 className="uppercase font-bold text-2xl lg:text-4xl">Request a quote</h3>
            <div className="w-full lg:w-1/3 flex justify-between">
                <button className="w-full py-2 justify-center bg-white text-black font-semibold">One way</button>
                <button className="w-full py-2 justify-center border border-solid border-white font-semibold">Round trip</button>
                <button className="w-full py-2 justify-center border border-solid border-white font-semibold">On hours</button>
            </div>
            <div className="w-full flex flex-col gap-8 lg:flex-row">
                <div className="w-full flex-col gap-2">
                    <label id="from" className="font-semibold">Departure Airport</label>
                    <select id="from" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white" onChange={(e) => setDeparture(e.target.value)} required>
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                    </select>
                </div>
                <div className="w-full flex-col gap-2">
                    <label id="to" className="font-semibold">Arrival Airport</label>
                    <select id="to" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white" onChange={(e) => setArrival(e.target.value)}>
                        <option value="JFK" >JFK</option>
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                    </select>
                </div>
                <div className="w-full flex-col gap-2">
                    <label id="jet" className="font-semibold">Jet</label>
                    <select id="jet" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white" onChange={(e) => increaseMax(e.target.value)}>
                        {planes.map((data, index) => (
                                <option value={data.slug} key={index}>{data.brand} {data.model}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-end">
                <div className="flex gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Passengers</p>
                        <div className="flex gap-2">
                            <motion.div variants={counter_icon} animate={active['Minus'] ? "active" : "disabled"} initial="disabled">
                                <Image src={"/minus.png"} width={24} height={24} alt="minus-icon" onClick={decreaseCounter} className="select-none"/>
                            </motion.div>
                            <p className="font-semibold w-4 text-center">{counter}</p>
                            <motion.div variants={counter_icon} animate={active['Plus'] ? "active" : "disabled"}>
                                <Image src={"/plus.png"} width={24} height={24} alt="plus-icon" onClick={increaseCounter} className="select-none"/>
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Date</p>
                        <div className="flex gap-2">
                            <input type="datetime-local" className="bg-transparent"></input>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-8 lg:justify-end lg:items-center">
                    <div className="flex gap-2">
                        <h4 className="text-xl font-semibold">Estimated cost</h4>
                        <h4 className="text-xl font-semibold">${price}</h4>
                    </div>
                    <Link href={{
                        pathname: "/charter/confirm",
                        query: {
                            departure: departure,
                            arrival: arrival,
                            passengers: counter,
                            price: price,
                        }
                    }} className="w-full lg:w-1/3 py-2 flex justify-center border border-solid border-white font-semibold hover:bg-white hover:text-black transition duration-300 ease-in-out">Book</Link>
                </div>
            </div>
        </div>
    )
}