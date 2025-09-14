"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-white/10 backdrop-blur-sm">
      <SliderPrimitive.Range 
        className="absolute h-full rounded-full" 
        style={{
          background: 'linear-gradient(90deg, #7C3AED, #EC4899, #3B82F6)',
          boxShadow: '0 0 15px rgba(124, 58, 237, 0.6), 0 0 30px rgba(236, 72, 153, 0.4)'
        }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className="block h-6 w-6 rounded-full border-2 bg-white ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 active:scale-95" 
      style={{
        borderColor: '#7C3AED',
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.8), 0 0 40px rgba(236, 72, 153, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
      }}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
