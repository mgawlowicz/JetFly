import Image from "next/image"

export default function Quote() {

    return (
        <div className="flex flex-col gap-8 px-4 lg:px-16">
            <h3 className="uppercase font-bold text-2xl lg:text-4xl">Request a quote</h3>
            <div className="w-full lg:w-1/3 flex justify-between">
                <button className="w-full py-2 justify-center bg-white text-black font-semibold">One way</button>
                <button className="w-full py-2 justify-center border border-solid border-white font-semibold">Round trip</button>
                <button className="w-full py-2 justify-center border border-solid border-white font-semibold">On hours</button>
            </div>
            <div className="w-full flex flex-col gap-8 lg:flex-row">
                <div className="w-full flex-col gap-2">
                    <label id="from" className="font-semibold">Departure Airport</label>
                    <select id="from" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white">
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                    </select>
                </div>
                <div className="w-full flex-col gap-2">
                    <label id="to" className="font-semibold">Arrival Airport</label>
                    <select id="to" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white">
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                    </select>
                </div>
                <div className="w-full flex-col gap-2">
                    <label id="jet" className="font-semibold">Jet</label>
                    <select id="jet" className="w-full py-2 bg-transparent outline-none border-b border-solid border-white">
                        <option value="G550">Gulfstream G550</option>
                        <option value="JFK">JFK</option>
                        <option value="JFK">JFK</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-end">
                <div className="flex gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Passengers</p>
                        <Image src={"/armchair.png"} width={24} height={24} alt="armchair-icon" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Date</p>
                        <input type="datetime-local" className="bg-transparent"></input>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-8 lg:justify-end lg:items-center">
                    <h4 className="text-xl font-semibold">Estimated cost $6563</h4>
                    <button className="w-full lg:w-1/3 py-2 flex justify-center border border-solid border-white font-semibold hover:bg-white hover:text-black transition duration-300 ease-in-out">Book</button>
                </div>
            </div>
        </div>
    )
}