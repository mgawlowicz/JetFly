"use client";

import Link from "next/link";
import Image from "next/image";
import { Fade as Hamburger } from 'hamburger-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container, Grid } from "@/components/layout/layout-system"
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { LoginModal } from "@/components/auth/login-modal";
const menuVariants: Variants = {
  open: {
    x: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      duration: 0.75,
    },
  },
};

const linkVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  closed: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Nav({ session }: { session: Session | null }) {
  const [isOpen, setOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setNavBackground(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRouting = () => {
    setOpen(false);
  }

  return (
    <>
      <nav className={cn(
        "fixed top-0 z-50 w-full transition-all duration-700 py-5",
        (navBackground || isOpen) ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent border-b border-white/0"
      )}>
        <Container>
        <Grid className="items-center">
          
          <div className="col-span-2 lg:col-span-3">
            <Link href="/" className="flex gap-3 items-center group">
              <div className="relative w-6 h-6 transition-transform duration-500 group-hover:rotate-12">
                <Image src='/logo.png' fill alt="JetFly-logo" className="object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tighter transition-opacity group-hover:opacity-80">JetFly</span>
            </Link>
          </div>

          
          <div className="hidden lg:flex lg:col-span-6 justify-center gap-12">
            <Link href='/charter' className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300 relative group">
              Charter
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href='/fleet' className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300 relative group">
              Fleet
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href='/about' className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href='/contact' className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          
          <div className="col-span-2 lg:col-span-3 flex justify-end items-center gap-6">
            
            
            <Link href="/charter" className="hidden lg:flex px-6 xl:px-8 py-2.5 bg-white text-black border border-white font-medium uppercase tracking-[0.15em] text-[10px] xl:text-xs transition-all duration-500 hover:bg-white/10 hover:text-white active:scale-95">
              Charter jet
            </Link>

            <div className="hidden lg:block w-px h-6 bg-white/10"></div>
            
            
            {session?.user ? (
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-white font-medium">{session.user.name?.split(' ')[0]}</span>
                  <button onClick={() => signOut()} className="text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors relative group">
                    Logout
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name || "Avatar"} width={38} height={38} className="rounded-full border border-white/10 shadow-sm" />
                ) : (
                  <div className="w-[38px] h-[38px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-xs text-white">{session.user.name?.[0]}</span>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setLoginOpen(true)} 
                className="hidden lg:flex text-[11px] uppercase tracking-[0.15em] font-medium text-white/80 hover:text-white transition-all duration-300 relative group"
              >
                Sign In
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}

            
            <div className="lg:hidden relative z-[60]">
              <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
            </div>
          </div>        </Grid>
      </Container>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 w-full h-screen bg-neutral-950 flex flex-col items-center justify-center gap-16 z-40 overflow-hidden"
          >
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/charter" className="text-4xl md:text-5xl lg:text-7xl font-extralight uppercase tracking-tighter hover:text-white transition-colors duration-300 transition-all italic">Charter</Link>
            </motion.div>
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/fleet" className="text-4xl md:text-5xl lg:text-7xl font-extralight uppercase tracking-tighter hover:text-white transition-colors duration-300 transition-all">Fleet</Link>
            </motion.div>
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/about" className="text-4xl md:text-5xl lg:text-7xl font-extralight uppercase tracking-tighter hover:text-white transition-colors duration-300 transition-all italic">About</Link>
            </motion.div>
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/contact" className="text-4xl md:text-5xl lg:text-7xl font-extralight uppercase tracking-tighter hover:text-white transition-colors duration-300 transition-all">Contact</Link>
            </motion.div>
            
            
            <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] bg-white/[0.02] rounded-full blur-[100px] -z-10"></div>
            <div className="absolute -top-24 -left-24 w-[30rem] h-[30rem] bg-white/[0.02] rounded-full blur-[100px] -z-10"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    
    <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
