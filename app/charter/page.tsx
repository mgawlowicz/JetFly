import Form from "@/components/Form/form"
import Image from "next/image"
import Link from "next/link"


export default function Home() {


    return (
        <main className="flex flex-col gap-36">
            <div className="flex flex-col gap-8 pt-36 px-4 lg:px-16">
                <h1 className="lg:w-1/2 text-5xl lg:text-8xl font-bold">Charter your flight</h1>
                <p className="text-gray-400 lg:text-xl">Experience the ultimate in personalized travel with our charter service. From luxurious aircraft to flexible scheduling, we cater to your every need, ensuring a seamless and unforgettable journey. Book your flight now and elevate your travel experience with us.</p>
            </div>
            <div className="flex flex-col gap-8 px-4 lg:px-16">
                <h3 className="uppercase font-bold text-2xl lg:text-4xl">Request a quote</h3>
                <div className="w-full lg:w-1/3 flex justify-between">
                    <button className="w-full py-2 justify-center bg-white text-black font-semibold">One way</button>
                    <button className="w-full py-2 justify-center border border-solid border-white font-semibold">Round trip</button>
                    <button className="w-full py-2 justify-center border border-solid border-white font-semibold">On hours</button>
                </div>
                <div className="w-full flex flex-col gap-8 lg:flex-row">
                    <div className="w-full flex-col gap-2">
                        <label id="from" className="font-semibold">Departure Airport</label>
                        <select id="from" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white">
                            <option value="JFK">JFK</option>
                            <option value="JFK">JFK</option>
                            <option value="JFK">JFK</option>
                        </select>
                    </div>
                    <div className="w-full flex-col gap-2">
                        <label id="to" className="font-semibold">Arrival Airport</label>
                        <select id="to" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white">
                            <option value="JFK">JFK</option>
                            <option value="JFK">JFK</option>
                            <option value="JFK">JFK</option>
                        </select>
                    </div>
                    <div className="w-full flex-col gap-2">
                        <label id="jet" className="font-semibold">Jet</label>
                        <select id="jet" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white">
                            <option value="G550">Gulfstream G550</option>
                            <option value="JFK">JFK</option>
                            <option value="JFK">JFK</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-end">
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Passengers</p>
                            <Image src={"/armchair.png"} width={24} height={24} alt="armchair-icon" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Date</p>
                            <input type="datetime-local" className="bg-transparent"></input>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-8 lg:justify-end lg:items-center">
                        <h4 className="text-xl font-semibold">Estimated cost $6563</h4>
                        <button className="w-full lg:w-1/3 py-2 flex justify-center border border-solid border-white font-semibold hover:bg-white hover:text-black transition duration-300 ease-in-out">Book</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between px-4 lg:px-16">
                    <h3 className="uppercase font-bold text-2xl lg:text-4xl">Our fleet</h3>
                    <Link href="#" className="uppercase hover:underline font-bold">View all</Link>
                </div>
                <div className="flex flex-col lg:flex-row lg:px-16 font-bold">
                    <div className="relative w-full lg:w-1/3 h-72">
                        <Image src={'/g550.webp'} fill={true} style={{ objectFit: "cover" }} loading="lazy" alt="g550" />
                        <div className="absolute p-12 flex flex-col justify-between w-full h-full">
                            <h4 className="lg:text-2xl">Gulfstream</h4>
                            <h1 className="text-3xl lg:text-5xl">G550</h1>
                            <div className="w-full flex justify-between items-end">
                                <div className="flex flex-col gap-2">
                                    <p>Starting at</p>
                                    <p className="lg:text-xl">4999$</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href="#" className="lg:text-xl">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full lg:w-1/3 h-72">
                        <Image src={'/g600.webp'} fill={true} style={{ objectFit: "cover" }} loading="lazy" alt="g600" />
                        <div className="absolute p-12 flex flex-col justify-between w-full h-full">
                            <h4 className="lg:text-2xl">Gulfstream</h4>
                            <h1 className="text-3xl lg:text-5xl">G600</h1>
                            <div className="w-full flex justify-between items-end">
                                <div className="flex flex-col gap-2">
                                    <p>Starting at</p>
                                    <p className="lg:text-xl">6999$</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href="#" className="lg:text-xl">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full lg:w-1/3 h-72">
                        <Image src={'/falcon7x.webp'} fill={true} style={{ objectFit: "cover" }} loading="lazy" alt="falcon7x" />
                        <div className="absolute p-12 flex flex-col justify-between w-full h-full">
                            <h4 className="lg:text-2xl">Dassault</h4>
                            <h1 className="text-3xl lg:text-5xl">Falcon 7X</h1>
                            <div className="w-full flex justify-between items-end">
                                <div className="flex flex-col gap-2">
                                    <p>Starting at</p>
                                    <p className="lg:text-xl">7999$</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href="#" className="lg:text-xl">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Form />
        </main>
    )
}

