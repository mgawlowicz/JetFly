import Link from "next/link";
import Image from "next/image";

export default function Fleet(){

    return(
        <div className="flex flex-col gap-12">
            <div className="flex justify-between px-4 lg:px-16">
                <h3 className="uppercase font-bold text-2xl lg:text-4xl">Our fleet</h3>
                <Link href="#" className="uppercase hover:underline font-bold">View all</Link>
            </div>
            <div className="flex flex-col">
                <div className="relative w-full h-72 lg:h-96 font-bold">
                    <Image src={'/g550_out.webp'} fill="true" style={{objectFit: "cover"}} loading="lazy" alt="g550"/>
                    <div className="absolute w-full h-full flex flex-col justify-between px-12 py-12 lg:px-36 lg:py-12">
                        <h4 className="lg:text-2xl">Gulfstream</h4>
                        <h1 className="text-5xl lg:text-8xl">G550</h1>
                        <div className="w-full flex justify-between items-end">
                            <div className="flex flex-col gap-2">
                                <p>Starting at</p>
                                <p className="lg:text-2xl">4999$</p>
                            </div>
                            <div className="flex gap-2">
                                <Link href="#" className="lg:text-2xl">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-72 lg:h-96 font-bold">
                    <Image src={'/g600.webp'} fill="true" style={{objectFit: "cover"}} loading="lazy" alt="g600"/>
                    <div className="absolute w-full h-full flex flex-col justify-between px-12 py-12 lg:px-36 lg:py-12">
                        <h4 className="lg:ext-2xl">Gulfstream</h4>
                        <h1 className="text-5xl lg:text-8xl">G600</h1>
                        <div className="w-full flex justify-between items-end">
                            <div className="flex flex-col gap-2">
                                <p>Starting at</p>
                                <p className="lg:text-2xl">6999$</p>
                            </div>
                            <div className="flex gap-2">
                                <Link href="#" className="lg:text-2xl">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-72 lg:h-96 font-bold">
                    <Image src={'/falcon7x.webp'} fill="true" style={{objectFit: "cover"}} loading="lazy" alt="falcon7x"/>
                    <div className="absolute w-full h-full flex flex-col justify-between px-12 py-12 lg:px-36 lg:py-12">
                        <h4 className="lg:text-2xl">Dassault</h4>
                        <h1 className="text-5xl lg:text-8xl">Falcon 7X</h1>
                        <div className="w-full flex justify-between items-end">
                            <div className="flex flex-col gap-2">
                                <p>Starting at</p>
                                <p className="lg:text-2xl">7999$</p>
                            </div>
                            <div className="flex gap-2">
                                <Link href="#" className="lg:text-2xl">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}