"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
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

            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">
                Before vs <span className="text-gradient">After</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Before Card */}
                <div className="p-8 rounded-2xl border border-red-200 dark:border-red-500/20 relative overflow-hidden bg-white dark:bg-[var(--card-bg-solid)]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Old Way</h3>
                        <div className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 tracking-wider whitespace-nowrap">
                            MANUAL
                        </div>
                    </div>

                    <ul className="space-y-4">
                        {before.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-gray-300 opacity-80">
                                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* After Card */}
                <div className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 relative overflow-hidden bg-emerald-50 dark:bg-[var(--card-bg-solid)] bg-gradient-to-br from-emerald-50 to-emerald-50/50 dark:from-emerald-500/5 dark:to-emerald-400/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Automated Way</h3>
                        <div className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider whitespace-nowrap">
                            AUTOMATED
                        </div>
                    </div>

                    <ul className="space-y-4">
                        {after.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                                <span className="text-slate-700 dark:text-[var(--foreground)]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
}
