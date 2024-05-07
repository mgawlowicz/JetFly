import Image from "next/image"

export default function Baner(){

    return (
        <div className="flex flex-col gap-8 pt-36 px-4 lg:px-16">
            <h1 className="text-5xl lg:text-8xl font-bold">Charter your flight</h1>
            <p className="text-gray-400 lg:text-xl">Experience the ultimate in personalized travel with our charter service. From luxurious aircraft to flexible scheduling, we cater to your every need, ensuring a seamless and unforgettable journey. Book your flight now and elevate your travel experience with us.</p>
            <Image src={'/charter-baner.webp'} width={1920} height={600} alt="charter-baner"/>
        </div>
        
    )
}