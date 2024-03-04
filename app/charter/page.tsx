import Baner from "./components/baner"
import Quote from "./components/quote"
import Fleet from "./components/fleet"
import Form from "@/components/Form/form"


export default function Home() {

    return (
        <main className="flex flex-col gap-20 lg:gap-36">
            <Baner />
            <Quote />
            <Fleet />
            <Form />
        </main>
    )
}

