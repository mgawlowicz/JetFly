"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Form from '@/components/Form/form';

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

const YourComponent = () => {
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
    <main className='flex flex-col gap-36'>
      <div className='flex flex-col pt-36 gap-8'>
        <div className='flex flex-col gap-2 px-12'>
          <h1 className="text-5xl lg:text-8xl font-bold">Our fleet</h1>
          <p className="text-gray-400 lg:text-xl">Explore our impressive collection of meticulously maintained aircraft, designed to provide unparalleled comfort and luxury during your journey. From sleek jets to spacious cabins, we offer a diverse range of options to suit your travel preferences. Discover the epitome of elegance and sophistication with our exceptional fleet.</p>
        </div>
        <Image src="/fleet-baner-new.webp" width={1920} height={574} alt='fleet-baner'></Image>
      </div>
      <div className='flex flex-col w-full px-12 gap-12'>
        <div className='flex justify-between'>
          <input type='text' className='border border-solid border-white bg-transparent px-4 py-2 w-1/4 outline-none' placeholder='Search'></input>
          <select className='border border-solid border-white bg-transparent px-4 py-2'>
            <option>Sort by</option>
            <option>Sort by</option>
            <option>Sort by</option>
          </select>
        </div>
        <div className='flex flex-wrap'>
          {planes.map((plane, index) => (
            <div key={index} className='relative overflow-hidden w-1/3 px-2 py-2'>
              <Link href={`/fleet/${plane.slug}`}>
                <div className="w-full h-full relative">
                  <Image src={`/Jets/${plane.slug}/${plane.image.url}`} width={900} height={600} alt={plane.image.alt} className='brightness-75' />
                </div>
                <div className='absolute top-0 p-12 flex flex-col w-full h-full justify-between'>
                  <h3 className='text-xl font-semibold'>{plane.brand}</h3>
                  <h2 className='text-5xl font-bold'>{plane.model}</h2>
                  <div className='flex justify-between w-full items-end'>
                    <div>
                      <h5 className='font-semibold'>Starting at</h5>
                      <h5 className='text-xl font-semibold'>{plane.details.price}</h5>
                    </div>
                    <div className='flex gap-2 justify-end'>
                      <p className='font-semibold'>View</p>
                      <Image src={"/arrow_down.png"} width={24} height={24} alt='arrow-icon' className='rotate-270'/>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Form />
    </main>
  );
};

export default YourComponent;
