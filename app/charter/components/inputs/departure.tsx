import { useState } from "react"

interface Cities {
    value: string;
    code: string;
}

interface Props {
    cities: Cities[];
    setDeparture: (value: string) => void;
    departure: string;
    setDepartureCode: (value: string) => void;
}

export default function DepartureInput({ cities, setDeparture, departure, setDepartureCode }: Props) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestions = cities.filter(city => city.value.toLowerCase().includes(departure.toLowerCase()))
    const filteredData = cities.filter(city => city.value === departure)

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    if (filteredData.length > 0) {
        setDepartureCode(filteredData[0].code)
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Warsaw, PL"
                value={departure}
                className="w-full py-2 bg-transparent outline-none border-b border-solid border-white"
                onChange={(e) => setDeparture(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleInputBlur}
            >
            </input>
            {showSuggestions && (
                <div className="absolute bg-neutral-900 w-full flex flex-col p-4 z-50 rounded-lg my-4 max-h-64 overflow-scroll">
                    {suggestions.map((city, index) => (
                        <a key={index} onClick={() => { setDeparture(city.value); setShowSuggestions(false) }} className="hover:bg-neutral-600 p-2 rounded-md no-scrollbar">{city.value}</a>
                    ))}
                </div>
            )}
        </div>
    )
}