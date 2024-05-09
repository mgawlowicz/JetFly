"use client"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"

const container = {
    hidden: {
        opacity:0,
        y: -16,
    },
    show: {
        opacity:1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export default function Map() {
    const [openState, setOpenState] = useState<{ [key: string]: boolean }>({ NewYork: false, London: false, Beijing: false, Dubai: false, Melbourne: false, Johannesburg: false, RiodeJanerio: false });

    const handleClick = (location: string) => {
        setOpenState(prevState => {
            const updatedState: { [key: string]: boolean } = {};
            for (const key in prevState) {
                if (Object.prototype.hasOwnProperty.call(prevState, key)) {
                    if (key === location) {
                        updatedState[key] = !prevState[key];
                    } else {
                        updatedState[key] = false;
                    }
                }
            }
            return updatedState;
        });
    };
    

    return (
        <div className="flex flex-col gap-12 px-4 lg:px-16">
            <div className="flex flex-col gap-2 w-full">
                <h3 className="uppercase font-bold text-2xl lg:text-4xl">Around the world</h3>
                <p className="lg:text-xl text-gray-400">At JetFly, we understand that the world is your playground. That is why we have strategically placed our offices across the globe, ensuring that no matter where you are, we are nearby to cater to your every travel need.</p>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-12">
                <div className="w-full flex flex-col select-none">
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4" onClick={() => handleClick('NewYork')}>
                        <h4 className="uppercase">New York</h4>
                        <motion.div animate={{ rotate: openState['NewYork'] ? 180 : 0 }} transition={{duration: 0.5}}>
                            <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                        </motion.div>
                    </div>
                    {openState['NewYork'] && (
                        <motion.div className="py-8 flex flex-col gap-2" variants={container} initial="hidden" animate="show">
                            <h4 className="text-xl">New York Office</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400">123 Broadway Avenue, Manhattan, USA</p>
                                <p className="text-gray-400">contact.newyork@jetfly.com</p>
                                <p className="text-gray-400">+1 (555) 123-4567</p>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4" onClick={() => handleClick('London')}>
                        <h4 className="uppercase">London</h4>
                        <motion.div animate={{ rotate: openState['London'] ? 180 : 0 }} transition={{duration: 0.5}}>
                            <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                        </motion.div>
                    </div>
                    {openState['London'] && (
                        <motion.div className="py-8 flex flex-col gap-2" variants={container} initial="hidden" animate="show">
                            <h4 className="text-xl">London Office</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400">45 Oxford Street, Westminster, United Kingdom</p>
                                <p className="text-gray-400">contact.london@jetfly.com</p>
                                <p className="text-gray-400">+44 20 1234 5678</p>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4" onClick={() => handleClick('Beijing')}>
                        <h4 className="uppercase">Beijing</h4>
                        <motion.div animate={{ rotate: openState['Beijing'] ? 180 : 0 }} transition={{duration: 0.5}}>
                            <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                        </motion.div>
                    </div>
                    {openState['Beijing'] && (
                        <motion.div className="py-8 flex flex-col gap-2" variants={container} initial="hidden" animate="show">
                            <h4 className="text-xl">Beijing Office</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400">789 Peking Road, Dongcheng District, China</p>
                                <p className="text-gray-400">contact.beijing@jetfly.com</p>
                                <p className="text-gray-400">+86 10 1234 5678</p>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4" onClick={() => handleClick('Dubai')}>
                        <h4 className="uppercase">Dubai</h4>
                        <motion.div animate={{ rotate: openState['Dubai'] ? 180 : 0 }} transition={{duration: 0.5}}>
                            <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                        </motion.div>
                    </div>
                    {openState['Dubai'] && (
                        <motion.div className="py-8 flex flex-col gap-2" variants={container} initial="hidden" animate="show">
                            <h4 className="text-xl">Dubai Office</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400">777 Sheikh Zayed Road, United Arab Emirates</p>
                                <p className="text-gray-400">contact.dubai@jetfly.com</p>
                                <p className="text-gray-400">+971 4 123 4567</p>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4" onClick={() => handleClick('Melbourne')}>
                        <h4 className="uppercase">Melbourne</h4>
                        <motion.div animate={{ rotate: openState['Melbourne'] ? 180 : 0 }} transition={{duration: 0.5}}>
                            <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                        </motion.div>
                    </div>
                    {openState['Melbourne'] && (
                        <motion.div className="py-8 flex flex-col gap-2" variants={container} initial="hidden" animate="show">
                            <h4 className="text-xl">Melbourne Office</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400">321 Collins Street, Melbourne, Australia</p>
                                <p className="text-gray-400">contact.melbourne@jetfly.com</p>
                                <p className="text-gray-400">+61 3 1234 5678</p>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4" onClick={() => handleClick('Johannesburg')}>
                        <h4 className="uppercase">Johannesburg</h4>
                        <motion.div animate={{ rotate: openState['Johannesburg'] ? 180 : 0 }} transition={{duration: 0.5}}>
                            <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                        </motion.div>
                    </div>
                    {openState['Johannesburg'] && (
                        <motion.div className="py-8 flex flex-col gap-2" variants={container} initial="hidden" animate="show">
                            <h4 className="text-xl">Johannesburg Office</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400">567 Mandela Street, Johannesburg, South Africa</p>
                                <p className="text-gray-400">contact.johannesburg@jetfly.com</p>
                                <p className="text-gray-400">+27 11 123 4567</p>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between border-b border-solid border-gray-400 py-6 pr-4" onClick={() => handleClick('RiodeJanerio')}>
                        <h4 className="uppercase">Rio de Janerio</h4>
                        <motion.div animate={{ rotate: openState['RiodeJanerio'] ? 180 : 0 }} transition={{duration: 0.5}}>
                            <Image src={'/arrow_down.png'} width={24} height={24} alt="arrow-down"/>
                        </motion.div>
                    </div>
                    {openState['RiodeJanerio'] && (
                        <motion.div className="py-8 flex flex-col gap-2" variants={container} initial="hidden" animate="show">
                            <h4 className="text-xl">Rio de Janerio Office</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400">456 Copacabana Avenue, Rio de Janeiro, Brazil</p>
                                <p className="text-gray-400">contact.riodejanerio@jetfly.com</p>
                                <p className="text-gray-400">+55 21 1234 5678</p>
                            </div>
                        </motion.div>
                    )}
                </div>
                <div className="w-full">
                    <Image src={'/map-new.webp'} width={1920} height={1080} loading="lazy" alt="offices map" />
                </div>
            </div>
        </div>
    )
}