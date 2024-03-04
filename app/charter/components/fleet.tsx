import Link from "next/link"
import Image from "next/image"

export default function Fleet() {

    return (
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
    )
}