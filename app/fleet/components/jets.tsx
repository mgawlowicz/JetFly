"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


interface Plane {
    brand: string;
    model: string;
    details: {
        price: string;
    };
    image: {
        url: string,
        alt: string,
    }
    slug: string;
}

export default function Jets() {
    const [planes, setPlanes] = useState<Plane[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('api/jets');
            const data = await res.json();
            setPlanes(Object.values(data.data));
        };

        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {planes.map((plane, index) => (
                <Link href={`/fleet/${plane.slug}`} key={index} className='relative'>
                    <div className='w-full h-full'>
                        <Image src={`/Jets/${plane.slug}/${plane.image.url}`} width={900} height={600} alt={plane.image.alt} className='brightness-75 object-cover' />
                    </div>
                    <div className='w-full h-full absolute top-0 left-0 p-8 xl:p-12 flex flex-col justify-between'>
                        <h3 className='lg:text-xl font-semibold'>{plane.brand}</h3>
                        <h2 className='text-4xl xl:text-5xl font-bold'>{plane.model}</h2>
                        <div className='flex justify-between w-full items-end'>
                            <div>
                                <h5 className='font-semibold'>Starting at</h5>
                                <h5 className='lg:text-xl font-semibold'>${plane.details.price}/h</h5>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <p className='font-semibold'>View</p>
                                <Image src={"/arrow_down.png"} width={24} height={24} alt='arrow-icon' className='rotate-270' />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}