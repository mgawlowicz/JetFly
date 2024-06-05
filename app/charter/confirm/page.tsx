"use client"
import Image from "next/image"
import Link from "next/link";
import { useState, useEffect } from "react"

interface Bonus {
    name: string;
    description: string;
    image: {
        url: string,
        alt: string,
    }
    price: number;
    slug: string;
}

interface Plane {
    brand: string;
    model: string;
    description: string;
    details: {
      speed: string;
      range: string;
      capacity: number;
      price: number;
    };
    image: {
      url: string,
      alt: string,
      interior: {
        first: {
          url: string,
          alt: string,
        }
        second: {
          url: string,
          alt: string,
        }
        third: {
          url: string,
          alt: string,
        }
      }
    }
    slug: string;
}

export default function Confirm({searchParams} : {searchParams: {departure: string, arrival: string, passengers: number, price: number, distance: number, jetSlug: string, datetime: string}}) {
    const [openState, setOpenState] = useState<{ [key: string]: boolean }>({ Wine: false, Limousine: false, Meal: false });
    const [bonus, setBonus] = useState<Bonus[]>([]);
    const [greenTax, setGreenTax] = useState(Math.floor(searchParams.price * 0.07));
    const [vat, setVat] = useState(Math.floor(searchParams.price * 0.08));
    const [totalPrice, setTotalPrice] = useState(searchParams.price);
    const [extraCost, setExtraCost] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    const handleClick = (location: string) => {
        setOpenState(prevState => {
            const updatedState: { [key: string]: boolean } = {};
            for (const key in prevState) {
                if (Object.prototype.hasOwnProperty.call(prevState, key)) {
                    updatedState[key] = key === location ? !prevState[key] : prevState[key];
                }
            }
            return updatedState;
        });
    };

    const [plane, setPlane] = useState<Plane[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/jets/${searchParams.jetSlug}`);
            const data = await res.json();
            setPlane(Object.values(data.jet));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch('/api/bonus');
            const data = await res.json();
            setBonus(Object.values(data.data));
        }

        fetchdata();
    }, []);

    useEffect(() => {
        let newExtraCost = 0;
        for (const item of bonus) {
            if (openState[item.slug]) {
                newExtraCost += item.price;
            }
        }
        setExtraCost(newExtraCost);
        setTotalPrice(Number(searchParams.price) + newExtraCost);
    }, [openState, bonus, searchParams.price]);


    useEffect(() => {
        setIsFormValid(name !== '' && surname !== '' && email !== '' && tel !== '');
    }, [name, surname, email, tel]);

    return (
        <main className="flex flex-col gap-20 lg:gap-36 w-full relative">
                <div className="flex pt-36 lg:px-12 gap-8">
                <form className="w-full flex flex-col gap-8">
                    {plane.map((item, index) => (
                        <div className="border border-solid border-neutral-600 p-4 flex gap-8" key={index}>
                            <Image src={`/Jets/${item.slug}/${item.image.url}`} width={300} height={200} alt={item.image.alt} className="rounded-lg" priority={true}></Image>
                            <div className="w-full flex flex-col gap-4 justify-center">
                                <div>
                                    <h3>{item.brand}</h3>
                                    <h2 className="text-4xl font-semibold">{item.model}</h2>
                                </div>
                                <div className="flex w-full justify-between">
                                    <div className="w-full p-4 flex flex-col border border-solid border-neutral-800">
                                        <h5>Speed</h5>
                                        <p>{item.details.speed}km/h</p>
                                    </div>
                                    <div className="w-full p-4 flex flex-col border border-solid border-neutral-800">
                                        <h5>Range</h5>
                                        <p>{item.details.range}</p>
                                    </div>
                                    <div className="w-full p-4 flex flex-col border border-solid border-neutral-800">
                                        <h5>Capacity</h5>
                                        <p>Up to {item.details.capacity}</p>
                                    </div>
                                    <div className="w-full p-4 flex flex-col border border-solid border-neutral-800">
                                        <h5>Charter</h5>
                                        <p>${item.details.price}/h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h3 className="uppercase font-bold text-xl lg:text-xl">Enter your details</h3>
                    <div className="flex gap-8">
                        <div className="w-full">
                            <label htmlFor="name" className="font-semibold">Name *</label>
                            <input type="text" id="name" className="w-full py-2 bg-transparent outline-none border-b border-white border-solid" placeholder="John" onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div className="w-full">
                            <label htmlFor="surname" className="font-semibold">Surname *</label>
                            <input type="text" id="surname" className="w-full py-2 bg-transparent outline-none border-b border-white border-solid" placeholder="Smith" onChange={(e) => setSurname(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="w-full">
                            <label htmlFor="email" className="font-semibold">Email *</label>
                            <input type="email" className="w-full py-2 bg-transparent outline-none border-b border-white border-solid" placeholder="email@email.com" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="w-full">
                            <label htmlFor="phone" className="font-semibold">Phone number *</label>
                            <input type="tel" className="w-full py-2 bg-transparent outline-none border-b border-white border-solid" placeholder="+48 123-456-789" onChange={(e) => setTel(e.target.value)}></input>
                        </div>
                    </div>
                    <p>* Required fields</p>
                    <div className="flex flex-col gap-4">
                        <h5 className="font-semibold text-xl">Add to your flight</h5>
                        <div className="flex flex-col gap-4">
                            {bonus.map((item, index) => (
                                <div key={index} className={`border border-solid p-4 flex justify-between ${openState[item.slug] ? "border-white" : "border-neutral-600"}`} onClick={() => handleClick(item.slug)}>
                                    <div className="flex gap-4 flex">
                                        <Image src={`/${item.image.url}`} width={48} height={48} alt={item.image.alt}/>
                                        <div>
                                            <h5 className="text-lg font-semibold">{item.name}</h5>
                                            <p className="text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                    <h5 className="text-xl">${item.price}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="w-2/5 h-fit flex p-8 border border-solid border-white flex flex-col gap-8">
                    <h4 className="uppercase font-semibold text-2xl">Reservation summary</h4>
                    <div className="flex">
                        <div className="w-full">
                            <h5 className="font-semibold">Departure Airport:</h5>
                            <p>{searchParams.departure}</p>
                        </div>
                        <div className="w-full">
                            <h5 className="font-semibold">Arrival Airport:</h5>
                            <p>{searchParams.arrival}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Distance:</h5>
                        <p>{Math.ceil(searchParams.distance)}km</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Date:</h5>
                        <p>{searchParams.datetime}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Jet:</h5>
                        {plane.map((item, index) => (<p key={index}>{item.brand} {item.model}</p>))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Passengers:</h5>
                        <p>{searchParams.passengers}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="uppercase font-semibold text-xl">Your price summary</h5>
                        <div className="flex justify-between">
                            <p>7% Green tax:</p>
                            <p>${greenTax}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>8% VAT:</p>
                            <p>${vat}</p>
                        </div>
                        {openState['Wine'] || openState['Limousine'] || openState['Meal'] ? (
                            <div className="flex flex-col gap-2">
                                <h5 className="font-semibold text-lg">Extra:</h5>
                                {openState['Wine'] && (
                                    <div className="flex justify-between">
                                        <p>Bottle of Wine</p>
                                        <p>$100</p>
                                    </div>
                                )}
                                {openState['Limousine'] && (
                                    <div className="flex justify-between">
                                        <p>Luxury Limousine</p>
                                        <p>$500</p>
                                    </div>
                                )}
                                {openState['Meal'] && (
                                    <div className="flex justify-between">
                                        <p>Gourmet Meal</p>
                                        <p>$200</p>
                                    </div>
                                )}
                            </div>
                        ) : ''}
                    </div>
                    <div className="flex gap-2">
                        <h4 className="text-2xl font-semibold">Total Price:</h4>
                        <h4 className="text-2xl font-semibold">${totalPrice}</h4>
                    </div>
                    <Link href="./confirmed" className={`border border-white border-solid py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out font-semibold text-center ${isFormValid ? 'hover:bg-white hover:text-black' : 'opacity-50 cursor-not-allowed pointer-events-none'}`}>Confirm</Link>
                </div>
            </div>
        </main>
    )
}
