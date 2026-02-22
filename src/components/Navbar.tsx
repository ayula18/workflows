"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/[0.03] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Briefcase className="w-5 h-5 text-[var(--accent)] group-hover:rotate-[-6deg] transition-transform" />
                    <span className="font-bold text-lg tracking-tight">Ayush <span className="text-[var(--accent)]">Lahoti</span></span>
                </Link>

                <nav className="flex gap-6">
                    <Link
                        href="/automations"
                        className="text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--accent)] transition-all"
                    >
                        Proof of Work
                    </Link>
                </nav>

                <div className="hidden sm:flex items-center gap-3">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-semibold rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        Resume
                    </a>
                    <a
                        href="mailto:ayush_lahoti@pg26.mesaschool.co"
                        className="px-4 py-2 text-sm font-semibold rounded-full bg-[var(--accent)] text-black hover:opacity-90 transition-colors"
                    >
                        Connect
                    </a>
                </div>
            </div>
        </header>
    );
}
