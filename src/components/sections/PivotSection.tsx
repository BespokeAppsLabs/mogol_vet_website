"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { TacticalButton } from "../custom/TacticalButton"

export function PivotSection() {
    const [hoveredSide, setHoveredSide] = useState<"domestic" | "livestock" | "wild" | null>(null)

    return (
        <section className="relative h-screen w-full flex overflow-hidden bg-background">
            {/* Domestic Column */}
            <motion.div
                className="relative flex-1 border-r border-border/10 group cursor-pointer overflow-hidden transition-all duration-700"
                onMouseEnter={() => setHoveredSide("domestic")}
                onMouseLeave={() => setHoveredSide(null)}
                animate={{ flex: hoveredSide === "domestic" ? 2 : (hoveredSide === "wild" || hoveredSide === "livestock") ? 0.5 : 1 }}
            >
                {/* Abstract Background Content */}
                <div className="absolute inset-0 bg-muted/5 transition-colors duration-700 group-hover:bg-muted/10" />

                {/* Bento Gallery (Domestic) */}
                <AnimatePresence>
                    {hoveredSide === "domestic" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.3, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-12 pointer-events-none"
                        >
                            <div className="relative overflow-hidden border border-border/10 grayscale">
                                <Image src="/images/cat-eye-macro.png" alt="Care" fill className="object-cover" />
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale translate-y-8">
                                <Image src="/images/clinic-precision.png" alt="Clinical" fill className="object-cover" />
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale -translate-y-4">
                                <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                                    <div className="w-1/2 h-[1px] bg-primary/20" />
                                </div>
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale">
                                <Image src="/images/hero-helicopter.png" alt="Mission" fill className="object-cover" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative h-full flex flex-col items-center justify-center z-10 px-8 text-center">
                    <motion.div
                        animate={{ y: hoveredSide === "domestic" ? -20 : 0 }}
                        className="space-y-4"
                    >
                        <h3 className="text-3xl md:text-5xl font-black italic text-foreground uppercase tracking-tighter">DOMESTIC</h3>
                        <div className="h-1 w-20 bg-primary mx-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <TacticalButton variant="outline" className="mt-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-foreground hover:text-background">
                        ENTER CLINIC
                    </TacticalButton>
                </div>
            </motion.div>

            {/* Livestock Column */}
            <motion.div
                className="relative flex-1 border-r border-border/10 group cursor-pointer overflow-hidden transition-all duration-700"
                onMouseEnter={() => setHoveredSide("livestock")}
                onMouseLeave={() => setHoveredSide(null)}
                animate={{ flex: hoveredSide === "livestock" ? 2 : (hoveredSide === "wild" || hoveredSide === "domestic") ? 0.5 : 1 }}
            >
                {/* Background Texture Placeholder */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-5 transition-opacity duration-700">
                    <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
                </div>

                {/* Bento Gallery (Livestock) */}
                <AnimatePresence>
                    {hoveredSide === "livestock" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.3, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-12 pointer-events-none"
                        >
                            <div className="relative overflow-hidden border border-border/10 grayscale">
                                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center font-mono text-[8px] opacity-40">BRM-HERD-SCAN</div>
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale translate-y-4">
                                <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border border-primary/20" />
                                </div>
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale -translate-x-4">
                                <div className="absolute inset-0 bg-primary/10" />
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-[1px] bg-primary/30 rotate-12" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative h-full flex flex-col items-center justify-center z-10 px-8 text-center">
                    <motion.div
                        animate={{ y: hoveredSide === "livestock" ? -20 : 0 }}
                        className="space-y-4"
                    >
                        <h3 className="text-3xl md:text-5xl font-black italic text-foreground uppercase tracking-tighter">LIVESTOCK</h3>
                        <div className="h-1 w-20 bg-primary mx-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <TacticalButton variant="secondary" className="mt-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-foreground hover:text-background">
                        MANAGE HERD
                    </TacticalButton>
                </div>
            </motion.div>

            {/* Wild Column */}
            <motion.div
                className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700"
                onMouseEnter={() => setHoveredSide("wild")}
                onMouseLeave={() => setHoveredSide(null)}
                animate={{ flex: hoveredSide === "wild" ? 2 : (hoveredSide === "domestic" || hoveredSide === "livestock") ? 0.5 : 1 }}
            >
                {/* Background Image / Texture */}
                <div className="absolute inset-0 opacity-40 group-hover:opacity-20 grayscale transition-opacity duration-700">
                    <Image
                        src="/images/rhino-skin.png"
                        alt="Wild Perspective"
                        fill
                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                    />
                </div>

                {/* Bento Gallery (Wild) */}
                <AnimatePresence>
                    {hoveredSide === "wild" && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 0.4, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-12 pointer-events-none"
                        >
                            <div className="relative overflow-hidden border border-border/10 grayscale">
                                <Image src="/images/leopard-fur.png" alt="Wild" fill className="object-cover" />
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale translate-y-4">
                                <Image src="/images/rhino-skin.png" alt="Texture" fill className="object-cover" />
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale translate-x-4">
                                <Image src="/images/bush-deployment.png" alt="Action" fill className="object-cover" />
                            </div>
                            <div className="relative overflow-hidden border border-border/10 grayscale -translate-y-4">
                                <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                                    <div className="w-12 h-12 border border-primary/20 rotate-45" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative h-full flex flex-col items-center justify-center z-10 px-8 text-center">
                    <motion.div
                        animate={{ y: hoveredSide === "wild" ? -20 : 0 }}
                        className="space-y-4"
                    >
                        <h3 className="text-3xl md:text-5xl font-black italic text-foreground uppercase tracking-tighter">WILDLIFE</h3>
                        <div className="h-1 w-20 bg-primary mx-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <TacticalButton variant="default" className="mt-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-foreground hover:text-background">
                        DEPLOY MISSION
                    </TacticalButton>
                </div>
            </motion.div>
        </section>
    )
}
