import { cn } from "@/lib/utils"
import React from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full py-4 bg-transparent outline-none border-b border-white/10 focus:border-white h-40 resize-none transition-all duration-700 text-sm tracking-[0.2em] placeholder:text-neutral-700 font-light",
        className
      )}
      {...props}
    />
  )
}
