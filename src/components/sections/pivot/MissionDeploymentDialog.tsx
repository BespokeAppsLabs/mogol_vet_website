"use client"

import Image from "next/image"
import { Helicopter, ShieldAlert } from "lucide-react"
import { TacticalButton } from "../../custom/TacticalButton"
import { MissionDialog } from "../../custom/MissionDialog"
import { DialogClose } from "@/components/ui/dialog"

export function MissionDeploymentDialog() {
    return (
        <MissionDialog
            title="Mission Deployment"
            description="Tactical readiness: Active // All systems operational."
            trigger={
                <TacticalButton variant="outline" className="mt-8 md:opacity-0 md:group-hover:opacity-100 transition-all md:translate-y-4 md:group-hover:translate-y-0 text-foreground hover:text-background">
                    DEPLOY MISSION
                </TacticalButton>
            }
            footer={
                <>
                    <DialogClose asChild>
                        <TacticalButton variant="outline" className="w-full sm:w-auto">Stand Down</TacticalButton>
                    </DialogClose>
                    <TacticalButton variant="default" className="w-full sm:w-auto">
                        Initiate Deployment
                    </TacticalButton>
                </>
            }
        >
            <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden border-2 border-border mb-4">
                    <Image src="/images/helicopter.png" alt="Wildlife Mission" fill className="object-cover grayscale" />
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border border-border bg-muted/10">
                        <Helicopter className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Rapid Response</p>
                            <p className="font-bold text-sm">24/7 Helicopter Support</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border border-border bg-muted/10">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Capability</p>
                            <p className="font-bold text-sm">Specialized Immobilization</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-2 border-destructive/20 bg-destructive/5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">Emergency Dispatch Available</span>
                    </div>
                    <p className="text-xs text-foreground/70">Eliminating 'Dead Time' through helicopter-integrated mobility.</p>
                </div>
            </div>
        </MissionDialog>
    )
}
