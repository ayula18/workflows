"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const { scrollY } = useScroll();

    // Map scroll position from 0 to 120px.
    // 0px = 1280px wide
    // 120px (and beyond) = 1024px wide
    const maxWidth = useTransform(scrollY, [0, 120], ["1280px", "1024px"]);

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
            <motion.div
                className="w-full h-16 flex items-center justify-between relative bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm dark:bg-black/40 dark:border-white/10 dark:shadow-none rounded-full px-4 sm:px-6"
                style={{ maxWidth }}
            >

                {/* Left Side */}
                <div className="flex-1 flex justify-start">
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
                    >
                        Home
                    </Link>
                </div>

                {/* Center Navigation */}
                <nav className="flex gap-6 shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link
                        href="/automations"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-all"
                    >
                        Automations
                    </Link>
                    <Link
                        href="/case-studies"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-all"
                    >
                        Case Studies
                    </Link>
                    <Link
                        href="/sector-thesis"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-all"
                    >
                        Sector Thesis
                    </Link>
                </nav>

                {/* Right Side */}
                <div className="flex-1 flex justify-end items-center gap-3 w-full sm:w-auto">
                    <a
                        href="https://drive.google.com/file/d/1ug60B8tidw9ujYirz46xv_O8VSuNutpH/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                    >
                        Resume
                    </a>
                    <a
                        href="mailto:ayush_lahoti@pg26.mesaschool.co"
                        className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
                    >
                        Hire Me
                    </a>
                    <ThemeToggle />
                </div>
            </motion.div>
        </header>
    );
}
