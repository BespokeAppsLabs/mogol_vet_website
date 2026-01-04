"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
    IconArrowWaveRightUp,
    IconBoxAlignTopLeft,
    IconBoxAlignRightFilled
} from "@tabler/icons-react";
import { Activity, Helicopter, Users, Calendar, Shield, BadgeAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        <div className="p-10 space-y-10">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary/60">
                    <Shield size={14} />
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase">OPERATIONAL OVERVIEW</span>
                </div>
                <h1 className="text-5xl font-black italic uppercase tracking-tighter">DASHBOARD</h1>
            </div>

            <BentoGrid className="max-w-7xl mx-auto">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}

const Skeleton = ({ children, color }: { children?: React.ReactNode, color?: string }) => (
    <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-card border border-border/10 items-center justify-center relative overflow-hidden group`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(var(--primary),0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary),0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        {children}
    </div>
);

const items = [
    {
        title: "Mission Readiness",
        description: "Helicopter and field units status.",
        header: (
            <Skeleton>
                <div className="flex flex-col items-center gap-2">
                    <Helicopter className="h-10 w-10 text-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Status: Optimal</span>
                </div>
            </Skeleton>
        ),
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Active Appointments",
        description: "Clinic throughput for the next 24 hours.",
        header: (
            <Skeleton>
                <div className="text-3xl font-black italic text-foreground/20">14 PATIENTS</div>
            </Skeleton>
        ),
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Patient Intake Trends",
        description: "Growth in wildlife vs domestic cases.",
        header: (
            <Skeleton>
                <Activity className="h-12 w-12 text-primary/40" />
            </Skeleton>
        ),
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Operational Heatmap",
        description: "Most active deployment sectors in Limpopo.",
        header: (
            <Skeleton>
                <div className="grid grid-cols-8 gap-1 p-4 w-full">
                    {[...Array(32)].map((_, i) => (
                        <div key={i} className={`h-4 w-full rounded-sm ${i % 5 === 0 ? 'bg-primary/20' : 'bg-neutral-800'}`} />
                    ))}
                </div>
            </Skeleton>
        ),
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Security Uplink",
        description: "System health and encryption monitoring.",
        header: (
            <Skeleton>
                <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="h-2 w-2 rounded-full bg-primary/40" />
                </div>
            </Skeleton>
        ),
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Recent Alerts",
        description: "Logged critical incidents and responses.",
        header: (
            <Skeleton>
                <BadgeAlert className="h-10 w-10 text-red-500/50" />
            </Skeleton>
        ),
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Guardians Project",
        description: "Progress on wildlife conservation tracking.",
        header: (
            <Skeleton>
                <Users className="h-12 w-12 text-primary/60" />
            </Skeleton>
        ),
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];
