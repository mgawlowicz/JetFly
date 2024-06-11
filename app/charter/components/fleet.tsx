import Link from "next/link"
import Image from "next/image"

// export default function Fleet() {

//     return (
//         <div className="flex flex-col gap-8">
//             <div className="flex justify-between px-4 lg:px-16">
//                 <h3 className="uppercase font-bold text-2xl lg:text-4xl">Our fleet</h3>
//                 <Link href="#" className="uppercase hover:underline font-bold">View all</Link>
//             </div>
//             <div className="flex flex-col lg:flex-row lg:px-16 font-bold">
//                 <div className="relative w-full lg:w-1/3 h-72">
//                     <Image src={'/g550.webp'} fill={true} style={{ objectFit: "cover" }} loading="lazy" alt="g550" />
//                     <div className="absolute p-12 flex flex-col justify-between w-full h-full">
//                         <h4 className="lg:text-2xl">Gulfstream</h4>
//                         <h1 className="text-3xl lg:text-5xl">G550</h1>
//                         <div className="w-full flex justify-between items-end">
//                             <div className="flex flex-col gap-2">
//                                 <p>Starting at</p>
//                                 <p className="lg:text-xl">4999$</p>
//                             </div>
//                             <div className="flex gap-2">
//                                 <Link href="#" className="lg:text-xl">View</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="relative w-full lg:w-1/3 h-72">
//                     <Image src={'/g600.webp'} fill={true} style={{ objectFit: "cover" }} loading="lazy" alt="g600" />
//                     <div className="absolute p-12 flex flex-col justify-between w-full h-full">
//                         <h4 className="lg:text-2xl">Gulfstream</h4>
//                         <h1 className="text-3xl lg:text-5xl">G600</h1>
//                         <div className="w-full flex justify-between items-end">
//                             <div className="flex flex-col gap-2">
//                                 <p>Starting at</p>
//                                 <p className="lg:text-xl">6999$</p>
//                             </div>
//                             <div className="flex gap-2">
//                                 <Link href="#" className="lg:text-xl">View</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="relative w-full lg:w-1/3 h-72">
//                     <Image src={'/falcon7x.webp'} fill={true} style={{ objectFit: "cover" }} loading="lazy" alt="falcon7x" />
//                     <div className="absolute p-12 flex flex-col justify-between w-full h-full">
//                         <h4 className="lg:text-2xl">Dassault</h4>
//                         <h1 className="text-3xl lg:text-5xl">Falcon 7X</h1>
//                         <div className="w-full flex justify-between items-end">
//                             <div className="flex flex-col gap-2">
//                                 <p>Starting at</p>
//                                 <p className="lg:text-xl">7999$</p>
//                             </div>
//                             <div className="flex gap-2">
//                                 <Link href="#" className="lg:text-xl">View</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default function Fleet(){

    return (
        <div className="flex flex-col gap-8 px-4 lg:px-16">
            <div className="flex justify-between">
                <h3 className="uppercase font-bold text-2xl lg:text-4xl">Our fleet</h3>
                <Link href="/fleet" className="uppercase hover:underline font-bold">View all</Link>
             </div>
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link href={`/fleet/gulfstream-g550`} className='relative'>
                    <div className='w-full h-full'>
                        <Image src={'/Jets/gulfstream-g550/g550.webp'} width={900} height={600} alt='gulstream-g550' className='brightness-75 object-cover' />
                    </div>
                    <div className='w-full h-full absolute top-0 left-0 p-8 xl:p-12 flex flex-col justify-between'>
                        <h3 className='lg:text-xl font-semibold'>Gulfstream</h3>
                        <h2 className='text-4xl xl:text-5xl font-bold'>G550</h2>
                        <div className='flex justify-between w-full items-end'>
                            <div>
                                <h5 className='font-semibold'>Starting at</h5>
                                <h5 className='lg:text-xl font-semibold'>$4999/h</h5>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <p className='font-semibold'>View</p>
                                <Image src={"/arrow_down.png"} width={24} height={24} alt='arrow-icon' className='rotate-270' />
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href={`/fleet/gulfstream-g600`} className='relative'>
                    <div className='w-full h-full'>
                        <Image src={'/Jets/gulfstream-g600/g600.webp'} width={900} height={600} alt='gulstream-g550' className='brightness-75 object-cover' />
                    </div>
                    <div className='w-full h-full absolute top-0 left-0 p-8 xl:p-12 flex flex-col justify-between'>
                        <h3 className='lg:text-xl font-semibold'>Gulfstream</h3>
                        <h2 className='text-4xl xl:text-5xl font-bold'>G600</h2>
                        <div className='flex justify-between w-full items-end'>
                            <div>
                                <h5 className='font-semibold'>Starting at</h5>
                                <h5 className='lg:text-xl font-semibold'>$8999/h</h5>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <p className='font-semibold'>View</p>
                                <Image src={"/arrow_down.png"} width={24} height={24} alt='arrow-icon' className='rotate-270' />
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href={`/fleet/dassault-falcon-7x`} className='relative'>
                    <div className='w-full h-full'>
                        <Image src={'/Jets/dassault-falcon-7x/falcon-7x.webp'} width={900} height={600} alt='gulstream-g550' className='brightness-75 object-cover' />
                    </div>
                    <div className='w-full h-full absolute top-0 left-0 p-8 xl:p-12 flex flex-col justify-between'>
                        <h3 className='lg:text-xl font-semibold'>Dassault</h3>
                        <h2 className='text-4xl xl:text-5xl font-bold'>Falcon 7X</h2>
                        <div className='flex justify-between w-full items-end'>
                            <div>
                                <h5 className='font-semibold'>Starting at</h5>
                                <h5 className='lg:text-xl font-semibold'>$6999/h</h5>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <p className='font-semibold'>View</p>
                                <Image src={"/arrow_down.png"} width={24} height={24} alt='arrow-icon' className='rotate-270' />
                            </div>
                        </div>
                    </div>
                </Link>
             </div>
        </div>
    )
}