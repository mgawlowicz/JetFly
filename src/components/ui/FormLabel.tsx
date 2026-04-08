import { cn } from "@/lib/utils"
import React from "react"

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function FormLabel({ className, children, ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        "text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-extralight block",
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
