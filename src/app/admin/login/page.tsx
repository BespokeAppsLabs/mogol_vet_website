"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TacticalButton } from "@/components/custom/TacticalButton"
import { Mail, Shield, Zap } from "lucide-react"
import { GrainOverlay } from "@/components/custom/GrainOverlay"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = React.useState("")
    const [isLoggingIn, setIsLoggingIn] = React.useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoggingIn(true)
        // Simulate login delay
        setTimeout(() => {
            router.push("/admin/dashboard")
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <GrainOverlay />

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(var(--primary),0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary),0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8 z-10"
            >
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 bg-primary flex items-center justify-center group">
                            <Shield className="h-8 w-8 text-background group-hover:rotate-12 transition-transform" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black tracking-[0.4em] text-primary/60 uppercase">OPERATIONAL ACCESS</span>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter">ADMIN PORTAL</h1>
                    </div>
                </div>

                <div className="p-8 border-2 border-primary/20 bg-background/50 backdrop-blur-md space-y-6">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black tracking-widest text-primary/60 uppercase block">
                                OPERATIVE EMAIL
                            </label>
                            <div className="relative group">
                                <input
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="NAME@MISSION-LOCK.COM"
                                    className="w-full bg-transparent border-b-2 border-primary/20 py-3 text-xl font-black italic uppercase tracking-tighter focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                                    required
                                />
                                <Mail className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors h-5 w-5" />
                            </div>
                        </div>

                        <TacticalButton
                            type="submit"
                            disabled={!email || isLoggingIn}
                            className="w-full py-8 text-xl"
                        >
                            {isLoggingIn ? (
                                <span className="flex items-center gap-2">
                                    ESTABLISHING UPLINK <Zap className="animate-pulse h-5 w-5" />
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    INITIATE LOGIN <Shield className="h-5 w-5" />
                                </span>
                            )}
                        </TacticalButton>
                    </form>

                    <div className="pt-4 border-t border-primary/10">
                        <p className="text-[8px] font-mono text-center text-foreground/40 uppercase tracking-[0.2em]">
                            ENCRYPTION LEVEL: AES-256-X // NO PASSWORD REQUIRED FOR DEMO
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center opacity-40 px-2">
                    <div className="font-mono text-[8px] uppercase tracking-[0.3em]">
                        SYSTEM: SECURE
                    </div>
                    <div className="h-[1px] w-24 bg-primary/20" />
                    <div className="font-mono text-[8px] uppercase tracking-[0.3em]">
                        ID: {Math.random().toString(36).substring(7).toUpperCase()}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
