"use client";

import React from "react";
import { Shield, Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-6">
            <div className="space-y-2">
                <div className="flex justify-center items-center gap-2 text-primary/60">
                    <Shield size={14} />
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase">SYSTEM MODULE</span>
                </div>
                <h1 className="text-5xl font-black italic uppercase tracking-tighter">CORE SETTINGS</h1>
            </div>

            <div className="p-8 border-2 border-primary/20 bg-background/50 backdrop-blur-md flex flex-col items-center gap-4">
                <Settings className="h-12 w-12 text-primary animate-spin-slow" />
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tight">COMING SOON</h2>
                    <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em]">
                        ENCRYPTION AND OPERATIVE MANAGEMENT UPDATES PENDING
                    </p>
                </div>
            </div>
        </div>
    );
}
