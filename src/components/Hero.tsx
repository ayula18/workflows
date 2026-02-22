"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Prism = dynamic(() => import("@/components/animations/Prism"), {
    ssr: false,
});

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* WebGL Prism Background */}
            <div className="absolute inset-0 z-0">
                <Prism
                    animationType="hover"
                    hoverStrength={1.5}
                    scale={3.6}
                    glow={1}
                    bloom={1}
                    noise={0.3}
                    hueShift={0}
                    colorFrequency={1}
                    timeScale={0.5}
                    transparent
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

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05] tracking-tight text-white">
                        I&apos;m Ayush Lahoti <br />

                    </h1>

                    <p className="text-lg md:text-lg text-white/50 max-w-2xl mx-auto mb-5 leading-relaxed">
                        Business Generalist with a track record of taking 0&rarr;1 products to market and streamlining sales engines. I combine strategic problem-solving with advanced AI workflow design to help founders scale operations and drive revenue.
                    </p>

                    <div className="flex mt-20 flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#library"
                            className="px-8 py-3.5 rounded-full bg-[var(--accent)] text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                        >
                            View Proof of Work
                        </a>
                        <a
                            href="mailto:ayush_lahoti@pg26.mesaschool.co"
                            className="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/25 transition-all"
                        >
                            Let&apos;s Connect
                        </a>
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
