"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatDisplayProps {
    label: string
    value: string | number
    unit?: string
    icon: LucideIcon
    className?: string
}

function AnimatedNumber({ value }: { value: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const spring = useSpring(0, { stiffness: 40, damping: 20 })
    const displayValue = useTransform(spring, (current) => Math.floor(current))
    const [currentDisplay, setCurrentDisplay] = useState(0)

    useEffect(() => {
        if (inView) {
            spring.set(value)
        }
    }, [inView, value, spring])

    useEffect(() => {
        return displayValue.onChange((v) => setCurrentDisplay(v))
    }, [displayValue])

    return <span ref={ref}>{currentDisplay}</span>
}

export function StatDisplay({ label, value, unit, icon: Icon, className }: StatDisplayProps) {
    const isNumeric = !isNaN(Number(value))
    const numericValue = isNumeric ? Number(value) : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "border-2 border-border p-6 flex flex-col justify-between hover:bg-primary hover:text-primary-foreground transition-all duration-500 group relative overflow-hidden h-full",
                className
            )}
        >
            <div className="flex items-center justify-between relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 italic">
                    {label}
                </p>
                <Icon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline gap-1 mt-4 relative z-10">
                <span className="text-5xl font-black italic tracking-tighter">
                    {isNumeric ? <AnimatedNumber value={numericValue} /> : value}
                </span>
                {unit && <span className="text-xs font-bold uppercase tracking-wider">{unit}</span>}
            </div>

            {/* Decorative tactical line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary-foreground/30 group-hover:w-full transition-all duration-700" />
        </motion.div>
    )
}
