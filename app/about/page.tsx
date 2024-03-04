import Image from "next/image"
import Baner from "./components/baner"
import Pros from "./components/pros"
import About from "./components/about"
import Founder from "./components/founder"
import Numbers from "./components/numbers"
import Form from "@/components/Form/form"

export default function Home() {


    return (
        <main className="flex flex-col gap-20 lg:gap-36">
            <Baner/>
            <Pros/>
            <About/>
            <Founder/>
            <Numbers/>
            <Form />
        </main>
    )
}