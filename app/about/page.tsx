import Image from "next/image"
import Form from "@/components/Form/form"

export default function Home() {


    return (
        <main className="flex flex-col gap-20 lg:gap-36">
            <div className="px-4 lg:px-16 flex flex-col gap-12 pt-36">
                <h1 className="lg:w-2/3 text-5xl lg:text-8xl font-bold">Let’s get to know each other</h1>
                <div className="flex justify-end">
                    <p className="text-gray-400 w-3/4 lg:w-1/2 lg:text-xl">Welcome aboard JetFly! Whether you're a first-time traveler or a frequent flyer, we're here to make your journey unforgettable. Sit back, relax, and let's create amazing memories together!</p>
                </div>
                <div className="relative">
                    {/* zle wyswietlane zdjecie! */}
                    <Image src={'/cockpit-view.jpeg'} width={1600} height={600} priority={true} alt="cockpit view" />
                </div>
            </div>
            <div className="w-full px-4 lg:px-16 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                    <h4 className="text-2xl lg:text-4xl font-bold">Comfort</h4>
                    <p className="text-gray-400 lg:text-xl">We ensure comfort by offering the flexibility to position the aircraft to any airport within the continent, providing flexibility and luxury in travel.</p>
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                    <h4 className="text-2xl lg:text-4xl font-bold">Insurance</h4>
                    <p className="text-gray-400 lg:text-xl">We provide insurance for all flights, allowing our clients to travel worry-free and with complete peace of mind.</p>
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                    <h4 className="text-2xl lg:text-4xl font-bold">Services 24/7</h4>
                    <p className="text-gray-400 lg:text-xl">Our support team is available 24/7 to provide you with assistance and professional service at any moment of your journey.</p>
                </div>
            </div>
            <div className="flex flex-col px-4 lg:px-16 gap-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="uppercase font-bold text-4xl">Who we are</h2>
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
                <Image src={'/team-meeting.jpeg'} width={1600} height={600} loading="lazy" alt="team"/>
            </div>
            <div className="flex flex-col lg:flex-row gap-12 px-4 lg:px-16">
                <div className="flex flex-col gap-2 w-full">
                    <h2 className="uppercase font-bold text-4xl">Visionary Founder</h2>
                    <p className="text-gray-400 lg:text-xl">Benjamin Hughes, refused to settle for the status quo. His dream of luxurious travel experiences where comfort and customer service reign supreme led to the creation of JetFly. It's more than just a company; it's a vision to revolutionize the standards of business aviation. Thanks to his passion and determination, JetFly doesn't just offer flights; it crafts unforgettable experiences that transcend ordinary travel.</p>
                </div>
                <Image src={'/founder-picture.jpeg'} width={600} height={400} alt="founder-picture" className="w-full"/>
            </div>
            <div className="flex flex-col gap-12 px-4 lg:px-16">
                <h2 className="uppercase font-bold text-4xl">JetFly in numbers</h2>
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                            <h3 className="text-6xl">520+</h3>
                            <p className="lg:text-xl">Clients</p>
                        </div>
                        <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                            <h3 className="text-6xl">10K+</h3>
                            <p className="lg:text-xl">Hours in sky</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                            <h3 className="text-6xl">9M</h3>
                            <p className="lg:text-xl">Kilometers flown</p>
                        </div>
                        <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                            <h3 className="text-6xl">93%</h3>
                            <p className="lg:text-xl">Repeat Clients</p>
                        </div>
                    </div>
                </div>
            </div>
            <Form />
        </main>
    )
}