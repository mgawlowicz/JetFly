import Image from "next/image"
import Link from "next/link"

export default function Footer(){

    return(
        <footer className="flex flex-col gap-6 px-4 pb-4 lg:px-12 lg:pb-12">
            <div className="flex justift-between border-b border-white border-solid pb-6">
                <div className="flex gap-2 items-center font-bold">
                    <Image src='/logo.png' width={24} height={24} alt="JetFly-logo"></Image>
                    <h1>JetFly</h1>
                </div>
                <div className="flex gap-2">
                    
                </div>
            </div>
            <div className="flex w-full justify-center gap-12 font-semibold">
                <Link href="#" className="hover:text-gray-400">Charter</Link>
                <Link href="#"className="hover:text-gray-400">Our Fleet</Link>
                <Link href="#" className="hover:text-gray-400">About us</Link>
                <Link href="#" className="hover:text-gray-400">Contact</Link>
            </div>
        </footer>
    )
}