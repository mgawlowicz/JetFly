import { useState, useEffect } from "react"

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
    const exactMatch = cities.some(c => c.value === departure);
    const suggestions = exactMatch || departure === '' ? cities : cities.filter(city => city.value.toLowerCase().includes(departure.toLowerCase()));
    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    useEffect(() => {
        const city = cities.find(c => c.value === departure);
        if (city) {
            setDepartureCode(city.code);
        }
    }, [departure, cities, setDepartureCode]);

    return (
        <div className="relative group">
            <input
                type="text"
                placeholder="Warsaw, PL"
                value={departure}
                className="w-full py-4 bg-transparent outline-none border-b border-white/10 focus:border-white transition-all duration-300 text-lg font-light placeholder:text-neutral-700"
                onChange={(e) => setDeparture(e.target.value)}
                onFocus={(e) => {
                    setShowSuggestions(true);
                    e.target.select();
                }}
                onBlur={handleInputBlur}
            />
            <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 group-focus-within:w-full" />
            
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 flex flex-col p-2 z-50 rounded-sm shadow-2xl max-h-64 overflow-y-auto no-scrollbar transition-all duration-300">
                    {suggestions.map((city, index) => (
                        <button 
                            key={index} 
                            onClick={() => { setDeparture(city.value); setShowSuggestions(false) }} 
                            className="text-left py-3 px-4 hover:bg-white/5 rounded-sm transition-colors text-sm font-light tracking-wide text-neutral-400 hover:text-white"
                        >
                            {city.value}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
