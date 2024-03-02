

export default function Form(){

    return(
        <div className="flex flex-col lg:flex-row px-4 lg:px-16 gap-12">
            <div className="flex flex-col gap-2 w-full">
                <h3 className="uppercase font-bold text-2xl lg:text-4xl">Have questions?</h3>
                <p className="text-gray-400 lg:text-xl">JetFly's team is here with expertise at your service. Get in touch today for swift and professional assistance.</p>
            </div>
            <div className="flex flex-col gap-8 w-full">
                <label id="name" className="flex flex-col gap-2">
                    <p className="font-semibold">Full Name</p>
                    <input type="text" placeholder="John Smith" id="name" className="w-full py-2 bg-transparent outline-none border-b border-white border-solid"></input>
                </label>
                <label id="email">
                    <p className="font-semibold">Email</p>
                    <input type="text" placeholder="email@email.com" id="email" className="w-full py-2 bg-transparent outline-none border-b border-white border-solid"></input>
                </label>
                <label id="message">
                    <p className="font-semibold">Message</p>
                    <textarea id="message" placeholder="How we can help you?" className="w-full py-2 bg-transparent outline-none border-b border-white border-solid h-32 resize-none"></textarea>
                </label>
                <button className="border border-white border-solid py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out font-semibold">Send</button>
            </div>
        </div>
    )
}