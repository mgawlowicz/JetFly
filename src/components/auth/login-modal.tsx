"use client";

import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#050505] p-10 md:p-14 overflow-hidden border border-white/5 rounded-sm"
          >
            
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col mb-12 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight mb-4">Authentication</span>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-tighter text-white mb-2 leading-none">
                Access your <br />
                <span className="text-white italic">private account</span>
              </h2>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Email Address *</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 bg-transparent outline-none border-b border-white/10 focus:border-white transition-all duration-300 text-lg font-light placeholder:text-neutral-700" 
                  placeholder="name@example.com" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block">Password *</label>
                  <button className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-colors">Forgot?</button>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-4 bg-transparent outline-none border-b border-white/10 focus:border-white transition-all duration-300 text-lg font-light placeholder:text-neutral-700" 
                  placeholder="••••••••" 
                />
              </div>
              
              <button 
                disabled
                className="group relative w-full h-[56px] flex items-center justify-center bg-white text-black font-bold uppercase tracking-[0.15em] text-[10px] transition-all duration-500 overflow-hidden text-center whitespace-nowrap opacity-30 cursor-not-allowed mt-8"
              >
                <span className="relative z-10">Sign In</span>
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-extralight">Or seamlessly</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <button 
                onClick={() => signIn('google')}
                className="group relative w-full h-[56px] flex items-center justify-center bg-transparent border border-white/10 hover:border-white/40 text-white font-medium uppercase tracking-[0.15em] text-[10px] transition-all duration-500 hover:bg-white/5 gap-4"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="relative z-10 text-neutral-400 group-hover:text-white transition-colors">Continue with Google</span>
              </button>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-white transition-colors z-20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
