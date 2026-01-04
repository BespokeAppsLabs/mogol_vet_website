"use client"

import { motion } from "framer-motion"

export function GrainOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full overflow-hidden opacity-[0.035]">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
            <motion.div
                animate={{
                    x: [0, -10, 10, -5, 5, 0],
                    y: [0, 5, -5, 10, -10, 0],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-[-100%] h-[300%] w-[300%] bg-transparent"
            />
        </div>
    )
}
