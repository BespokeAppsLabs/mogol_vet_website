"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { TacticalCard } from "../custom/TacticalCard"
import { StatDisplay } from "../custom/StatDisplay"
import { Activity, Clock, CheckCircle, Map, Target, Zap, Shield } from "lucide-react"

export function VaultSection() {
    return (
        <section className="relative min-h-screen w-full bg-background py-20 md:py-32 px-4 md:px-12 lg:px-24 overflow-hidden text-foreground">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 relative z-10">
                {/* Header HUD */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-border/10 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-4 w-4 bg-primary" />
                            <span className="text-[12px] font-black tracking-[0.5em] text-foreground/40 uppercase">DATA // ARCHIVE</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-foreground">THE VAULT</h2>
                    </div>
                    <div className="flex gap-12 font-mono text-[10px] text-foreground/30 hidden md:flex">
                        <div>
                            <p>ENCRYPTION: AES-256</p>
                            <p>UPLINK: ACTIVE</p>
                        </div>
                        <div>
                            <p>STORAGE: 14.2 TB</p>
                            <p>LAST SYNC: 2m AGO</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Main Tactical Map Card (8 cols) */}
                    <div className="md:col-span-8 relative aspect-video overflow-hidden border-2 border-border/10 bg-muted/5 group hover:border-primary/30 transition-colors">
                        <Image
                            src="/images/tactical-topo.png"
                            alt="Topographic Intel"
                            fill
                            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                        {/* Internal Scan Line for this card */}
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: "200%" }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.5)] z-20"
                        />

                        <div className="absolute bottom-8 left-8 space-y-2">
                            <div className="flex items-center gap-3">
                                <Target className="h-4 w-4 text-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-foreground tracking-widest uppercase">SCANNING AREA // ALPHA</span>
                            </div>
                            <div className="h-[2px] w-48 bg-foreground/10" />
                        </div>
                    </div>

                    {/* Stats Column (4 cols) */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <StatDisplay label="MISSIONS ACTIVE" value="14" unit="UNITS" icon={Activity} />
                        <StatDisplay label="RESPONSE TIME" value="12" unit="MIN" icon={Clock} />
                        <StatDisplay label="SUCCESS RATE" value="99.8" unit="%" icon={CheckCircle} />
                    </div>
                </div>

                {/* Tactical Footer Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <MiniTacticalCard icon={Zap} label="POWER" value="OPTIMAL" />
                    <MiniTacticalCard icon={Shield} label="SECURITY" value="HIGH" />
                    <MiniTacticalCard icon={Map} label="COVERAGE" value="14.2k km²" />
                    <MiniTacticalCard icon={Target} label="PRECISION" value="0.5m" />
                </div>
            </div>
        </section>
    )
}

function MiniTacticalCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="p-8 border border-border/10 bg-muted/5 hover:border-border/40 transition-all group">
            <Icon className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors mb-4" />
            <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-xl font-black italic text-foreground uppercase tracking-tighter">{value}</p>
        </div>
    )
}
