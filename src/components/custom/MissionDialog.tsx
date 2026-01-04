"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { TacticalButton } from "./TacticalButton"
import { cn } from "@/lib/utils"

interface MissionDialogProps {
    trigger: React.ReactNode
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
}

export function MissionDialog({
    trigger,
    title,
    description,
    children,
    footer,
    className,
}: MissionDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className={cn("rounded-none border-2 border-border max-w-lg bg-card p-0 overflow-hidden", className)}>
                <DialogHeader className="p-8 pb-4 border-b-2 border-border/50 bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1 w-8 bg-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Classification: CONFIDENTIAL</span>
                    </div>
                    <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-foreground/70 text-base">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="p-8 py-6">
                    {children}
                </div>
                <DialogFooter className="p-8 pt-0 flex-col sm:flex-row gap-4">
                    {footer}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
