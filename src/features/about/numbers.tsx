"use client"
import { motion } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"

export default function Numbers() {
    const numbers = [
        { value: "520+", label: "Clients" },
        { value: "10K+", label: "Hours in sky" },
        { value: "9M", label: "Kilometers flown" },
        { value: "93%", label: "Repeat Clients" }
    ]

    return (
        <section className="section-standard" id="numbers">
            <Container>
                <div className="flex flex-col gap-16 lg:gap-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-4"
                    >
                        <span className="subtitle-standard">Statistics</span>
                        <h2 className="h2-standard">
                            JetFly in <br /> 
                            <span className="text-white italic">numbers</span>
                        </h2>
                    </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-0">
                    {numbers.map((item, index) => (
                        <motion.div 
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex justify-between items-end py-10 lg:py-16 border-b border-white/10 group hover:border-white/30 transition-colors duration-300"
                        >
                            <h3 className="text-5xl lg:text-8xl font-light tracking-tighter group-hover:text-white transition-colors duration-500">{item.value}</h3>
                            <p className="text-[10px] lg:text-xs uppercase tracking-[0.4em] text-neutral-400 mb-2 lg:mb-4">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
          </Container>
        </section>
    );
}