import { cn } from "@/lib/utils"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-4 font-bold uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden active:scale-95",
        
        variant === "primary" &&
          "border border-white bg-transparent text-white hover:bg-white hover:text-black",
        variant === "secondary" &&
          "border border-white/10 bg-transparent text-white hover:border-white hover:bg-white hover:text-black",
        variant === "ghost" &&
          "border border-transparent bg-transparent text-neutral-400 hover:text-white",
        
        size === "sm" && "px-6 py-3 text-[9px]",
        size === "md" && "px-10 py-4 text-[10px]",
        size === "lg" && "px-16 py-6 text-[10px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
