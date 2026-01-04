"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Shield } from "lucide-react"
import { useState } from "react"

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-[100] transition-colors duration-500">
            <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-12">
                <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                    <div className="h-8 w-8 md:h-10 md:w-10 bg-primary shrink-0 transition-transform group-hover:rotate-90 duration-500" />
                    <div className="flex flex-col leading-none">
                        <span className="text-base md:text-xl font-black tracking-tighter uppercase italic text-foreground">
                            Mogol Dierekliniek
                        </span>
                        <span className="text-base md:text-xl font-black tracking-tighter uppercase italic text-foreground">
                            en Wilddienste
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <nav className="hidden lg:flex items-center gap-6">
                        {["Emergency", "Clinic", "Vault", "Mission"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <Link href="/admin/login" className="hidden sm:block">
                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors px-4 py-2 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                                Login
                            </button>
                        </Link>
                        <ModeToggle />
                        <MobileNav />
                    </div>
                </div>
            </div>

            {/* Subtle Scanning Line / Border Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border/10">
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full w-full bg-primary/20 origin-left"
                />
            </div>
        </header>
    )
}

function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { name: "Emergency", href: "#emergency" },
        { name: "Clinic", href: "#clinic" },
        { name: "Vault", href: "#vault" },
        { name: "Mission", href: "#mission" },
        { name: "Admin Login", href: "/admin/login" },
    ]

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-10 flex items-center justify-center border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="fixed inset-0 top-20 bg-background/95 backdrop-blur-xl z-[90] p-6 flex flex-col gap-8 border-t border-border/10"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2 text-primary/40">
                                <Shield size={12} />
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Tactical Uplink</span>
                            </div>
                            {links.map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="group"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-center justify-between border-b border-border/10 py-4"
                                    >
                                        <span className="text-2xl font-black italic uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">
                                            {link.name}
                                        </span>
                                        <div className="h-2 w-2 bg-primary/20 group-hover:bg-primary transition-colors" />
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto p-4 border-2 border-primary/10 bg-primary/5">
                            <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest leading-relaxed">
                                Terminal Status: Online // Sector Limpopo // All Systems Operational
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
