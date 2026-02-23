"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

interface TechStackProps {
    stack: string[];
    architectureLabels?: {
        source: string;
        core: string;
        coreSubtext?: string;
        output: string;
    };
}

export default function TechStack({ stack, architectureLabels }: TechStackProps) {
    const labels = architectureLabels ?? {
        source: "Data Sources",
        core: "n8n Core",
        coreSubtext: "Enrichment Loop",
        output: "CRM / Outreach",
    };
    return (
        <SectionWrapper id="stack">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
                        Under the <br /> <span className="text-gradient">hood</span>
                    </h2>
                    <p className="text-lg opacity-70 mb-8">
                        Built with modern, scalable low-code tools and enterprise-grade APIs to ensure reliability and speed.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {stack.map((tech, i) => (
                            <span
                                key={i}
                                className="font-mono px-4 py-2 rounded-full text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--accent)]/50 transition-colors cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="relative aspect-video rounded-2xl glass-panel p-8 flex items-center justify-center overflow-hidden">
                        {/* Abstract Architecture Diagram */}
                        <div className="absolute inset-0 bg-grid-white/[0.02]" />

                        <div className="relative z-10 flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-4 w-full px-2">
                            {/* Source */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="font-mono shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl border border-[var(--card-border)] bg-[var(--background)] flex items-center justify-center text-xs font-bold text-center p-2"
                            >
                                {labels.source}
                            </motion.div>

                            {/* Arrow */}
                            <div className="h-0.5 w-8 md:w-16 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[var(--accent-secondary)] rotate-45" />
                            </div>

                            {/* Processing */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="font-mono shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)]/10 flex flex-col items-center justify-center text-xs font-bold text-center p-2 shadow-[0_0_30px_rgba(160,232,230,0.2)]"
                            >
                                <span className="text-[var(--accent)] mb-2">{labels.core}</span>
                                {labels.coreSubtext && <span className="text-[9px] opacity-60">{labels.coreSubtext}</span>}
                            </motion.div>

                            {/* Arrow */}
                            <div className="h-0.5 w-8 md:w-16 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[var(--accent-secondary)] rotate-45" />
                            </div>

                            {/* Output */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="font-mono shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl border border-[var(--card-border)] bg-[var(--background)] flex items-center justify-center text-xs font-bold text-center p-2"
                            >
                                {labels.output}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
