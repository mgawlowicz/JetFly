import Image from "next/image"

export default function Map() {

    return (
        <div className="flex flex-col gap-12 px-4 lg:px-16">
            <div className="flex flex-col gap-2 w-full">
                <h3 className="uppercase font-bold text-2xl lg:text-4xl">Around the world</h3>
                <p className="lg:text-xl text-gray-400">At JetFly, we understand that the world is your playground. That is why we have strategically placed our offices across the globe, ensuring that no matter where you are, we are nearby to cater to your every travel need.</p>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-12">
                <div className="w-full flex flex-col justify-center">
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4">
                        <h4 className="uppercase">New York</h4>
                        <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4">
                        <h4 className="uppercase">London</h4>
                        <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4">
                        <h4 className="uppercase">Beijing</h4>
                        <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4">
                        <h4 className="uppercase">Dubai</h4>
                        <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4">
                        <h4 className="uppercase">Melbourne</h4>
                        <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4">
                        <h4 className="uppercase">Johannesburg</h4>
                        <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4">
                        <h4 className="uppercase">Rio de Janerio</h4>
                        <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                    </div>
                </div>
                <div className="w-full">
                    <Image src={'/map.webp'} width={1920} height={1080} loading="lazy" alt="offices map" />
                </div>
            </div>
        </div>
    )
}