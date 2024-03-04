import Image from "next/image"

export default function About() {

    return (
        <div className="flex flex-col px-4 lg:px-16 gap-12">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
                <div className="w-full flex flex-col gap-2">
                    <h2 className="uppercase font-bold text-2xl lg:text-4xl">Who we are</h2>
                    <p className="text-gray-400 lg:text-xl">We are a leading luxury charter company committed to elevating the standards of air travel. With a focus on excellence and unparalleled service, we provide discerning travelers with exceptional experiences in the skies.</p>
                </div>
                <div className="w-full">
                    <div className="flex justify-between border-b border-solid border-gray-400 py-4">
                        <h4 className="uppercase">Founding year</h4>
                        <h4>2009</h4>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-4">
                        <h4 className="uppercase">Fleet</h4>
                        <h4>10</h4>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-4">
                        <h4 className="uppercase">SERVED AIRPORTS</h4>
                        <h4>80+</h4>
                    </div>
                    <div className="flex justify-between border-b border-solid border-gray-400 py-4">
                        <h4 className="uppercase">Team size</h4>
                        <h4>130+</h4>
                    </div>
                </div>
            </div>
            <Image src={'/team-meeting.jpeg'} width={1600} height={600} loading="lazy" alt="team" />
        </div>
    )
}