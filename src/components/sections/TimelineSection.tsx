import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TacticalCard } from "../custom/TacticalCard"

export function TimelineSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={containerRef} className="relative min-h-[200vh] w-full bg-background py-32 px-6 md:px-24">
            {/* Centered Tracing Beam */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-border/10">
                <motion.div
                    style={{ height: beamHeight }}
                    className="absolute top-0 w-full bg-primary shadow-[0_0_30px_rgba(var(--primary),0.8)]"
                />
            </div>

            <div className="relative space-y-[60vh] max-w-7xl mx-auto">
                {/* Step 1: Rapid Response */}
                <TimelineStep
                    number="01"
                    title="RAPID RESPONSE"
                    description="Our helicopters provide a critical 15-minute response window for wildlife emergencies."
                    image="/images/hero-helicopter.png"
                    reverse={false}
                    idTag="UNIT-01-NAV"
                />

                {/* Step 2: Specialized Care */}
                <TimelineStep
                    number="02"
                    title="PRECISION CARE"
                    description="From domestic surgery to wild animal immobilization, we provide world-class medical excellence."
                    image="/images/clinic-precision.png"
                    reverse={true}
                    idTag="MED-INT-ALPHA"
                />

                {/* Step 3: Mission Success */}
                <TimelineStep
                    number="03"
                    title="MISSION RECOVERY"
                    description="A triumphant return to the wild. Monitoring and conservation for the next generation."
                    image="/images/mission-recovery.png"
                    reverse={false}
                    idTag="RECOV-OPS-O8"
                />
            </div>
        </section>
    )
}

function TimelineStep({
    number,
    title,
    description,
    image,
    reverse,
    idTag
}: {
    number: string,
    title: string,
    description: string,
    image: string,
    reverse: boolean,
    idTag: string
}) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const yParallax = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])

    return (
        <div ref={ref} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 group`}>
            {/* Context Side */}
            <div className={`flex-1 ${reverse ? 'text-left' : 'text-right'}`}>
                <div className="inline-block w-full max-w-md">
                    <TacticalCard
                        title={`${number} // ${title}`}
                        description={description}
                        idTag={idTag}
                        className="text-left"
                    />
                </div>
            </div>

            {/* Pivot Point */}
            <div className="flex-none w-8 h-8 rounded-full bg-background border-4 border-primary z-10 shadow-[0_0_20px_rgba(var(--primary),0.5)] flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>

            {/* Visual Side */}
            <div className="flex-1">
                <motion.div
                    style={{ y: yParallax }}
                    className="relative aspect-video w-full max-w-xl overflow-hidden border-2 border-border shadow-2xl group-hover:border-primary/40 transition-colors"
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </motion.div>
            </div>
        </div>
    )
}
