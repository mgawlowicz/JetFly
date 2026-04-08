"use client"
import { motion } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"

export default function Pros() {
    const pros = [
        {
            title: "Comfort",
            description: "We ensure comfort by offering the flexibility to position the aircraft to any airport within the continent, providing flexibility and luxury in travel."
        },
        {
            title: "Insurance",
            description: "We provide insurance for all flights, allowing our clients to travel worry-free and with complete peace of mind."
        },
        {
            title: "Services 24/7",
            description: "Our support team is available 24/7 to provide you with assistance and professional service at any moment of your journey."
        }
    ]

    return (
        <section className="section-standard" id="pros">
            <Container>
                <Grid className="gap-16 lg:gap-24">
                {pros.map((pro, index) => (
                    <motion.div 
                        key={pro.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-4 lg:col-span-4 flex flex-col gap-6 group mt-12 lg:mt-0"
                    >
                        <div className="flex flex-col gap-4">
                                <span className="subtitle-standard text-white/40">0{index + 1}</span>
                            <h3 className="text-xl lg:text-2xl font-light tracking-tight group-hover:text-neutral-400 transition-colors duration-300 uppercase">{pro.title}</h3>
                        </div>
                        <p className="description-standard">
                            {pro.description}
                        </p>
                        <div className="w-12 h-px bg-white/10 group-hover:w-full transition-all duration-700"></div>
                    </motion.div>
                ))}
                </Grid>
            </Container>
        </section>
    )
}