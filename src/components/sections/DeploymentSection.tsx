"use client"

import { motion } from "framer-motion"
import { TacticalButton } from "../custom/TacticalButton"
import { MapPin, Phone, Mail, Clock, Shield, Activity, Zap } from "lucide-react"

export function DeploymentSection({ onTrigger }: { onTrigger: () => void }) {
    return (
        <section className="relative min-h-[60vh] md:h-screen w-full bg-background flex items-center justify-center overflow-hidden text-foreground py-20 md:py-0">
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

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

                {/* Left Wing - LOGISTICS */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="space-y-8 order-2 md:order-1"
                >
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-primary opacity-50 uppercase">
                            <MapPin className="h-3 w-3" /> HQ_LOCATION
                        </div>
                        <p className="text-sm font-mono leading-relaxed opacity-70">
                            Zebra & Nelson Mandela Rylaan,<br />
                            Onwerwacht, Lephalale
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-primary opacity-50 uppercase">
                            <Phone className="h-3 w-3" /> UPLINK_DIRECT
                        </div>
                        <p className="text-sm font-mono opacity-70">
                            014 763 2731<br />
                            073 214 8526
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-primary opacity-50 uppercase">
                            <Mail className="h-3 w-3" /> INTEL_COMMS
                        </div>
                        <p className="text-sm font-mono opacity-70">
                            mogoldiere@xsinet.co.za
                        </p>
                    </div>
                </motion.div>

                {/* Center Core - OPERATION */}
                <div className="text-center space-y-8 md:space-y-12 order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="space-y-4"
                    >
                        <div className="h-1 md:h-2 w-24 md:w-32 bg-primary mx-auto shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-foreground leading-[0.9]">
                            MISSION:<br />READY
                        </h2>
                    </motion.div>

                    <TacticalButton
                        size="lg"
                        onClick={onTrigger}
                        className="px-8 py-6 md:px-20 md:py-12 text-lg md:text-3xl animate-pulse shadow-[0_0_40px_rgba(var(--primary),0.2)] w-full md:w-auto"
                    >
                        INITIATE DEPLOYMENT
                    </TacticalButton>
                </div>

                {/* Right Wing - READINESS */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="space-y-8 text-left md:text-right order-3"
                >
                    <div className="space-y-2">
                        <div className="flex items-center md:justify-end gap-2 text-[10px] font-bold tracking-[0.3em] text-primary opacity-50 uppercase">
                            <Clock className="h-3 w-3" /> OPERATION_HOURS
                        </div>
                        <div className="text-sm font-mono space-y-1 opacity-70">
                            <p>MON-FRI: 08:00 - 10:00</p>
                            <p>MON-FRI: 16:00 - 17:30</p>
                            <p>SAT: 08:30 - 11:00</p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border/10">
                        <div className="flex items-center md:justify-end gap-4 opacity-40">
                            <Shield className="h-5 w-5" />
                            <Activity className="h-5 w-5" />
                            <Zap className="h-5 w-5" />
                        </div>
                        <p className="text-[8px] font-mono tracking-widest leading-loose opacity-30 uppercase">
                            DOMESTIC_READINESS // ACTIVE<br />
                            LIVESTOCK_SYSTEMS // OPTIMAL<br />
                            WILDLIFE_OPS // STANDBY
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Persistence Meta */}
            <div className="absolute bottom-6 md:bottom-12 w-full text-center px-6">
                <div className="max-w-4xl mx-auto space-y-2 opacity-60 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground">
                    <p>Professional veterinary and wildlife services. Emergency aerial response is subject to operational parameters and regional availability.</p>
                    <p>© 2026 MOGOL DIEREKLINIEK & WILDDIENSTE. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </section>
    )
}
