"use client";
import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full bg-[#1A1A1A] dark:bg-[#0D0D0D] overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto border-l border-white/5">
                {children}
            </main>
        </div>
    );
}
