"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ClinicAdmissionDialog } from "./pivot/ClinicAdmissionDialog"
import { HerdManagementDialog } from "./pivot/HerdManagementDialog"
import { MissionDeploymentDialog } from "./pivot/MissionDeploymentDialog"

interface ServicePillarProps {
    id: "domestic" | "livestock" | "wild"
    title: string
    coverImage: string
    bentoImages: string[]
    dialog: React.ReactNode
    hoveredSide: "domestic" | "livestock" | "wild" | null
    setHoveredSide: (side: "domestic" | "livestock" | "wild" | null) => void
    isLast?: boolean
}

function ServicePillar({
    id,
    title,
    coverImage,
    bentoImages,
    dialog,
    hoveredSide,
    setHoveredSide,
    isLast
}: ServicePillarProps) {
    const isActive = hoveredSide === id
    const isOthersHovered = hoveredSide !== null && hoveredSide !== id

    return (
        <motion.div
            className={`relative flex-1 ${!isLast ? "border-r border-border/10" : ""} group cursor-pointer overflow-hidden transition-all duration-700`}
            onMouseEnter={() => setHoveredSide(id)}
            onMouseLeave={() => setHoveredSide(null)}
            animate={{ flex: isActive ? 2 : isOthersHovered ? 0.5 : 1 }}
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
    const [hoveredSide, setHoveredSide] = useState<"domestic" | "livestock" | "wild" | null>(null)

    return (
        <section className="relative h-screen w-full flex overflow-hidden bg-background">
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
                hoveredSide={hoveredSide}
                setHoveredSide={setHoveredSide}
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
                hoveredSide={hoveredSide}
                setHoveredSide={setHoveredSide}
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
                hoveredSide={hoveredSide}
                setHoveredSide={setHoveredSide}
                isLast
            />
        </section>
    )
}
