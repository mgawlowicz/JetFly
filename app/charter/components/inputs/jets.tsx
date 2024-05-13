import { useState } from "react"

interface Plane {
    brand: string,
    model: string,
    slug: string
}

interface Props {
    planes: Plane[]
    jet: string;
    setJet: (value: string) => void;
    jetSlug: string;
    setJetSlug: (value: string) => void;
}

export default function JetInput({planes, jet, setJet, jetSlug, setJetSlug}: Props) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestions = planes.filter((plane: Plane) => {
        const name = `${plane.brand} ${plane.model}`;
        return name.toLowerCase().includes(jet.toLowerCase());
    })

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false)
        }, 200)
    }

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Gulfstream G550"
                value={jet}
                className="w-full py-2 bg-transparent outline-none border-b border-solid border-white"
                onChange={(e) => setJet(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleInputBlur}
            ></input>
            {showSuggestions && (
                <div className="absolute bg-neutral-900 w-full flex flex-col p-4 z-50 rounded-lg my-4 max-h-64 overflow-scroll">
                    {suggestions.map((plane, index) => (
                        <a key={index} onClick={() => { setJetSlug(plane.slug); setJet(plane.brand + ' ' + plane.model); setShowSuggestions(false) }} className="hover:bg-neutral-600 p-2 rounded-md no-scrollbar">{plane.brand} {plane.model}</a>
                    ))}
                </div>
            )}
        </div>
    )
}