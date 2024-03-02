import Image from "next/image"

export default function Experience(){

    return(
        <div className="px-4 lg:px-16 flex flex-col gap-12">
            <h2 className="uppercase font-bold text-4xl">Experience is everything</h2>
            <div className="flex justify-end">
                <p className="text-gray-400 w-3/4 lg:w-1/2 lg:text-xl">Experience luxury travel like never before. Elevate your journey with our private fleet of luxurious aircraft. With JetFly every moment in the air is unforgettable. Welcome aboard.</p>
            </div>
            <div className="relative">
                {/* zle wyswietlane zdjecie! */}
                <Image src={'/gulfstreamG600-interior.webp'} width={1920} height={450} loading="lazy"/>
            </div>
        </div>
    )
}