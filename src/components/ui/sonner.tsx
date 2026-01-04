"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#10b981]" />, // Emerald
        info: <InfoIcon className="size-4 text-[#0ea5e9]" />, // Sky
        warning: <TriangleAlertIcon className="size-4 text-[#f59e0b]" />, // Amber
        error: <OctagonXIcon className="size-4 text-[#ef4444]" />, // Rose
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group-[.toaster]:rounded-none group-[.toaster]:border-2 group-[.toaster]:shadow-none",
          success: "group-[.toaster]:border-[#10b981]",
          error: "group-[.toaster]:border-[#ef4444]",
          warning: "group-[.toaster]:border-[#f59e0b]",
          info: "group-[.toaster]:border-[#0ea5e9]",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "0px", // Strict tactical sharp edges
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
