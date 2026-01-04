"use client"

import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { DialogClose } from "@/components/ui/dialog"
import {
  Helicopter,
  Shield,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Heart,
  Syringe,
  Stethoscope,
  Activity,
  Map,
  Calendar,
  Mail,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Search,
  Settings,
  User,
  Bell,
  Home,
} from "lucide-react"

// Custom Tactical Components
import { GrainOverlay } from "@/components/custom/GrainOverlay"
import { TacticalButton } from "@/components/custom/TacticalButton"
import { VisualSectionHeader } from "@/components/custom/VisualSectionHeader"
import { TacticalCard } from "@/components/custom/TacticalCard"
import { StatDisplay } from "@/components/custom/StatDisplay"
import { MissionDialog } from "@/components/custom/MissionDialog"

export default function PalettePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 noise-underlay">
      <GrainOverlay />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="h-12 w-12 bg-primary shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="text-l font-black tracking-tighter uppercase italic">Mogol DiereKliniek</span>
                <span className="text-l font-black tracking-tighter uppercase italic">en WildDienste</span>
              </div>
            </Link>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container mx-auto space-y-32 py-24 px-6 md:px-12 lg:px-24">
        {/* Colors Section */}
        <section>
          <VisualSectionHeader number="01 / Visual Identity" title="The Premium Bushveld Palette" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Soot", hex: "#000000", class: "bg-[#000000] text-white" },
              { name: "Bone", hex: "#F5F5F0", class: "bg-[#F5F5F0] text-black border-2 border-black/5" },
              { name: "Charcoal", hex: "#333333", class: "bg-[#333333] text-white" },
              { name: "Earth", hex: "#4A3728", class: "bg-[#4A3728] text-white" },
              { name: "Pure White", hex: "#FFFFFF", class: "bg-[#FFFFFF] text-black border-2 border-black/5" },
            ].map((color) => (
              <div key={color.name} className="group relative overflow-hidden h-48 border-2 border-border transition-all hover:border-primary">
                <div className={`h-full w-full ${color.class} flex items-end p-4 transition-transform group-hover:scale-105`}>
                  <div className="space-y-1">
                    <p className="font-bold uppercase tracking-wider">{color.name}</p>
                    <p className="text-xs opacity-70 font-mono">{color.hex}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Icons Section */}
        <section>
          <VisualSectionHeader number="02 / Iconography" title="Lucide Icon Library" />
          <div className="border-2 border-border p-8 bg-muted/20">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
              {[
                { icon: Helicopter, name: "Helicopter" },
                { icon: Shield, name: "Shield" },
                { icon: MapPin, name: "MapPin" },
                { icon: Phone, name: "Phone" },
                { icon: Clock, name: "Clock" },
                { icon: AlertTriangle, name: "AlertTriangle" },
                { icon: CheckCircle, name: "CheckCircle" },
                { icon: Info, name: "Info" },
                { icon: XCircle, name: "XCircle" },
                { icon: Heart, name: "Heart" },
                { icon: Syringe, name: "Syringe" },
                { icon: Stethoscope, name: "Stethoscope" },
                { icon: Activity, name: "Activity" },
                { icon: Map, name: "Map" },
                { icon: Calendar, name: "Calendar" },
                { icon: Mail, name: "Mail" },
                { icon: ArrowRight, name: "ArrowRight" },
                { icon: ArrowLeft, name: "ArrowLeft" },
                { icon: ChevronRight, name: "ChevronRight" },
                { icon: ChevronDown, name: "ChevronDown" },
                { icon: Menu, name: "Menu" },
                { icon: X, name: "X" },
                { icon: Search, name: "Search" },
                { icon: Settings, name: "Settings" },
                { icon: User, name: "User" },
                { icon: Bell, name: "Bell" },
                { icon: Home, name: "Home" },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-2 p-4 border border-transparent hover:border-primary hover:bg-primary/5 hover:text-primary transition-all group cursor-pointer">
                  <Icon className="h-6 w-6" />
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section>
          <VisualSectionHeader number="03 / Tactical Actions" title="Button Laboratory" />
          <div className="flex flex-wrap gap-6 items-center border-2 border-border p-12 bg-muted/20">
            <TacticalButton variant="default">Primary Action</TacticalButton>
            <TacticalButton variant="secondary">Secondary Action</TacticalButton>
            <TacticalButton variant="outline">Outline Tactical</TacticalButton>
            <TacticalButton variant="ghost">Ghost Mission</TacticalButton>
          </div>
        </section>

        {/* Toasts Section */}
        <section>
          <VisualSectionHeader number="04 / Notifications" title="Toast System" />
          <div className="flex flex-wrap gap-6 items-center border-2 border-border p-12 bg-muted/20">
            <TacticalButton
              onClick={() => toast.success("Mission Complete", { description: "The wildlife rescue operation was successful." })}
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Success Toast
            </TacticalButton>
            <TacticalButton
              variant="destructive"
              onClick={() => toast.error("Critical Alert", { description: "Emergency response required immediately." })}
            >
              <XCircle className="mr-2 h-5 w-5" />
              Error Toast
            </TacticalButton>
            <TacticalButton
              variant="outline"
              onClick={() => toast.warning("Advisory", { description: "Incoming weather may affect helicopter deployment." })}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Warning Toast
            </TacticalButton>
            <TacticalButton
              variant="secondary"
              onClick={() => toast.info("Intel Update", { description: "New tracking data received from the field team." })}
            >
              <Info className="mr-2 h-5 w-5" />
              Info Toast
            </TacticalButton>
          </div>
        </section>

        {/* Modals Section */}
        <section>
          <VisualSectionHeader number="05 / Dialogs" title="Modal System" />
          <div className="flex flex-wrap gap-6 items-center border-2 border-border p-12 bg-muted/20">
            <MissionDialog
              title="Mission Brief"
              description="Tactical deployment parameters for the Limpopo wildlife corridor."
              trigger={
                <TacticalButton>
                  <Helicopter className="mr-2 h-5 w-5" />
                  Open Mission Brief
                </TacticalButton>
              }
              footer={
                <>
                  <DialogClose asChild>
                    <TacticalButton variant="outline" className="w-full sm:w-auto">Cancel</TacticalButton>
                  </DialogClose>
                  <TacticalButton className="w-full sm:w-auto">
                    Deploy Team
                  </TacticalButton>
                </>
              }
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border-2 border-border bg-muted/10">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-bold uppercase text-xs opacity-50">Location</p>
                    <p className="font-bold">Lephalale District, 23.6823° S</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border-2 border-border bg-muted/10">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-bold uppercase text-xs opacity-50">ETA</p>
                    <p className="font-bold">12 minutes by helicopter</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border-2 border-border bg-destructive/5 border-destructive/20">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <div>
                    <p className="font-bold uppercase text-xs text-destructive opacity-70">Priority</p>
                    <p className="font-bold text-destructive">HIGH - Snare injury reported</p>
                  </div>
                </div>
              </div>
            </MissionDialog>

            <MissionDialog
              title="Clinic Appointment"
              description="Schedule a visit for your companion."
              trigger={
                <TacticalButton variant="outline">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </TacticalButton>
              }
              footer={
                <TacticalButton className="w-full">
                  Confirm Booking
                </TacticalButton>
              }
            >
              <div className="p-8 border-2 border-border text-center bg-muted/5">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 text-primary opacity-50" />
                <p className="font-bold uppercase text-lg italic tracking-tight">Routine Check-up</p>
                <p className="text-sm text-foreground/70 mt-2 max-w-[250px] mx-auto">
                  We treat every patient—him or her—with the highest tactical care.
                </p>
              </div>
            </MissionDialog>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <VisualSectionHeader number="06 / Content Units" title="Interaction Cards" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <TacticalCard
              title="Guardians of the Bushveld"
              description="Strategic veterinary operations requiring elite precision and rapid deployment. We eliminate 'Dead Time' through helicopter-integrated mobility."
              idTag="UNIT-A01"
              badge={<Badge variant="outline" className="rounded-none border-2 font-black uppercase tracking-tighter">Mission Ready</Badge>}
              footer={
                <TacticalButton variant="ghost" className="px-0 group-hover:translate-x-2 transition-transform border-0">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </TacticalButton>
              }
            />

            <div className="grid grid-cols-2 gap-6">
              <StatDisplay label="Missions Active" value="14" unit="UNITS" icon={Activity} />
              <StatDisplay label="Response Time" value="15" unit="MIN" icon={Clock} />
              <StatDisplay label="Success Rate" value="99.8" unit="%" icon={CheckCircle} />
              <StatDisplay label="Game Farms" value="450" unit="SITES" icon={Map} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 pt-16 mt-16 border-t-2 border-border/10">
            <TacticalCard title="Tactical Deployment" className="p-0 border-0 shadow-none hover:shadow-none group">
              <div className="relative aspect-video overflow-hidden border-2 border-border">
                <Image
                  src="/images/helicopter.png"
                  alt="Helicopter Mission"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="pt-8">
                <p className="text-base text-foreground/70 leading-relaxed">
                  24/7 Helicopter support for rapid wildlife immobilization and emergency tracking across the Limpopo region.
                </p>
              </div>
            </TacticalCard>

            <TacticalCard title="Empathetic Resilience" className="p-0 border-0 shadow-none hover:shadow-none group">
              <div className="relative aspect-video overflow-hidden border-2 border-border">
                <Image
                  src="/images/leopard.png"
                  alt="Leopard Care"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="pt-8">
                <p className="text-base text-foreground/70 leading-relaxed">
                  Treating every patient with dignity. Specializing in high-stakes immobilization and conservation care.
                </p>
              </div>
            </TacticalCard>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border py-32 bg-muted/10 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center space-y-6 relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.5em] opacity-40">Mogol Dierekliniek & Wilddienste © 2026</p>
          <div className="space-y-2">
            <p className="text-4xl font-black italic uppercase tracking-tighter">Guardians of the Bushveld</p>
            <div className="h-1 w-24 bg-primary mx-auto" />
          </div>
        </div>
        {/* Background decorative text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[15vw] font-black italic uppercase text-primary/5 whitespace-nowrap pointer-events-none">
          TACTICAL CARE
        </div>
      </footer>
    </div>
  )
}
