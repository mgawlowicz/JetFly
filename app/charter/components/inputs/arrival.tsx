import { useState } from "react";

interface Cities {
    value: string;
    code: string
}

interface Props {
    cities: Cities[];
    setArrival: (value: string) => void;
    arrival: string;
    setArrivalCode: (value: string) => void;
}

export default function ArrivalInput({cities, setArrival, arrival, setArrivalCode}: Props) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestions = cities.filter(city => city.value.toLowerCase().includes(arrival.toLowerCase()))
    const filteredData = cities.filter(city => city.value === arrival)

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false)
        }, 200)
    }
    
    if (filteredData.length > 0) {
        setArrivalCode(filteredData[0].code)
    }

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Warsaw, PL"
                value={arrival}
                className="w-full py-2 bg-transparent outline-none border-b border-solid border-white"
                onChange={(e) => setArrival(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleInputBlur}
            >
            </input>
            {showSuggestions && (
                <div className="absolute bg-neutral-900 w-full flex flex-col p-4 z-50 rounded-lg my-4 max-h-64 overflow-scroll">
                    {suggestions.map((city, index) => (
                        <a key={index} onClick={() => { setArrival(city.value); setShowSuggestions(false) }} className="hover:bg-neutral-600 p-2 rounded-md no-scrollbar">{city.value}</a>
                    ))}
                </div>
            )}
        </div>
    )
}