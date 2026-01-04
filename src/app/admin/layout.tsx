"use client";
import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-background overflow-hidden font-sans">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto border-t md:border-t-0 md:border-l border-border/10">
                {children}
            </main>
        </div>
    );
}
