"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { motion } from "framer-motion"

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-[100] transition-colors duration-500">
            <div className="container mx-auto flex h-24 items-center justify-between px-6 md:px-12">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="h-10 w-10 bg-primary shrink-0 transition-transform group-hover:rotate-90 duration-500" />
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-black tracking-tighter uppercase italic text-foreground">
                            Mogol Dierekliniek
                        </span>
                        <span className="text-xl font-black tracking-tighter uppercase italic text-foreground">
                            en Wilddienste
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-6">
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
                    <ModeToggle />
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
