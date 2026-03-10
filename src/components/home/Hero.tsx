"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Bot } from "lucide-react";
import TypewriterHeading from "@/components/animations/TypewriterHeading";

const Prism = dynamic(() => import("@/components/animations/Prism"), {
    ssr: false,
});

export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* WebGL Prism Background */}
            <div className="absolute inset-0 z-0">
                <Prism
                    animationType="hover"
                    hoverStrength={isMobile ? 0.8 : 1.5}
                    scale={isMobile ? 2.0 : 3.6}
                    glow={isMobile ? 1.5 : 1}
                    bloom={1}
                    noise={0.3}
                    hueShift={0}
                    colorFrequency={1}
                    timeScale={0.5}
                    transparent
                    suspendWhenOffscreen={true}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/60 via-transparent to-[var(--background)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-6 opacity-80">
                        Business Generalist | Founders Office | AI Automation Expert
                    </p>

                    <TypewriterHeading />

                    <p className="text-lg md:text-lg text-slate-500 dark:text-white/50 max-w-2xl mx-auto mb-5 leading-relaxed">
                        Business Generalist with a track record of taking 0&rarr;1 products to market and streamlining sales engines. I combine strategic problem-solving with advanced AI workflow design to help founders scale operations and drive revenue.
                    </p>

                    <div className="flex mt-20 flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.dispatchEvent(new CustomEvent('open-chat-widget'));
                            }}
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white font-semibold text-sm hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            <Bot size={18} className="mr-2 opacity-80" />
                            Talk to my AI
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <a href="#library" className="opacity-40 hover:opacity-70 transition-opacity">
                    <ArrowDown className="w-5 h-5" />
                </a>
            </motion.div>
        </section>
    );
}
