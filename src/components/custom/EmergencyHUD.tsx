"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TacticalButton } from "./TacticalButton"
import { MapPin, Target, Zap, Shield, X, ArrowRight, CheckCircle, Activity, Helicopter, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = "G-LOC" | "TARGET" | "UPLINK" | "OPERATIVE" | "CONFIRMATION"

export function EmergencyHUD({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [step, setStep] = React.useState<Step>("G-LOC")
    const [formData, setFormData] = React.useState({
        location: "",
        species: "",
        condition: "",
        urgency: "",
        phone: "",
        email: ""
    })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />

            {/* HUD Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-6xl min-h-[70vh] md:min-h-[80vh] bg-background border-2 border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)] overflow-hidden flex flex-col"
            >
                {/* Header HUD */}
                <div className="flex items-center justify-between p-8 border-b-2 border-primary/10">
                    <div className="flex items-center gap-6">
                        <div className="h-8 w-1 bg-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black tracking-[0.4em] text-primary/60 uppercase">OPERATIONAL // DEPLOYMENT</span>
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter">MISSION INTAKE</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-12 font-mono text-[10px] text-foreground/40">
                        <div className="hidden md:block">
                            <p>ENCRYPTION: AES-X</p>
                            <p>SIGNAL: OPTIMAL</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-primary/10 transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Main HUD Body */}
                <div className="flex-1 flex">
                    {/* Sidebar HUD Stats */}
                    <div className="w-1/4 border-r-2 border-primary/10 p-8 hidden lg:flex flex-col justify-between">
                        <div className="space-y-8">
                            {[
                                { icon: MapPin, label: "POSITION", value: step === "G-LOC" ? "IDENTIFYING..." : formData.location || "SET" },
                                { icon: Target, label: "TARGET", value: step === "TARGET" ? "SCANNING..." : formData.species || "PENDING" },
                                { icon: Zap, label: "RESPONSE", value: formData.urgency || "WAITING" },
                                { icon: Shield, label: "OPERATIVE", value: formData.phone ? "IDENTIFIED" : "REQUIRED" }
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <div className="flex items-center gap-2 text-primary/40">
                                        <stat.icon size={12} />
                                        <span className="text-[10px] font-black tracking-widest uppercase">{stat.label}</span>
                                    </div>
                                    <p className="text-sm font-black italic uppercase tracking-tight">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-primary/10">
                            <div className="h-12 w-full bg-primary/5 flex items-center justify-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">LIVE FEED ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 flex flex-col p-8 md:p-12 relative overflow-y-auto bg-muted/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1 flex flex-col"
                            >
                                {step === "G-LOC" && (
                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <span className="text-primary text-[12px] font-black tracking-widest">STEP 01</span>
                                            <h3 className="text-5xl font-black italic uppercase tracking-tighter">GEOGRAPHIC LOCK</h3>
                                        </div>

                                        <div className="relative group">
                                            <input
                                                autoFocus
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="ENTER SECTOR OR FARM NAME"
                                                className="w-full bg-transparent border-b-2 border-primary/20 py-4 text-3xl font-black italic uppercase tracking-tighter focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                                            />
                                            <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <TacticalButton
                                                onClick={() => setStep("TARGET")}
                                                disabled={!formData.location}
                                                className="w-full py-8 text-xl"
                                            >
                                                SECURE LOCATION <ArrowRight className="ml-2" />
                                            </TacticalButton>
                                        </div>
                                    </div>
                                )}

                                {step === "TARGET" && (
                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <span className="text-primary text-[12px] font-black tracking-widest">STEP 02</span>
                                            <h3 className="text-5xl font-black italic uppercase tracking-tighter">TARGET IDENTIFICATION</h3>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                            {["Rhino", "Leopard", "Lion", "Buffalo", "Elephant", "Other"].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setFormData({ ...formData, species: s })}
                                                    className={cn(
                                                        "p-8 border-2 transition-all text-left group",
                                                        formData.species === s ? "border-primary bg-primary/10" : "border-primary/10 hover:border-primary/40 bg-muted/20"
                                                    )}
                                                >
                                                    <span className={cn(
                                                        "text-xs font-black uppercase tracking-widest mb-2 block",
                                                        formData.species === s ? "text-primary" : "text-foreground/40"
                                                    )}>SPECIES</span>
                                                    <span className="text-2xl font-black italic uppercase tracking-tighter group-hover:translate-x-1 transition-transform inline-block">{s}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex gap-4">
                                            <TacticalButton variant="outline" onClick={() => setStep("G-LOC")}>BACK</TacticalButton>
                                            <TacticalButton
                                                onClick={() => setStep("UPLINK")}
                                                disabled={!formData.species}
                                                className="flex-1 py-8 text-xl"
                                            >
                                                LOCK TARGET <ArrowRight className="ml-2" />
                                            </TacticalButton>
                                        </div>
                                    </div>
                                )}

                                {step === "UPLINK" && (
                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <span className="text-primary text-[12px] font-black tracking-widest">STEP 03</span>
                                            <h3 className="text-5xl font-black italic uppercase tracking-tighter">UPLINK RESPONSE</h3>
                                        </div>

                                        <div className="space-y-6">
                                            {[
                                                { id: "IMMEDIATE", label: "HELI-OPS DEPLOYMENT", time: "15-30 MIN", icon: Helicopter, color: "text-red-500" },
                                                { id: "PRIORITY", label: "TACTICAL GROUND UNIT", time: "2-4 HOURS", icon: Activity, color: "text-primary" },
                                            ].map((u) => (
                                                <button
                                                    key={u.id}
                                                    onClick={() => setFormData({ ...formData, urgency: u.id })}
                                                    className={cn(
                                                        "w-full p-8 border-2 transition-all text-left flex items-center justify-between group",
                                                        formData.urgency === u.id ? "border-primary bg-primary/10" : "border-primary/10 hover:border-primary/40 bg-muted/20"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <u.icon className={cn("h-10 w-10", formData.urgency === u.id ? "text-primary" : "text-foreground/20")} />
                                                        <div>
                                                            <span className="text-2xl font-black italic uppercase tracking-tighter block">{u.label}</span>
                                                            <span className="text-[10px] font-black tracking-widest uppercase text-foreground/40">ETA: {u.time}</span>
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "h-6 w-6 border-2 flex items-center justify-center",
                                                        formData.urgency === u.id ? "border-primary" : "border-primary/20"
                                                    )}>
                                                        {formData.urgency === u.id && <div className="h-3 w-3 bg-primary" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex gap-4">
                                            <TacticalButton variant="outline" onClick={() => setStep("TARGET")}>BACK</TacticalButton>
                                            <TacticalButton
                                                onClick={() => setStep("OPERATIVE")}
                                                disabled={!formData.urgency}
                                                className="flex-1 py-10 text-2xl animate-pulse shadow-[0_0_30px_rgba(var(--primary),0.2)]"
                                            >
                                                SECURE RESPONSE <ArrowRight className="ml-2" />
                                            </TacticalButton>
                                        </div>
                                    </div>
                                )}

                                {step === "OPERATIVE" && (
                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <span className="text-primary text-[12px] font-black tracking-widest">STEP 04</span>
                                            <h3 className="text-5xl font-black italic uppercase tracking-tighter">OPERATIVE ID</h3>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="relative group">
                                                <span className="text-[10px] font-black tracking-widest text-primary/60 mb-2 block">CONTACT PHONE // URGENCY SIGNAL</span>
                                                <div className="relative">
                                                    <input
                                                        autoFocus
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="+27 00 000 0000"
                                                        className="w-full bg-transparent border-b-2 border-primary/20 py-4 text-3xl font-black italic uppercase tracking-tighter focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                                                    />
                                                    <Phone className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" />
                                                </div>
                                            </div>

                                            <div className="relative group">
                                                <span className="text-[10px] font-black tracking-widest text-primary/60 mb-2 block">OPERATIVE EMAIL // MISSION LOGS</span>
                                                <div className="relative">
                                                    <input
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="NAME@MISSION-LOCK.COM"
                                                        className="w-full bg-transparent border-b-2 border-primary/20 py-4 text-3xl font-black italic uppercase tracking-tighter focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                                                    />
                                                    <Mail className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <TacticalButton variant="outline" onClick={() => setStep("UPLINK")}>BACK</TacticalButton>
                                            <TacticalButton
                                                onClick={() => setStep("CONFIRMATION")}
                                                disabled={!formData.phone || !formData.email}
                                                className="flex-1 py-10 text-2xl animate-pulse shadow-[0_0_30px_rgba(var(--primary),0.3)]"
                                            >
                                                INITIATE MISSION <Zap className="ml-2" />
                                            </TacticalButton>
                                        </div>
                                    </div>
                                )}

                                {step === "CONFIRMATION" && (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="h-24 w-24 rounded-full border-4 border-primary flex items-center justify-center"
                                        >
                                            <CheckCircle className="h-12 w-12 text-primary" />
                                        </motion.div>

                                        <div className="space-y-2">
                                            <h3 className="text-5xl font-black italic uppercase tracking-tighter">MISSION LOGGED</h3>
                                            <p className="text-foreground/60 font-mono text-sm tracking-widest uppercase">
                                                DR. KRIEL HAS BEEN NOTIFIED // ETA: {formData.urgency === "IMMEDIATE" ? "15 MIN" : "2 HOURS"}
                                            </p>
                                        </div>

                                        <div className="pt-12">
                                            <TacticalButton variant="outline" onClick={onClose} className="px-12">RETURN TO BASE</TacticalButton>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Background Grid for HUD effect */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(rgba(var(--primary),0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary),0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        />
                    </div>
                </div>

                {/* Footer HUD Meta */}
                <div className="p-4 px-8 border-t-2 border-primary/10 flex justify-between items-center opacity-40">
                    <div className="flex items-center gap-6 font-mono text-[8px] uppercase tracking-[0.3em]">
                        <span>ID: AURELIUS-M-{Math.floor(Math.random() * 10000)}</span>
                        <span>UPLINK: SYNCED</span>
                        <span>SENSORS: ACTIVE</span>
                    </div>
                    <div className="h-1 w-24 bg-primary/20" />
                </div>
            </motion.div>
        </div>
    )
}
