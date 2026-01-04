"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TacticalCardProps {
    title: string
    description?: string
    children?: React.ReactNode
    className?: string
    footer?: React.ReactNode
    badge?: React.ReactNode
    idTag?: string
}

export function TacticalCard({
    title,
    description,
    children,
    className,
    footer,
    badge,
    idTag,
}: TacticalCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4, x: -4 }}
            className="group h-full"
        >
            <Card
                className={cn(
                    "rounded-none border-2 border-border overflow-hidden bg-card transition-all duration-300 shadow-tactical group-hover:shadow-tactical-hover h-full flex flex-col",
                    className
                )}
            >
                <CardHeader className="space-y-4 p-8">
                    <div className="flex justify-between items-start">
                        {badge}
                        {idTag && <span className="font-mono text-xs opacity-50 uppercase tracking-tighter">{idTag}</span>}
                    </div>
                    <CardTitle className="text-3xl font-black italic uppercase leading-none tracking-tighter">
                        {title}
                    </CardTitle>
                    {description && (
                        <CardDescription className="text-lg leading-relaxed text-foreground/80">
                            {description}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="p-8 pt-0 flex-grow">
                    {children}
                </CardContent>
                {footer && (
                    <div className="p-8 pt-0 mt-auto">
                        {footer}
                    </div>
                )}
            </Card>
        </motion.div>
    )
}
