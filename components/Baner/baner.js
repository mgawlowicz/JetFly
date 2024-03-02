import Image from "next/image"
import Link from "next/link"

export default function Baner(){


    return(
        <div className="flex flex-col gap-4 relative">
            <div className="w-full h-screen relative">
                <Image 
                    src={'/baner.webp'}
                    quality={100} 
                    layout="fill" 
                    objectFit="cover" 
                    objectPosition="bottom" 
                    priority={true}
                    alt="baner-image" 
                />
            </div>
            <div className="absolute h-screen flex flex-col justify-center p-4 lg:p-16 lg:w-1/2 gap-10 lg:gap-20">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl lg:text-8xl font-bold">A new better way of private flying</h1>
                    <p className="lg:text-lg font-medium">Renting a private jet has never been so easy</p>
                </div>
                <Link href="#" className="flex w-max px-16 py-2 border-2 border-white border-solid font-semibold hover:bg-white hover:text-black transition duration-300 ease-in-out">Charter jet</Link>
            </div>
        </div>
    )
}