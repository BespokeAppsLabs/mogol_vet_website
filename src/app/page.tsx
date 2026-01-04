"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

// Sections
import { Header } from "@/components/sections/Header"
import { HeroSection } from "@/components/sections/HeroSection"
import { PivotSection } from "@/components/sections/PivotSection"
import { VaultSection } from "@/components/sections/VaultSection"
import { TimelineSection } from "@/components/sections/TimelineSection"
import { DeploymentSection } from "@/components/sections/DeploymentSection"
import { GrainOverlay } from "@/components/custom/GrainOverlay"
import { EmergencyHUD } from "@/components/custom/EmergencyHUD"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false)
  const sweepRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const sections = gsap.utils.toArray<HTMLElement>(".pinned-section")

    mm.add("(min-width: 768px)", () => {
      // 1. Pinned Transition Engine (Desktop only)
      sections.forEach((section, i) => {
        if (i === sections.length - 1) return
        // Skip pinning for TimelineSection (index 3) as it has internal scroll-based logic
        if (i === 3) return

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: i === 3 ? "bottom 50%" : "bottom top",
          scrub: true
        })
      })

      // 2. Lidar Sweep Transition Orchestration (Desktop only)
      gsap.timeline({
        scrollTrigger: {
          trigger: sections[0],
          start: "top top",
          end: "100% top",
          scrub: 1.2,
        }
      })
        .fromTo(sweepRef.current,
          { y: "0vh", opacity: 0 },
          { y: "100vh", opacity: 1, ease: "power2.inOut" }
        )
        .to(sweepRef.current, { opacity: 0, duration: 0.1 })
    })

    // 3. Global Bloom / Flash Logic (Uplink) - Keep for both but soften for mobile
    sections.forEach((section, i) => {
      if (i === 0) return

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
        .to("body", {
          filter: "brightness(1.5) contrast(1.2)",
          duration: 0.2,
          ease: "power2.out"
        })
        .to("body", {
          filter: "brightness(1) contrast(1)",
          duration: 0.5,
          ease: "power2.in"
        })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <main ref={containerRef} className="relative bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <GrainOverlay />

      {/* Lidar Sweep Overlay */}
      <div
        ref={sweepRef}
        className="fixed top-[-100vh] left-0 w-full h-[2px] bg-primary/80 shadow-[0_0_30px_rgba(var(--primary),1)] z-[100] pointer-events-none"
      />

      {/* Scroll Sections */}
      <div id="hero" className="pinned-section">
        <HeroSection onTrigger={() => setIsEmergencyOpen(true)} />
      </div>

      <div id="clinic" className="pinned-section">
        <PivotSection />
      </div>

      <div id="vault" className="pinned-section">
        <VaultSection />
      </div>

      <div id="timeline" className="pinned-section">
        <TimelineSection />
      </div>

      <div id="mission" className="pinned-section">
        <DeploymentSection onTrigger={() => setIsEmergencyOpen(true)} />
      </div>

      <EmergencyHUD isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
    </main>
  )
}
