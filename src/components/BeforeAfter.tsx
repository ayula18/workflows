"use client";

import SectionWrapper from "./SectionWrapper";
import { XCircle, CheckCircle } from "lucide-react";

interface BeforeAfterProps {
    before: string[];
    after: string[];
}

export default function BeforeAfter({ before, after }: BeforeAfterProps) {
    return (
        <SectionWrapper id="comparison">
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop stopColor="var(--accent)" offset="0%" />
                        <stop stopColor="var(--accent-secondary)" offset="100%" />
                    </linearGradient>
                </defs>
            </svg>

            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                Before vs <span className="text-gradient">After</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Before Card */}
                <div className="glass-panel p-8 rounded-2xl border-red-500/20 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                        MANUAL
                    </div>

                    <h3 className="text-2xl font-bold mb-6 text-red-400">The Old Way</h3>

                    <ul className="space-y-4">
                        {before.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 opacity-80">
                                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* After Card */}
                <div className="glass-panel p-8 rounded-2xl border-white/10 relative overflow-hidden bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-secondary)]/5">
                    <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 text-white border border-white/10">
                        AUTOMATED
                    </div>

                    <h3 className="text-2xl font-bold mb-6 text-[var(--accent)]">The Automated Way</h3>

                    <ul className="space-y-4">
                        {after.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" stroke="url(#accent-gradient)" />
                                <span className="text-[var(--foreground)]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
}
