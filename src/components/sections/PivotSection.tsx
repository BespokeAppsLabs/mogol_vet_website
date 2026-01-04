"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ClinicAdmissionDialog } from "./pivot/ClinicAdmissionDialog"
import { HerdManagementDialog } from "./pivot/HerdManagementDialog"
import { MissionDeploymentDialog } from "./pivot/MissionDeploymentDialog"
import { cn } from "@/lib/utils"

interface ServicePillarProps {
    id: "domestic" | "livestock" | "wild"
    title: string
    coverImage: string
    bentoImages: string[]
    dialog: React.ReactNode
    activeId: "domestic" | "livestock" | "wild" | null
    setActiveId: (id: "domestic" | "livestock" | "wild" | null) => void
    isLast?: boolean
    isMobile?: boolean
}

function ServicePillar({
    id,
    title,
    coverImage,
    bentoImages,
    dialog,
    activeId,
    setActiveId,
    isLast,
    isMobile
}: ServicePillarProps) {
    const isActive = activeId === id
    const isOthersActive = activeId !== null && activeId !== id

    if (isMobile) {
        return (
            <motion.div
                className={cn(
                    "relative overflow-hidden border-b border-primary/10 transition-all duration-500 flex flex-col",
                    isActive ? "flex-[4] min-h-[60vh]" : "flex-1 min-h-[80px]"
                )}
                onClick={() => setActiveId(isActive ? null : id)}
            >
                {/* Background Scan Line (Always active when sector is expanded) */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ top: "-10%" }}
                            animate={{ top: "110%" }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 w-full h-[2px] bg-primary/40 shadow-[0_0_20px_rgba(var(--primary),0.8)] z-30 pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                {/* Collapsed State: Image + Title */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className={cn(
                            "object-cover grayscale transition-all duration-700",
                            isActive ? "opacity-20 blur-sm scale-110" : "opacity-40"
                        )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-80" />
                </div>

                {/* Content Container */}
                <div className="relative z-20 h-full flex flex-col p-6">
                    <div className={cn(
                        "flex items-center justify-between transition-all",
                        isActive ? "mb-8" : "h-full"
                    )}>
                        <h3 className={cn(
                            "font-black italic uppercase tracking-tighter transition-all",
                            isActive ? "text-4xl text-primary" : "text-2xl text-foreground"
                        )}>
                            {title}
                        </h3>
                        {!isActive && (
                            <div className="h-4 w-4 border-2 border-primary/40 animate-pulse" />
                        )}
                    </div>

                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="flex-1 flex flex-col gap-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Mini Bento for Mobile */}
                                <div className="grid grid-cols-2 gap-3 flex-1">
                                    {bentoImages.slice(0, 2).map((src, idx) => (
                                        <div key={idx} className="relative aspect-square border border-primary/20 overflow-hidden">
                                            <Image src={src} alt="Gallery" fill className="object-cover grayscale" />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto">
                                    {dialog}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className={`relative flex-1 ${!isLast ? "border-r border-border/10" : ""} group cursor-pointer overflow-hidden transition-all duration-700`}
            onMouseEnter={() => setActiveId(id)}
            onMouseLeave={() => setActiveId(null)}
            animate={{ flex: isActive ? 2 : isOthersActive ? 0.5 : 1 }}
        >
            {/* Cover Image - Disappears on Hover */}
            <div className="absolute inset-0 opacity-40 group-hover:opacity-0 grayscale transition-opacity duration-700 z-0">
                <Image
                    src={coverImage}
                    alt={`${title} Cover`}
                    fill
                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
            </div>

            {/* Bento Gallery - Revealed on Hover */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-12 pointer-events-none z-10"
                    >
                        {bentoImages.map((src, idx) => (
                            <div
                                key={idx}
                                className={`relative overflow-hidden border border-border/10 grayscale ${idx % 2 === 1 ? "translate-y-4" : "-translate-y-4"}`}
                            >
                                <Image src={src} alt={`${title} Gallery ${idx}`} fill className="object-cover" />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative h-full flex flex-col items-center justify-center z-20 px-8 text-center bg-background/10 group-hover:bg-transparent transition-colors duration-700">
                <motion.div
                    animate={{ y: isActive ? -20 : 0 }}
                    className="space-y-4"
                >
                    <h3 className="text-3xl md:text-5xl font-black italic text-foreground uppercase tracking-tighter">
                        {title}
                    </h3>
                    <div className="h-1 w-20 bg-primary mx-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                {dialog}
            </div>
        </motion.div>
    )
}

export function PivotSection() {
    const [activeId, setActiveId] = useState<"domestic" | "livestock" | "wild" | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return (
        <section className={cn(
            "relative w-full overflow-hidden bg-background flex",
            isMobile ? "flex-col h-auto min-h-screen" : "flex-row h-screen"
        )}>
            <ServicePillar
                id="domestic"
                title="DOMESTIC"
                coverImage="/images/cat-eye.png"
                bentoImages={[
                    "/images/cat-eye-macro.png",
                    "/images/domestic_dog_care.png",
                    "/images/cat-eye.png",
                    "/images/clinic-precision.png"
                ]}
                dialog={<ClinicAdmissionDialog />}
                activeId={activeId}
                setActiveId={setActiveId}
                isMobile={isMobile}
            />

            <ServicePillar
                id="livestock"
                title="LIVESTOCK"
                coverImage="/images/vet-care.png"
                bentoImages={[
                    "/images/vet-care.png",
                    "/images/tactical-topo.png",
                    "/images/tactical_vet_operation.png",
                    "/images/clinic-precision.png"
                ]}
                dialog={<HerdManagementDialog />}
                activeId={activeId}
                setActiveId={setActiveId}
                isMobile={isMobile}
            />

            <ServicePillar
                id="wild"
                title="WILDLIFE"
                coverImage="/images/rhino-skin.png"
                bentoImages={[
                    "/images/leopard-fur.png",
                    "/images/rescue-action.png",
                    "/images/bush-deployment.png",
                    "/images/leopard.png"
                ]}
                dialog={<MissionDeploymentDialog />}
                activeId={activeId}
                setActiveId={setActiveId}
                isMobile={isMobile}
                isLast
            />
        </section>
    )
}
