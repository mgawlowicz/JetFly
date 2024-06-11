import Image from "next/image"
import Link from "next/link"

export default function Footer(){

    return(
        <footer className="w-full flex flex-col gap-6 px-4 pb-4 pt-20 lg:pt-36 lg:px-16 lg:pb-16">
            <div className="flex justift-between border-b border-white border-solid pb-6">
                <div className="flex gap-2 items-center font-bold">
                    <Image src='/logo.png' width={24} height={24} alt="JetFly-logo"></Image>
                    <h1>JetFly</h1>
                </div>
            </div>
            <div className="flex w-full justify-between lg:gap-12 lg:justify-center font-semibold">
                <Link href="/charter" className="hover:text-gray-400">Charter</Link>
                <Link href="/fleet"className="hover:text-gray-400">Our Fleet</Link>
                <Link href="/about" className="hover:text-gray-400">About us</Link>
                <Link href="/contact" className="hover:text-gray-400">Contact</Link>
            </div>
        </footer>
    )
}