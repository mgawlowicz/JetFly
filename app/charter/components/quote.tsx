"use client"
import Link from "next/link"
import { useState, useEffect } from "react";
import JetInput from "./inputs/jets";
import ArrivalInput from "./inputs/arrival";
import DepartureInput from "./inputs/departure";
import PassengersInput from "./inputs/passengers";

interface Plane {
    brand: string;
    model: string;
    details: {
        capacity: number;
        speed: number;
        price: number;
    }
    slug: string;
}

interface Cities {
    value: string;
    code: string
}


export default function Quote() {
    const [planes, setPlanes] = useState<Plane[]>([])
    const [cities, setCities] = useState<Cities[]>([])
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState(0)
    const [departure, setDeparture] = useState('')
    const [departureCode, setDepartureCode] = useState('')
    const [arrival, setArrival] = useState('')
    const [arrivalCode, setArrivalCode] = useState('')
    const [jet, setJet] = useState('')
    const [jetSlug, setJetSlug] = useState('')
    const [passengers, setPassengers] = useState(0)
    const [datetime, setDatetime] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('api/cities');
            const data = await res.json();
            setCities(Object.values(data.data));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('api/jets');
            const data = await res.json();
            setPlanes(Object.values(data.data));
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (departureCode !== '' && arrivalCode !== '') {
            const fetchDistanceData = async () => {
                const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${departureCode}/distance?distanceUnit=KM&toCityId=${arrivalCode}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c2118b143emshb4de575be6737e1p1cdd1bjsn67c72b1fb2c5',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                };
                const res = await fetch(url, options);
                const data = await res.json();
                setDistance(data.data);
            };
            fetchDistanceData();
        }
    }, [departureCode, arrivalCode]);

    useEffect(() => {
        const selectedPlane = planes.find(plane => plane.slug === jetSlug);
        if(selectedPlane){
            const time = Math.floor(distance / selectedPlane.details.speed)
            if(time > 1){
                setPrice(Math.ceil(time * selectedPlane.details.price))
            } else {
                setPrice(selectedPlane.details.price * 2)
            }
        }
    }, [distance, jetSlug, planes])

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(departure !== '' && arrival !== '' && jetSlug !== '' && passengers > 0 && datetime !== '');
    }, [departure, arrival, jetSlug, passengers, datetime]);

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
                    <label id="from" className="font-semibold">Departure Airport *</label>
                    <DepartureInput cities={cities} setDeparture={setDeparture} departure={departure} setDepartureCode={setDepartureCode}/>
                </div>
                <div className="w-full flex-col gap-2">
                    <label id="to" className="font-semibold">Arrival Airport *</label>
                    <ArrivalInput cities={cities} setArrival={setArrival} arrival={arrival} setArrivalCode={setArrivalCode}/>
                </div>
                <div className="w-full flex-col gap-2">
                    <p className="font-semibold">Jet *</p>
                    <JetInput planes={planes} setJet={setJet} jet={jet} setJetSlug={setJetSlug} jetSlug={jetSlug}/>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-end">
                <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Passengers *</p>
                            <PassengersInput planes={planes} setPassengers={setPassengers} passengers={passengers} jetSlug={jetSlug}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Date *</p>
                            <div className="flex gap-2">
                                <input type="datetime-local" className="bg-transparent outline-none w-10/12" style={{colorScheme: 'dark'}} onChange={(e) => setDatetime(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <p>* Required fields</p>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-8 lg:justify-end lg:items-center">
                    <div className="flex gap-2">
                        <h4 className="text-xl font-semibold">Estimated cost</h4>
                        <h4 className="text-xl font-semibold">${price}</h4>
                    </div>
                    <Link 
                        href={{
                            pathname: "/charter/confirm",
                            query: {
                                departure: departure,
                                arrival: arrival,
                                passengers: passengers,
                                price: price,
                                distance: distance,
                                jetSlug: jetSlug,
                                datetime: datetime
                            }
                        }}
                        className={`w-full lg:w-1/3 py-2 flex justify-center border border-solid border-white font-semibold transition duration-300 ease-in-out ${isFormValid ? 'hover:bg-white hover:text-black' : 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                        >Book</Link>
                </div>
            </div>
        </div>
    )
}
