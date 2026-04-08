"use client"
import Link from "next/link"
import { useState, useEffect, useMemo, Fragment, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { Container, Grid as LayoutGrid } from "@/components/layout/layout-system"
import JetInput from "./inputs/jets";
import ArrivalInput from "./inputs/arrival";
import DepartureInput from "./inputs/departure";
import PassengersInput from "./inputs/passengers";
import type { PlaneBasic, City } from "@/lib/types";
import jetsData from "@/data/data.json";
import citiesData from "@/data/city.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import { useFlightCalculator } from "./useFlightCalculator";

const JourneyMap = dynamic(() => import("@/features/map/JourneyMap"), { ssr: false })

export default function Quote() {
    const planes: PlaneBasic[] = (jetsData as PlaneBasic[]);
    const cities: City[] = citiesData;

    const {
        tripType, setTripType,
        departure,
        destinations,
        flightHours, setFlightHours,
        jet, setJet,
        jetSlug, setJetSlug,
        passengers, setPassengers,
        datetime, setDatetime,
        waypointsContent,
        totalDistance,
        price,
        isRangeExceeded,
        isFormValid,
        selectedPlane,
        addDestination,
        removeDestination,
        updateDestination,
        handleDepartureCityUpdate,
        handleDepartureCodeUpdate
    } = useFlightCalculator(planes);

    return (
        <section className="section-standard" id="quote">
            <Container>
                <LayoutGrid className="items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="col-span-4 md:col-span-8 lg:col-span-12 xl:col-span-10 mb-12 lg:mb-20"
                    >
                        <span className="subtitle-standard">Flight Planning</span>
                        <h2 className="h2-standard">
                            Request a <br />
                            <span className="text-white italic">private quote</span>
                        </h2>
                    </motion.div>

                    <div className="col-span-4 md:col-span-8 lg:col-span-12 space-y-16 lg:space-y-20">
                        
                        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-0 max-w-2xl border border-white/10 rounded-sm overflow-hidden relative">
                            {[
                                { id: 'one-way', label: 'One Way' },
                                { id: 'round-trip', label: 'Round Trip' },
                                { id: 'on-hours', label: 'On Hours' }
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setTripType(type.id)}
                                    className={`relative flex-1 min-w-[120px] py-5 px-6 sm:px-8 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-300 z-10 
                                        ${tripType === type.id
                                            ? 'text-black'
                                            : 'text-neutral-400 hover:text-white'}`}
                                >
                                    {tripType === type.id && (
                                        <motion.div
                                            layoutId="selector-bg"
                                            className="absolute inset-0 bg-white"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{type.label}</span>
                                </button>
                            ))}
                        </div>

                        <LayoutGrid className="gap-12 lg:gap-16">
                            <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Departure Airport *</label>
                                <DepartureInput cities={cities} setDeparture={handleDepartureCityUpdate} departure={departure.cityName} setDepartureCode={handleDepartureCodeUpdate} />
                            </div>

                            {tripType !== 'on-hours' ? (
                                <>
                                    {destinations.map((dest, i) => (
                                        <div key={dest.id} className="col-span-4 md:col-span-4 lg:col-span-4 space-y-4 relative group">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">
                                                    {i === destinations.length - 1 && tripType !== 'round-trip' ? 'Final Destination *' : `Stopover ${i + 1} *`}
                                                </label>
                                                {destinations.length > 1 && (
                                                    <button type="button" onClick={() => removeDestination(dest.id)} className="text-[8px] uppercase tracking-[0.2em] text-neutral-600 hover:text-red-400 transition-colors pointer-events-auto">
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <ArrivalInput
                                                cities={cities}
                                                arrival={dest.cityName}
                                                setArrival={(val) => updateDestination(dest.id, 'cityName', val)}
                                                setArrivalCode={(val) => updateDestination(dest.id, 'cityCode', val)}
                                            />
                                        </div>
                                    ))}
                                    <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] opacity-0 select-none block" aria-hidden="true">&nbsp;</label>
                                        <button
                                            type="button"
                                            onClick={addDestination}
                                            className="group flex items-center gap-3 py-4 w-full border-b border-white/10 hover:border-white/40 transition-all pointer-events-auto"
                                        >
                                            <div className="w-7 h-7 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:border-white group-hover:text-white transition-all">+</div>
                                            <span className="font-light text-neutral-400 group-hover:text-white tracking-widest uppercase text-[10px]">Add Destination</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Flight Hours *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={flightHours || ''}
                                        onChange={(e) => setFlightHours(parseInt(e.target.value) || 0)}
                                        className="w-full py-4 bg-transparent outline-none border-b border-white/10 focus:border-white transition-all duration-300 text-lg font-light"
                                    />
                                </div>
                            )}

                            <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Select Jet *</label>
                                <JetInput planes={planes} setJet={setJet} jet={jet} setJetSlug={setJetSlug} jetSlug={jetSlug} />
                            </div>
                            <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Passengers *</label>
                                <PassengersInput planes={planes} setPassengers={setPassengers} passengers={passengers} jetSlug={jetSlug} />
                            </div>
                            <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Date & Time *</label>
                                <div className="relative group">
                                    <DatePicker
                                        selected={datetime}
                                        onChange={(date: Date | null) => setDatetime(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        minDate={new Date()}
                                        className="bg-transparent border-b border-white/10 py-4 px-1 outline-none w-full text-lg font-light transition-all focus:border-white group-hover:border-white/40 placeholder:text-neutral-700"
                                        placeholderText="Select Date & Time"
                                    />
                                </div>
                            </div>

                            
                            <AnimatePresence>
                                {isRangeExceeded && (
                                    <div className="col-span-4 md:col-span-12 mt-4 space-y-2">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-extralight block">
                                            Warning <span className="text-neutral-500">{"//"}</span> Range Limit
                                        </span>
                                        <p className="text-lg font-light text-neutral-400">
                                            The selected aircraft (<span className="text-white">{jet}</span>) has a range of <span className="text-white">{selectedPlane?.details.range}</span>.
                                            One of your planned flight segments exceeds this limit and cannot be flown non-stop.
                                            Please add an intermediate stopover or select a larger aircraft to proceed.
                                        </p>
                                    </div>
                                )}
                            </AnimatePresence>

                            
                            <div className="col-span-4 md:col-span-12 space-y-4 mt-8">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Estimated Cost</label>
                                <div className="flex items-center justify-between gap-2 xl:gap-4 h-[56px] rounded-sm">
                                    <div className="w-1/2 flex items-center h-full">
                                        <h4 className="text-2xl xl:text-3xl font-extralight tracking-tighter leading-none">${price.toLocaleString()}</h4>
                                    </div>

                                    <Link
                                        href={{
                                            pathname: "/charter/confirm",
                                            query: {
                                                departure: departure.cityName,
                                                arrival: destinations[destinations.length - 1]?.cityName || 'On Hours Return',
                                                passengers,
                                                price,
                                                distance: Math.round(totalDistance),
                                                jetSlug,
                                                datetime: datetime ? datetime.toISOString() : ''
                                            }
                                        }}
                                        className={`group relative min-w-[200px] h-full px-8 flex items-center justify-center bg-white text-black font-bold uppercase tracking-[0.15em] text-[10px] transition-all duration-500 overflow-hidden text-center whitespace-nowrap ${isFormValid ? 'hover:bg-neutral-200 cursor-pointer' : 'opacity-30 cursor-not-allowed pointer-events-none'}`}
                                    >
                                        <span className="relative z-10">{isRangeExceeded ? 'Range Limit' : 'Confirm Booking'}</span>
                                    </Link>
                                </div>
                            </div>
                        </LayoutGrid>

                        
                        <div className="py-8 overflow-hidden">
                            <div className="flex flex-col gap-8">
                                <div className="flex justify-between items-end min-h-[40px]">
                                    <AnimatePresence mode="wait">
                                        {waypointsContent.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="space-y-1"
                                            >
                                                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight">Planned Route</span>
                                                <div className="text-xl font-light tracking-tighter">
                                                    {waypointsContent.map((pt, i) => (
                                                        <Fragment key={i}>
                                                            <span className={i === 0 || i === waypointsContent.length - 1 ? "text-white" : "text-neutral-400"}>
                                                                {pt.name || "..."}
                                                            </span>
                                                            {i < waypointsContent.length - 1 && (
                                                                <span className="text-white/20 mx-2">—</span>
                                                            )}
                                                        </Fragment>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {totalDistance > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                className="text-right space-y-1"
                                            >
                                                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight">Total Distance</span>
                                                <div className="text-xl font-light tracking-tighter">
                                                    {Math.round(totalDistance).toLocaleString()} <span className="text-[10px] text-neutral-400 ml-1 font-extralight tracking-[0.3em]">KM</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="relative w-full aspect-[2.15/1] overflow-hidden">
                                    <JourneyMap
                                        waypoints={waypointsContent}
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutGrid>
            </Container>
        </section>
    );
}
