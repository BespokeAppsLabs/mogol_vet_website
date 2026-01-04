"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
    IconCalendarEvent,
    IconHelicopter,
    IconLogout,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Shield } from "lucide-react";

export function AdminSidebar() {
    const links = [
        {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: (
                <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Appointments",
            href: "/admin/appointments",
            icon: (
                <IconCalendarEvent className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Missions",
            href: "/admin/missions",
            icon: (
                <IconHelicopter className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "/admin/settings",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            href: "/",
            icon: (
                <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </div>
                </div>
                <div>
                    <SidebarLink
                        link={{
                            label: "Admin Operative",
                            href: "#",
                            icon: (
                                <div className="h-7 w-7 shrink-0 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-[10px] font-black text-background uppercase tracking-tighter">OP</span>
                                </div>
                            ),
                        }}
                    />
                </div>
            </SidebarBody>
        </Sidebar>
    );
}

export const Logo = () => {
    return (
        <Link
            href="/admin/dashboard"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
        >
            <div className="h-5 w-6 shrink-0 bg-primary" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-black italic uppercase tracking-tighter whitespace-pre"
            >
                MOGOL ADMIN
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="/admin/dashboard"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
        >
            <div className="h-5 w-6 shrink-0 bg-primary" />
        </Link>
    );
};
