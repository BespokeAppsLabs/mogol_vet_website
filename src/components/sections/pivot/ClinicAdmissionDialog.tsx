"use client"

import Image from "next/image"
import { Stethoscope, Syringe, Heart } from "lucide-react"
import { TacticalButton } from "../../custom/TacticalButton"
import { MissionDialog } from "../../custom/MissionDialog"
import { DialogClose } from "@/components/ui/dialog"

export function ClinicAdmissionDialog() {
    return (
        <MissionDialog
            title="Clinic Admission"
            description="Precision medicine with a heart of bone and charcoal."
            trigger={
                <TacticalButton variant="outline" className="mt-8 md:opacity-0 md:group-hover:opacity-100 transition-all md:translate-y-4 md:group-hover:translate-y-0 text-foreground hover:text-background">
                    ENTER CLINIC
                </TacticalButton>
            }
            footer={
                <>
                    <DialogClose asChild>
                        <TacticalButton variant="outline" className="w-full sm:w-auto">Cancel</TacticalButton>
                    </DialogClose>
                    <TacticalButton className="w-full sm:w-auto">
                        Secure Appointment
                    </TacticalButton>
                </>
            }
        >
            <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden border-2 border-border mb-4">
                    <Image src="/images/clinic-precision.png" alt="Clinic" fill className="object-cover grayscale" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-border bg-muted/10 space-y-2">
                        <Stethoscope className="h-5 w-5 text-primary" />
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Service</p>
                        <p className="font-bold text-sm">Routine Readiness</p>
                    </div>
                    <div className="p-4 border border-border bg-muted/10 space-y-2">
                        <Syringe className="h-5 w-5 text-primary" />
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Specialty</p>
                        <p className="font-bold text-sm">Surgical Theater</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-primary/20 bg-primary/5">
                    <Heart className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-sm font-bold">Empathetic Care</p>
                        <p className="text-xs text-foreground/70">We treat your companion—him or her—with elite intensity.</p>
                    </div>
                </div>
            </div>
        </MissionDialog>
    )
}
