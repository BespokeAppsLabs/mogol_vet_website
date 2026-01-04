"use client"

import { motion } from "framer-motion"
import { TacticalButton } from "../custom/TacticalButton"

export function DeploymentSection({ onTrigger }: { onTrigger: () => void }) {
    return (
        <section className="relative h-screen w-full bg-background flex items-center justify-center overflow-hidden text-foreground">
            {/* Background Radar Ripples */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2.5, opacity: [0, 0.1, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1.3,
                            ease: "easeOut"
                        }}
                        className="absolute w-screen aspect-square border-2 border-primary/20 rounded-full"
                    />
                ))}
            </div>

            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
            />

            <div className="relative z-10 text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="space-y-4"
                >
                    <div className="h-2 w-32 bg-primary mx-auto shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-foreground">
                        MISSION:<br />READY
                    </h2>
                </motion.div>

                <TacticalButton
                    size="lg"
                    onClick={onTrigger}
                    className="px-20 py-12 text-3xl animate-pulse shadow-[0_0_40px_rgba(var(--primary),0.2)]"
                >
                    INITIATE DEPLOYMENT
                </TacticalButton>
            </div>

            {/* Persistence Meta */}
            <div className="absolute bottom-12 w-full text-center px-12">
                <div className="max-w-md mx-auto flex justify-between items-center opacity-20 font-mono text-[8px] uppercase tracking-[0.3em] text-foreground">
                    <span>STATUS: DEPLOYMENT READY</span>
                    <span>UPLINK: SYNCED</span>
                    <span>VER: 4.0.2</span>
                </div>
            </div>
        </section>
    )
}
