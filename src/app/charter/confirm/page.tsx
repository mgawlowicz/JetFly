"use client"
import Image from "next/image"
import Link from "next/link";
import { useState, useEffect, use } from "react"
import { motion, Variants } from "framer-motion"

interface Bonus {
    name: string;
    description: string;
    image: {
        url: string,
        alt: string,
    }
    price: number;
    slug: string;
}

interface Plane {
    brand: string;
    model: string;
    description: string;
    details: {
      speed: string;
      range: string;
      capacity: number;
      price: number;
    };
    image: {
      url: string,
      alt: string,
      interior: {
        first: {
          url: string,
          alt: string,
        }
        second: {
          url: string,
          alt: string,
        }
        third: {
          url: string,
          alt: string,
        }
      }
    }
    slug: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
}

export default function Confirm({searchParams} : {searchParams: Promise<{departure: string, arrival: string, passengers: number, price: number, distance: number, jetSlug: string, datetime: string}>}) {
    const resolvedSearchParams = use(searchParams);
    const initialPrice = Number(resolvedSearchParams.price) || 0;
    
    const [openState, setOpenState] = useState<{ [key: string]: boolean }>({ Wine: false, Limousine: false, Meal: false });
    const [bonus, setBonus] = useState<Bonus[]>([]);
    const [greenTax, setGreenTax] = useState(Math.floor(initialPrice * 0.07));
    const [vat, setVat] = useState(Math.floor(initialPrice * 0.08));
    const [totalPrice, setTotalPrice] = useState(initialPrice);
    const [extraCost, setExtraCost] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    const [plane, setPlane] = useState<Plane[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/jets/${resolvedSearchParams.jetSlug}`);
            const data = await res.json();
            setPlane(Object.values(data.jet));
        };

        fetchData();
    }, [resolvedSearchParams.jetSlug]);

    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch('/api/bonus');
            const data = await res.json();
            setBonus(Object.values(data.data));
        }

        fetchdata();
    }, []);

    useEffect(() => {
        let newExtraCost = 0;
        for (const item of bonus) {
            if (openState[item.slug]) {
                newExtraCost += item.price;
            }
        }
        setExtraCost(newExtraCost);
        setTotalPrice(initialPrice + newExtraCost);
    }, [openState, bonus, initialPrice]);


    useEffect(() => {
        setIsFormValid(name !== '' && surname !== '' && email !== '' && tel !== '');
    }, [name, surname, email, tel]);

    const handleClick = (location: string) => {
        setOpenState(prevState => ({
            ...prevState,
            [location]: !prevState[location]
        }));
    };

    return (
        <main className="min-h-screen bg-premium-dark text-white pt-32 pb-20 lg:pt-56 lg:pb-48 overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
                >
                    
                    <div className="lg:col-span-7 space-y-24">
                        <motion.div variants={itemVariants} className="space-y-6">
                            <span className="subtitle-standard">Reservation Step 02</span>
                            <h1 className="text-4xl lg:text-7xl font-extralight tracking-tighter leading-[1.1] uppercase">
                                Confirm <br />
                                <span className="text-neutral-400 italic lowercase">your flight details</span>
                            </h1>
                        </motion.div>

                        
                        {plane.map((item, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants}
                                className="group relative overflow-hidden bg-white/[0.01] border-t border-white/5 pt-12 pb-12 flex flex-col md:flex-row gap-10 transition-all duration-700 hover:bg-white/[0.02]"
                            >
                                <div className="relative w-full md:w-96 h-56 md:h-64 overflow-hidden rounded-sm">
                                    <Image 
                                        src={`/Jets/${item.slug}/${item.image.url}`} 
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        alt={item.image.alt} 
                                        className="transition-transform duration-[3s] ease-out group-hover:scale-105 brightness-[0.8] group-hover:brightness-100"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-premium-dark/40 to-transparent" />
                                </div>
                                <div className="flex-1 space-y-8 flex flex-col justify-center">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 font-bold mb-3">{item.brand}</p>
                                        <h2 className="text-3xl lg:text-5xl font-extralight tracking-tighter uppercase">{item.model}</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        {[
                                            { label: 'Speed', value: `${item.details.speed} km/h` },
                                            { label: 'Range', value: item.details.range },
                                            { label: 'Capacity', value: `${item.details.capacity} PAX` },
                                            { label: 'Rate', value: `$${item.details.price.toLocaleString()} / HR` },
                                        ].map((spec, i) => (
                                            <div key={i} className="space-y-1">
                                                <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">{spec.label}</p>
                                                <p className="text-sm font-light text-white/70 tracking-wide uppercase">{spec.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        
                        <motion.div variants={itemVariants} className="space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 font-bold">Client Information</h3>
                                <div className="w-full h-px bg-white/5" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                {[
                                    { id: 'name', label: 'First Name', placeholder: 'John', setter: setName },
                                    { id: 'surname', label: 'Last Name', placeholder: 'Smith', setter: setSurname },
                                    { id: 'email', label: 'Email Address', placeholder: 'client@luxury.com', type: 'email', setter: setEmail },
                                    { id: 'phone', label: 'Phone Number', placeholder: '+48 000 000 000', type: 'tel', setter: setTel },
                                ].map((field) => (
                                    <div key={field.id} className="group relative">
                                        <label htmlFor={field.id} className="block text-[9px] uppercase tracking-[0.4em] text-neutral-400 mb-3 transition-colors group-focus-within:text-white font-bold">{field.label}</label>
                                        <input 
                                            type={field.type || 'text'} id={field.id} required
                                            className="w-full bg-transparent border-b border-white/5 py-4 outline-none transition-all duration-700 focus:border-white/40 placeholder:text-white/5 text-lg font-extralight tracking-tight" 
                                            placeholder={field.placeholder} 
                                            onChange={(e) => field.setter(e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        
                        <motion.div variants={itemVariants} className="space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 font-bold">Enhance experience</h3>
                                <div className="w-full h-px bg-white/5" />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                                {bonus.map((item, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => handleClick(item.slug)}
                                        className={`group relative flex items-center justify-between p-8 rounded-sm cursor-pointer transition-all duration-1000 border-l-[1px] ${
                                            openState[item.slug] 
                                            ? "bg-white text-black border-white" 
                                            : "bg-white/[0.01] text-white border-white/5 hover:bg-white/[0.03] hover:border-white/20"
                                        }`}
                                    >
                                        <div className="flex items-center gap-8">
                                            <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-700 group-active:scale-95">
                                                <Image 
                                                    src={`/${item.image.url}`} 
                                                    width={32} 
                                                    height={32} 
                                                    alt={item.image.alt}
                                                    className={`transition-all duration-700 ${openState[item.slug] ? "invert" : "opacity-40 group-hover:opacity-100"}`}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-extralight tracking-tight uppercase mb-1">{item.name}</h4>
                                                <p className={`text-[10px] uppercase tracking-widest transition-colors duration-700 ${openState[item.slug] ? "text-black/50" : "text-neutral-400"}`}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-extralight tracking-tighter">${item.price}</p>
                                            <p className={`text-[8px] uppercase tracking-[0.3em] mt-1 font-bold ${openState[item.slug] ? "text-black/40" : "text-white/10 group-hover:text-white/40"}`}>
                                                {openState[item.slug] ? "Selected" : "Add Service"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    
                    <div className="lg:col-span-5">
                        <motion.div 
                            variants={itemVariants}
                            className="sticky top-32 lg:ml-12 p-10 lg:p-14 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-sm space-y-12"
                        >
                            <div className="space-y-4">
                                <span className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 font-bold block">Summary</span>
                                <h4 className="text-3xl font-extralight tracking-tighter uppercase italic">The Journey</h4>
                            </div>

                            <div className="space-y-10">
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Departure</p>
                                        <p className="text-sm font-light text-white/60 tracking-wide uppercase">{resolvedSearchParams.departure}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Arrival</p>
                                        <p className="text-sm font-light text-white/60 tracking-wide uppercase">{resolvedSearchParams.arrival}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Route</p>
                                        <p className="text-sm font-light text-white/60 tracking-wide uppercase">{Math.ceil(Number(resolvedSearchParams.distance)) || 0} KM</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Date</p>
                                        <p className="text-sm font-light text-white/60 tracking-wide uppercase">{resolvedSearchParams.datetime || 'TBD'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Aircraft</p>
                                        {plane.length > 0 ? plane.map((item, index) => (
                                            <p key={index} className="text-sm font-light text-white/60 tracking-wide uppercase">{item.brand} {item.model}</p>
                                        )) : <p className="text-sm font-light text-white/60 tracking-wide uppercase italic">Loading jet info...</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Passengers</p>
                                        <p className="text-sm font-light text-white/60 tracking-wide uppercase">{Number(resolvedSearchParams.passengers) || 0} GUESTS</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 pt-10 border-t border-white/5 font-extralight">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[11px] tracking-[0.2em] text-white/30 uppercase">
                                        <p>Base Charter</p>
                                        <p>${Number(resolvedSearchParams.price).toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between text-[11px] tracking-[0.2em] text-white/30 uppercase">
                                        <p>Sustainability Tax</p>
                                        <p>${greenTax.toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between text-[11px] tracking-[0.2em] text-white/30 uppercase">
                                        <p>Government VAT</p>
                                        <p>${vat.toLocaleString()}</p>
                                    </div>
                                    
                                    {(openState['Wine'] || openState['Limousine'] || openState['Meal']) && (
                                        <div className="pt-6 mt-6 border-t border-white/[0.03] space-y-4">
                                            <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Bespoke Services</p>
                                            {openState['Wine'] && <div className="flex justify-between text-[11px] tracking-[0.2em] text-white/50 uppercase"><p>Vault Selection</p><p>$100</p></div>}
                                            {openState['Limousine'] && <div className="flex justify-between text-[11px] tracking-[0.2em] text-white/50 uppercase"><p>Chauffeur Service</p><p>$500</p></div>}
                                            {openState['Meal'] && <div className="flex justify-between text-[11px] tracking-[0.2em] text-white/50 uppercase"><p>Curated Dining</p><p>$200</p></div>}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-baseline pt-6 border-t border-white/10">
                                    <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Total Estimate</p>
                                    <h4 className="text-4xl lg:text-5xl font-extralight tracking-tighter">${totalPrice.toLocaleString()}</h4>
                                </div>
                            </div>

                            <Link 
                                href="./confirmed" 
                                className={`group relative block w-full text-center py-6 border transition-all duration-700 active:scale-[0.98] ${
                                    isFormValid 
                                    ? "bg-white text-black border-white hover:bg-transparent hover:text-white" 
                                    : "bg-white/[0.02] text-white/10 border-white/5 cursor-not-allowed pointer-events-none"
                                }`}
                            >
                                <span className="relative z-10 text-[10px] uppercase tracking-[0.6em] font-bold">Confirm Booking</span>
                            </Link>
                            
                            {!isFormValid && (
                                <p className="text-[8px] text-center uppercase tracking-[0.4em] text-white/10">Required fields remain incomplete</p>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
