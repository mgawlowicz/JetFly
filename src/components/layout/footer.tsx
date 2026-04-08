import Image from "next/image"
import Link from "next/link"
import { Container, Grid } from "@/components/layout/layout-system"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 pt-24 pb-12 border-t border-white/5">
      <Container>
        <Grid className="mb-16">
          
          <div className="col-span-4 md:col-span-4 lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex gap-3 items-center group w-fit">
              <div className="relative w-6 h-6">
                <Image src='/logo.png' fill sizes="24px" alt="JetFly-logo" className="object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tighter transition-opacity group-hover:opacity-80">JetFly</span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed font-extralight tracking-wide">
              Redefining luxury travel with precision, elegance, and unparalleled service. Your journey, perfected.
            </p>
          </div>

          
          <div className="col-span-2 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 font-bold">Services</h2>
            <Link href="/charter" className="text-sm text-neutral-400 hover:text-white transition-colors font-extralight tracking-wide">Charter</Link>
            <Link href="/fleet" className="text-sm text-neutral-400 hover:text-white transition-colors font-extralight tracking-wide">Fleet</Link>
          </div>

          
          <div className="col-span-2 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 font-bold">Company</h2>
            <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors font-extralight tracking-wide">About us</Link>
            <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors font-extralight tracking-wide">Contact</Link>
          </div>

          
          <div className="col-span-2 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 font-bold">Social</h2>
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors font-extralight tracking-wide">Instagram</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors font-extralight tracking-wide">LinkedIn</a>
          </div>

          
          <div className="col-span-4 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
             <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 font-bold">Contact</h2>
             <p className="text-sm text-neutral-400 font-extralight tracking-wide cursor-pointer hover:text-white transition-colors">concierge@jetfly.com</p>
          </div>
        </Grid>

        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-start items-start md:items-center gap-8 md:gap-16 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium pb-12">
          <p>© {currentYear} JetFly Luxury Private Flights</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}