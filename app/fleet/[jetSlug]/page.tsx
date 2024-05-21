"use client"
import Image from "next/image";
import { useState, useEffect } from "react"
import { useParams } from "next/navigation";
import Form from "@/components/Form/form";

interface Plane {
    brand: string;
    model: string;
    description: string;
    details: {
      speed: string;
      range: string;
      capacity: number;
      price: string;
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

export default function Home(){
    const params = useParams<{jetSlug: string}>()
    const [plane, setPlane] = useState<Plane[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch(`/api/jets/${params.jetSlug}`);
          const data = await res.json();
          setPlane(Object.values(data.jet));
        };
    
        fetchData();
      }, []);

    return(
      <>
        {plane.map((data, index) => (
          <main className="flex flex-col gap-24 lg:gap-36 w-full" key={index}>
            <div className="w-full h-64 lg:h-128 relative overflow-hidden">
              <Image src={`/Jets/${data.slug}/${data.image.url}`} alt={data.image.alt} fill={true} priority={true} style={{objectFit: "cover"}}/>
            </div>
            <div className="flex flex-col lg:flex-row px-4 lg:px-16 gap-12">
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-4xl lg:text-6xl font-semibold">{data.brand} {data.model}</h2>
                <p className="lg:text-xl text-gray-400">{data.description}</p>
              </div>
              <div className="w-full">
                <div className="flex justify-between py-4 border-b border-solid border-neutral-600">
                  <h5 className="uppercase">Speed</h5>
                  <h5>{data.details.speed}km/h</h5>
                </div>
                <div className="flex justify-between py-4 border-b border-solid border-neutral-600">
                  <h5 className="uppercase">Range</h5>
                  <h5>{data.details.range}</h5>
                </div>
                <div className="flex justify-between py-4 border-b border-solid border-neutral-600">
                  <h5 className="uppercase">Capacity</h5>
                  <h5>Up to {data.details.capacity}</h5>
                </div>
                <div className="flex justify-between py-4 border-b border-solid border-neutral-600">
                  <h5 className="uppercase">Price</h5>
                  <h5>${data.details.price}/h</h5>
                </div>
              </div>
            </div>
            <div className="px-4 lg:px-16 flex flex-col gap-4">
              <h3 className="uppercase font-bold text-2xl lg:text-4xl">Interior</h3>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
                <div className="w-full lg:w-1/3 lg:px-2">
                  <Image src={`/Jets/${data.slug}/${data.image.interior.first.url}`} width={900} height={600} alt={data.image.interior.first.alt}/>
                </div>
                <div className="w-full lg:w-1/3 lg:px-2">
                  <Image src={`/jets/${data.slug}/${data.image.interior.second.url}`} width={900} height={600} alt={data.image.interior.second.alt}/>
                </div>
                <div className="w-full lg:w-1/3 lg:px-2">
                  <Image src={`/Jets/${data.slug}/${data.image.interior.third.url}`} width={900} height={600} alt={data.image.interior.third.alt}/>
                </div>
              </div>
            </div>
            <Form />
          </main>
        ))}
      </>
    )
}