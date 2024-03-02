"use client"
import Link from "next/link";
import Image from "next/image";
import { Fade as Hamburger} from 'hamburger-react'
import { useState, useEffect } from 'react';


export default function Nav() {
    const [isOpen, setOpen] = useState(false)

    return (
      <nav className="px-4 py-4 flex justify-between items-center lg:px-16 lg:justify-start lg:gap-24">
        <div className="flex gap-2 items-center font-bold">
            <Image src='/logo.png' width={24} height={24}></Image>
            <h1>JetFly</h1>
        </div>
        <div className={isOpen ? "flex flex-col fixed w-full h-full items-center justify-around top-0 left-0 bg-black py-16 font-semibold" : "hidden lg:flex lg:gap-16 lg:font-semibold"}>
            <Link href="#" className="hover:text-gray-400">Charter</Link>
            <Link href="#" className="hover:text-gray-400">Our Fleet</Link>
            <Link href="#" className="hover:text-gray-400">About us</Link>
            <Link href="#" className="hover:text-gray-400">Contact</Link>
        </div>
        <div className="block lg:hidden"> 
            <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </nav>
    );
  }
  