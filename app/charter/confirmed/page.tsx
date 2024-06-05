import Link from 'next/link'

export default function Home(){

    return(
        <main className='relative'>
            <video autoPlay loop muted className='brightness-75 lg:brightness-50 p-4 lg:p-0 pt-36 lg:pt-0'>
                <source src='/confirmation-video.mp4' type="video/mp4"></source>
                Your browser does not support the video tag.
            </video>
            <div className="flex flex-col gap-8 items-center px-4 pt-4 lg:pt-72 lg:px-12 lg:absolute top-0 text-center">
                <h2 className="text-4xl lg:text-6xl font-bold">Thank you for your trust!</h2>
                <h5 className="lg:w-1/2">One of our consultants will call you within the next hour to confirm your booking and discuss the details. We appreciate your trust in our private jet rental service and look forward to providing you with an exceptional travel experience.</h5>
                <Link href='/' className="border border-white border-solid px-4 py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out font-semibold">Back to Home Page</Link>
            </div>
        </main>
    )
}