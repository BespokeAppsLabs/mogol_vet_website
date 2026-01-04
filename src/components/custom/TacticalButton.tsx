"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { Button, type buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const MotionButton = motion(Button)

interface TacticalButtonProps extends
    Omit<HTMLMotionProps<"button">, "ref" | "style" | "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "onSelect"> {
    variant?: VariantProps<typeof buttonVariants>["variant"]
    size?: VariantProps<typeof buttonVariants>["size"]
    className?: string
    children: React.ReactNode
}

export function TacticalButton({
    className,
    variant = "default",
    size = "lg",
    children,
    ...props
}: TacticalButtonProps) {
    return (
        <MotionButton
            variant={variant}
            size={size}
            className={cn(
                "rounded-none font-bold uppercase tracking-widest border-2 transition-all duration-300",
                variant === "default" && "border-primary hover:bg-transparent hover:text-primary",
                variant === "secondary" && "border-secondary hover:bg-transparent hover:text-secondary",
                variant === "outline" && "border-border hover:bg-primary hover:text-primary-foreground",
                className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...(props as any)}
        >
            {children}
        </MotionButton>
    )
}
