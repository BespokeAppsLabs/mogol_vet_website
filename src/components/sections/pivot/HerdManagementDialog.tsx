"use client"

import Image from "next/image"
import { ClipboardCheck, Activity } from "lucide-react"
import { TacticalButton } from "../../custom/TacticalButton"
import { MissionDialog } from "../../custom/MissionDialog"
import { DialogClose } from "@/components/ui/dialog"

export function HerdManagementDialog() {
    return (
        <MissionDialog
            title="Herd Management"
            description="Elite productivity and equine performance."
            trigger={
                <TacticalButton variant="outline" className="mt-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-foreground hover:text-background">
                    MANAGE HERD
                </TacticalButton>
            }
            footer={
                <>
                    <DialogClose asChild>
                        <TacticalButton variant="outline" className="w-full sm:w-auto">Back</TacticalButton>
                    </DialogClose>
                    <TacticalButton variant="secondary" className="w-full sm:w-auto">
                        Request Consultation
                    </TacticalButton>
                </>
            }
        >
            <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden border-2 border-border mb-4">
                    <Image src="/images/vet-care.png" alt="Livestock" fill className="object-cover grayscale" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-border bg-muted/10 space-y-2">
                        <ClipboardCheck className="h-5 w-5 text-secondary" />
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Protocol</p>
                        <p className="font-bold text-sm">Herd Health Systems</p>
                    </div>
                    <div className="p-4 border border-border bg-muted/10 space-y-2">
                        <Activity className="h-5 w-5 text-secondary" />
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Diagnostics</p>
                        <p className="font-bold text-sm">Mobile DNA Labs</p>
                    </div>
                </div>
                <p className="text-sm text-foreground/70 italic p-4 border-l-2 border-secondary bg-secondary/5">
                    Bringing the clinical laboratory to the farm to ensure zero "Dead Time."
                </p>
            </div>
        </MissionDialog>
    )
}
