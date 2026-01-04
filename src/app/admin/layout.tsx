"use client";
import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto border-l border-border/10">
                {children}
            </main>
        </div>
    );
}
