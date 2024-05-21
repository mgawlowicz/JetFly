"use client";

import Link from "next/link";
import Image from "next/image";
import { Fade as Hamburger } from 'hamburger-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  open: {
    x: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren", // Ensures children animate after the parent
      staggerChildren: 0.15, // Adds a delay between the animations of each link
    },
  },
  closed: {
    x: "-100%",
    transition: {
      duration: 0.75,
    },
  },
};

const linkVariants = {
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

export default function Nav() {
  const [isOpen, setOpen] = useState(false);
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRouting = () => {
    setOpen(false);
  }

  return (
    <nav className={`px-4 py-4 flex justify-between items-center lg:px-16 lg:justify-start lg:gap-24 fixed z-10 w-full transition-colors duration-500 ${navBackground ? 'bg-neutral-950' : 'bg-transparent'}`}>
      <Link href="/" className="flex gap-2 items-center font-bold">
        <Image src='/logo.png' width={24} height={24} alt="JetFly-logo"></Image>
        <h1>JetFly</h1>
      </Link>
      <div className="block lg:hidden z-50">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <div className="hidden font-semibold lg:w-fit lg:flex lg:static lg:flex-row lg:gap-16 lg:bg-transparent lg:py-0">
        <Link href='/charter'>Charter</Link>
        <Link href='/fleet'>Our Fleet</Link>
        <Link href='/about'>About us</Link>
        <Link href='/contact'>Contact</Link>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-around py-16 font-semibold"
          >
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/charter" className="hover:text-gray-200">Charter</Link>
            </motion.div>
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/fleet" className="hover:text-gray-200">Our Fleet</Link>
            </motion.div>
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/about" className="hover:text-gray-200">About us</Link>
            </motion.div>
            <motion.div variants={linkVariants} onClick={handleRouting}>
              <Link href="/contact" className="hover:text-gray-200">Contact</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
