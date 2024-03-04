import Image from "next/image"
import Map from './components/map'
import Form from "@/components/Form/form"

export default function Home(){

    return(
        <main className="flex flex-col gap-20 lg:gap-36">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-8 pt-36 px-4 lg:px-16">
                    <h1 className="text-5xl lg:text-8xl font-bold">Contact us</h1>
                    <p className="text-gray-400 lg:text-xl">Need assistance? Have questions or suggestions? Don&apos;t hesitate to reach out to our professional customer service team. We&apos;re here to help and ensure you have an unforgettable travel experience. Get in touch with us today, and we&apos;ll address your needs with full dedication and care.</p>
                </div>
                <Image src={'/jet-sunset.webp'} width={1920} height={1272} priority={true} alt="jet-sunset"/>
            </div>
            <Map />
            <Form />
        </main>
    )
}