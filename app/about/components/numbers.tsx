

export default function Numbers() {

    return (
        <div className="flex flex-col gap-4 lg:gap-12 px-4 lg:px-16">
            <h2 className="uppercase font-bold text-2xl lg:text-4xl">JetFly in numbers</h2>
            <div className="flex flex-col gap-2 lg:gap-12">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-12">
                    <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                        <h3 className="text-4xl lg:text-6xl">520+</h3>
                        <p className="lg:text-xl">Clients</p>
                    </div>
                    <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                        <h3 className="text-4xl lg:text-6xl">10K+</h3>
                        <p className="lg:text-xl">Hours in sky</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-12">
                    <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                        <h3 className="text-4xl lg:text-6xl">9M</h3>
                        <p className="lg:text-xl">Kilometers flown</p>
                    </div>
                    <div className="w-full flex justify-between items-end py-4 border-b border-solid border-gray-400">
                        <h3 className="text-4xl lg:text-6xl">93%</h3>
                        <p className="lg:text-xl">Repeat Clients</p>
                    </div>
                </div>
            </div>
        </div>
    )
}