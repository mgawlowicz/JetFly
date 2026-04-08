
"use client"
import { motion } from "framer-motion"
import { Container, Grid } from "@/components/layout/layout-system"
import { Button, Input, Textarea, FormLabel } from "@/components/ui"

export default function Form() {

  return (
    <section className="section-standard">
      <Container>
        <Grid className="items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col gap-10"
          >
            <div className="space-y-8 lg:space-y-12">
              <span className="subtitle-standard">Inquiry</span>
              <h2 className="h2-standard">
                Have <br /> <span className="text-white italic">questions?</span>
              </h2>
            </div>
            <p className="description-standard max-w-lg text-left mt-8 lg:mt-12">
              JetFly team is here with expertise at your service. Get in touch today for swift and professional assistance. Our concierge is available 24/7.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="col-span-4 md:col-span-8 lg:col-span-6"
          >
            <form className="flex flex-col gap-16 p-8 lg:p-16 bg-white/[0.02] border border-white/[0.05] rounded-sm backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  <label className="flex flex-col gap-6 group">
                      <FormLabel className="group-focus-within:text-white transition-colors duration-500">Full Name</FormLabel>
                      <Input type="text" placeholder="ALEXANDER VANCE" />
                  </label>
                  <label className="flex flex-col gap-6 group">
                      <FormLabel className="group-focus-within:text-white transition-colors duration-500">Email Address</FormLabel>
                      <Input type="email" placeholder="ALEX@VANCE.COM" />
                  </label>
              </div>
              
              <label className="flex flex-col gap-6 group">
                  <FormLabel className="group-focus-within:text-white transition-colors duration-500">Message</FormLabel>
                  <Textarea placeholder="HOW CAN OUR CONCIERGE ASSIST YOU TODAY?" />
              </label>
              
              <div className="flex justify-end pt-4">
                  <Button type="submit" variant="secondary">
                      <span className="z-10">Send Request</span>
                      <span className="text-xl font-thin transform transition-transform duration-700 group-hover:translate-x-3 z-10">→</span>
                  </Button>
              </div>
            </form>
          </motion.div>
        </Grid>
      </Container>
    </section>
  )
}