import { useState } from "react"

interface Plane {
    brand: string;
    model: string;
    slug: string;
}

interface Props {
    planes: Plane[];
    setJetSlug: (value: string) => void;
    jet: string;
    setJet: (value: string) => void;
    jetSlug: string;
}

export default function JetInput({ planes, setJetSlug, jet, setJet, jetSlug }: Props) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const exactMatch = planes.some(p => `${p.brand} ${p.model}` === jet);
    const suggestions = exactMatch || jet === '' ? planes : planes.filter(plane => plane.model.toLowerCase().includes(jet.toLowerCase()) || plane.brand.toLowerCase().includes(jet.toLowerCase()));

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    return (
        <div className="relative group">
            <input
                type="text"
                placeholder="Select Aircraft"
                value={jet}
                className="w-full py-4 bg-transparent outline-none border-b border-white/10 focus:border-white transition-all duration-500 text-lg font-light placeholder:text-white/20"
                onChange={(e) => setJet(e.target.value)}
                onFocus={(e) => {
                    setShowSuggestions(true);
                    e.target.select();
                }}
                onBlur={handleInputBlur}
            />
            <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-700 group-focus-within:w-full" />
            
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 flex flex-col p-2 z-50 rounded-sm shadow-2xl max-h-64 overflow-y-auto no-scrollbar">
                    {suggestions.map((plane, index) => (
                        <button 
                            key={index} 
                            onClick={() => { setJet(`${plane.brand} ${plane.model}`); setJetSlug(plane.slug); setShowSuggestions(false) }} 
                            className="text-left py-3 px-4 hover:bg-white/5 rounded-sm transition-colors text-sm font-light tracking-wide text-neutral-400 hover:text-white"
                        >
                            <span className="text-[10px] uppercase tracking-widest text-neutral-400 block">{plane.brand}</span>
                            {plane.model}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
