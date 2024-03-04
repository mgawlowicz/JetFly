import Image from "next/image"

export default function Baner() {

    return (
        <div className="px-4 lg:px-16 flex flex-col gap-12 pt-36">
            <h1 className="lg:w-2/3 text-5xl lg:text-8xl font-bold">Let&apos;s get to know each other</h1>
            <div className="flex justify-end">
                <p className="text-gray-400 w-3/4 lg:w-1/2 lg:text-xl">Welcome aboard JetFly! Whether you&apos;re a first-time traveler or a frequent flyer, we&apos;re here to make your journey unforgettable. Sit back, relax, and let&apos;s create amazing memories together!</p>
            </div>
            <div className="relative">
                {/* zle wyswietlane zdjecie! */}
                <Image src={'/cockpit-view.jpeg'} width={1600} height={600} priority={true} alt="cockpit view" />
            </div>
        </div>
    )
}