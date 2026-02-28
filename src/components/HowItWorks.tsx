"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Step {
    title: string;
    description: string;
}

interface HowItWorksProps {
    steps: Step[];
}

export default function HowItWorks({ steps }: HowItWorksProps) {
    return (
        <SectionWrapper id="how-it-works" className="bg-slate-50/50 dark:bg-[var(--card-bg)]/30 border-y border-slate-200 dark:border-[var(--card-border)] backdrop-blur-sm">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                    How the workflow runs <span className="text-gradient">end to end</span>
                </h2>
                <p className="text-slate-500 dark:text-[var(--foreground)] opacity-80 dark:opacity-60">From raw data to booked meetings in {steps.length} autonomous steps</p>
            </div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-secondary)] to-transparent opacity-30" />

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white dark:bg-[var(--background)] border border-slate-200 dark:border-[var(--card-border)] flex items-center justify-center mb-6 relative z-10 group-hover:border-[var(--accent)] transition-colors duration-300">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-[var(--card-bg)] flex items-center justify-center">
                                        <span className="text-2xl font-bold font-mono text-gradient">{index + 1}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--accent)] group-hover:to-[var(--accent-secondary)] transition-all duration-300">{step.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-[var(--foreground)] opacity-80 dark:opacity-60 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Icon (Mobile) */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center my-4 opacity-20">
                                    <ArrowRight className="rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
