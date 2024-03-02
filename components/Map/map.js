import Image from "next/image"

export default function Map(){

    return(
        <div className="flex flex-col lg:flex-row-reverse gap-12 px-4 lg:px-16">
            <div className="flex flex-col gap-2">
                <h3 className="uppercase font-bold text-2xl lg:text-4xl">Around the world</h3>
                <p className="text-xl text-gray-400">At JetFly, we understand that the world is your playground. That's why we've strategically placed our offices across the globe, ensuring that no matter where you are, we're nearby to cater to your every travel need.</p>
            </div>
            <div>
                <Image src={'/map.webp'} width={1920} height={1080}/>
            </div>
        </div>
    )
}