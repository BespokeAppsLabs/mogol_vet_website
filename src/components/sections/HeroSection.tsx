"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TacticalButton } from "../custom/TacticalButton"

export function HeroSection({ onTrigger }: { onTrigger: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Parallax transforms
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-center">
            {/* Background Layer 1: The Far Horizon */}
            <motion.div style={{ y: y1, scale }} className="absolute inset-0 opacity-40">
                <Image
                    src="/images/hero-helicopter.png"
                    alt="Mogol Mission Vista"
                    fill
                    className="object-cover grayscale blur-[2px]"
                    priority
                />
            </motion.div>

            {/* Gradient Mask for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />

            {/* Content Container */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center space-y-12"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex flex-col items-center max-w-4xl mx-auto">
                        <motion.span
                            initial={{ letterSpacing: "0.2em", opacity: 0 }}
                            animate={{ letterSpacing: "1em", opacity: 1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="text-[10px] font-black uppercase text-primary mb-6"
                        >
                            GUARDYANS OF THE BUSHVELD
                        </motion.span>
                        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter text-foreground drop-shadow-2xl leading-none">
                            MOGOL
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-lg md:text-xl font-bold uppercase italic tracking-tighter text-foreground/60 mt-4 max-w-2xl"
                        >
                            Guardians of the Bushveld. Eliminating "Dead Time" in Veterinary Care.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <TacticalButton
                        size="lg"
                        onClick={onTrigger}
                        className="px-16 py-10 text-2xl animate-pulse shadow-[0_0_40px_rgba(var(--primary),0.2)]"
                    >
                        INITIATE DEPLOYMENT
                    </TacticalButton>
                </motion.div>
            </motion.div>

            {/* Scanning HUD elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-12 left-12 h-20 w-20 border-l-2 border-t-2 border-primary/30" />
                <div className="absolute top-12 right-12 h-20 w-20 border-r-2 border-t-2 border-primary/30" />
                <div className="absolute bottom-12 left-12 h-20 w-20 border-l-2 border-b-2 border-primary/30" />
                <div className="absolute bottom-12 right-12 h-20 w-20 border-r-2 border-b-2 border-primary/30" />
            </div>

            {/* Tactical Meta */}
            <div className="absolute bottom-12 left-24 font-mono text-[10px] text-foreground/40 space-y-1 hidden md:block">
                <div className="flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary animate-pulse" />
                    <p>COORD: 23.6823° S, 27.7303° E</p>
                </div>
                <p>STATUS: OPTIMAL</p>
                <p>UNIT: AURELIUS-01</p>
            </div>
        </section>
    )
}
