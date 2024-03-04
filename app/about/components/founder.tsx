import Image from "next/image"

export default function Founder() {

    return (
        <div className="flex flex-col lg:flex-row gap-12 px-4 lg:px-16">
            <div className="flex flex-col gap-2 w-full">
                <h2 className="uppercase font-bold text-2xl lg:text-4xl">Visionary Founder</h2>
                <p className="text-gray-400 lg:text-xl">Benjamin Hughes, refused to settle for the status quo. His dream of luxurious travel experiences where comfort and customer service reign supreme led to the creation of JetFly. It&apos;s more than just a company; it&apos;s a vision to revolutionize the standards of business aviation. Thanks to his passion and determination, JetFly doesn&apos;t just offer flights; it crafts unforgettable experiences that transcend ordinary travel.</p>
            </div>
            <Image src={'/founder-picture.webp'} width={600} height={400} loading="lazy" alt="founder-picture" className="w-full" />
        </div>
    )
}