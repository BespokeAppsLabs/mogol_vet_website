"use client"

import { motion } from "framer-motion"

interface VisualSectionHeaderProps {
    number: string
    title: string
}

export function VisualSectionHeader({ number, title }: VisualSectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-2 mb-8"
        >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {number}
            </h2>
            <h3 className="text-4xl font-extrabold tracking-tight">
                {title}
            </h3>
        </motion.div>
    )
}
