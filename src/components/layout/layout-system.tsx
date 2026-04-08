import { cn } from "@/lib/utils"
import React from "react"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: LayoutProps) => (
  <div className={cn("mx-auto w-full max-w-[1920px] px-6 md:px-8 lg:px-16", className)}>
    {children}
  </div>
)

export const Grid = ({ children, className }: LayoutProps) => (
  <div className={cn("grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-12 lg:gap-y-0", className)}>
    {children}
  </div>
)
