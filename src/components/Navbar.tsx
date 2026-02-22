"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Sparkles className="w-5 h-5 text-[var(--accent)] group-hover:rotate-12 transition-transform" />
                    <span className="font-bold text-lg tracking-tight">Ayush <span className="text-[var(--accent)]">Lahoti</span></span>
                </Link>

                <nav className="flex gap-6">
                    <Link
                        href="/automations"
                        className="text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--accent)] transition-all"
                    >
                        Automations
                    </Link>
                </nav>

                <div className="hidden sm:block">
                    <a
                        href="mailto:contact@example.com"
                        className="px-4 py-2 text-sm font-semibold rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </header>
    );
}
