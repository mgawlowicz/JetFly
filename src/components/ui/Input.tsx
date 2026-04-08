import { cn } from "@/lib/utils"
import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full py-4 bg-transparent outline-none border-b border-white/10 focus:border-white transition-all duration-700 text-sm tracking-[0.2em] placeholder:text-neutral-700 font-light",
        className
      )}
      {...props}
    />
  )
}
