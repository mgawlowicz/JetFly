"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const container = {
    hidden: {
        opacity:0
    },
    show: {
        opacity:1,
        transition: {
            staggerChildren: 0.7,
        }
    }
}

const mainItem =  {
    hidden: { 
        opacity: 0,
        y:-32,
    },
    show: {
        opacity: 1,
        y:0,
        transition: { duration: 0.7 }
    }
}

const item = {
    hidden: {
        opacity:0,
        y: -16,
    },
    show: {
        opacity:1,
        y:0,
        transition: { duration: 0.7}
    }
}

const arrow = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7}}
}

export default function Baner(){

    return(
        <div className="flex flex-col gap-4 relative">
            <div className="w-full h-screen relative">
                <Image 
                    src={'/baner.webp'}
                    quality={100} 
                    layout="fill" 
                    objectFit="cover" 
                    objectPosition="bottom" 
                    priority={true}
                    alt="baner-image" 
                />
            </div>
            <motion.div className="absolute h-screen flex flex-col justify-center p-4 lg:p-16 lg:w-1/2 gap-10 lg:gap-20" variants={container} initial="hidden" animate="show">
                <div className="flex flex-col gap-8">
                    <motion.h1 className="text-5xl lg:text-8xl font-bold" variants={mainItem}>A new better way of private flying</motion.h1>
                    <motion.p className="lg:text-lg font-medium" variants={item}>Renting a private jet has never been so easy</motion.p>
                </div>
                <motion.div variants={item}>
                    <Link href="#" className="flex w-max px-16 py-2 border-2 border-white border-solid font-semibold hover:bg-white hover:text-black transition duration-300 ease-in-out">Charter jet</Link>
                </motion.div>
            </motion.div>
            <motion.div className="absolute bottom-8 flex justify-center w-full" variants={arrow} initial="hidden" animate="show">
                <Image src={"/arrow_down.png"} width={24} height={24} alt="arrow_down"/>
            </motion.div>
        </div>
    )
}