"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/automations", label: "Automations" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/sector-thesis", label: "Sector Thesis" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const smoothY = useSpring(scrollY, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001,
    });

    const maxWidth = useTransform(smoothY, [0, 120], ["1280px", "1024px"]);

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
                {/* ── Desktop navbar (unchanged) ── */}
                <motion.div
                    className="hidden md:flex w-full h-16 items-center justify-between relative bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm dark:bg-black/40 dark:border-white/10 dark:shadow-none rounded-full px-4 sm:px-6"
                    style={{ maxWidth }}
                >
                    <div className="flex-1 flex justify-start">
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
                        >
                            Home
                        </Link>
                    </div>

                    <nav className="flex gap-6 shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/automations" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-all">
                            Automations
                        </Link>
                        <Link href="/case-studies" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-all">
                            Case Studies
                        </Link>
                        <Link href="/sector-thesis" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-all">
                            Sector Thesis
                        </Link>
                    </nav>

                    <div className="flex-1 flex justify-end items-center gap-3">
                        <a
                            href="https://drive.google.com/file/d/1ug60B8tidw9ujYirz46xv_O8VSuNutpH/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-semibold rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                        >
                            Resume
                        </a>
                        <a
                            href="mailto:ayush_lahoti@pg26.mesaschool.co"
                            className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
                        >
                            Hire Me
                        </a>
                        <ThemeToggle />
                    </div>
                </motion.div>

                {/* ── Mobile navbar ── */}
                <div className="flex md:hidden w-full h-14 items-center justify-between bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm dark:bg-black/40 dark:border-white/10 dark:shadow-none rounded-full px-4">
                    {/* Hamburger – left */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                        aria-label="Open navigation menu"
                    >
                        <Menu className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                    </button>

                    {/* Hire Me – right */}
                    <a
                        href="mailto:ayush_lahoti@pg26.mesaschool.co"
                        className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
                    >
                        Hire Me
                    </a>
                </div>
            </header>

            {/* ── Side Sheet (mobile only) ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={closeSidebar}
                        />

                        {/* Side sheet panel */}
                        <motion.aside
                            className="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white dark:bg-gray-950 border-r border-slate-200 dark:border-white/10 shadow-2xl flex flex-col md:hidden"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Close button */}
                            <div className="flex items-center justify-between px-5 pt-6 pb-4">
                                <span className="text-sm font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
                                    Menu
                                </span>
                                <button
                                    onClick={closeSidebar}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                                    aria-label="Close navigation menu"
                                >
                                    <X className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="mx-5 h-px bg-slate-200 dark:bg-white/10" />

                            {/* Nav links */}
                            <nav className="flex flex-col gap-1 px-4 pt-4">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={closeSidebar}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                    ? "bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 text-slate-900 dark:text-white font-semibold"
                                                    : "text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Divider */}
                            <div className="mx-5 mt-4 h-px bg-slate-200 dark:bg-white/10" />

                            {/* Action buttons */}
                            <div className="flex flex-col gap-3 px-5 pt-5">
                                <a
                                    href="https://drive.google.com/file/d/1ug60B8tidw9ujYirz46xv_O8VSuNutpH/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeSidebar}
                                    className="flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                                >
                                    Resume
                                </a>
                                <a
                                    href="mailto:ayush_lahoti@pg26.mesaschool.co"
                                    onClick={closeSidebar}
                                    className="flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
                                >
                                    Hire Me
                                </a>
                            </div>

                            {/* Theme toggle at bottom */}
                            <div className="mt-auto px-5 pb-6 flex items-center justify-between">
                                <span className="text-xs text-slate-400 dark:text-gray-500">Appearance</span>
                                <ThemeToggle />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
