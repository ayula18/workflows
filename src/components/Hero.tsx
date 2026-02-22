"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
    const scrollToLibrary = () => {
        const element = document.getElementById("library");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-secondary)] rounded-full mix-blend-screen filter blur-[128px] opacity-20" />

            <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] mb-6">
                        <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                        <span className="text-sm font-medium text-[var(--foreground)] opacity-80">
                            AI Automation Architect
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Ayush <br />
                        <span className="text-gradient">Lahoti</span>
                    </h1>

                    <div className="text-lg md:text-xl text-[var(--foreground)] opacity-70 mb-8 max-w-lg space-y-2">
                        <p>PGP Startup Leadership @ Mesa School of Business &apos;26</p>
                        <p>Building production-ready AI workflows on n8n</p>
                        <p className="text-sm opacity-60">Ex-Founder @ SocialTix Solutions | 15+ AI automations delivered</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={scrollToLibrary}
                            className="group relative px-8 py-4 bg-[var(--accent)] text-black font-semibold rounded-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Explore All Automations
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>
                </motion.div>

                {/* Right Visual - Keeping it abstract but simpler */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative h-[400px] w-full hidden lg:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--card-bg)] to-transparent rounded-2xl border border-[var(--card-border)] backdrop-blur-sm p-8 flex flex-col justify-center">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-bold">n8n</div>
                                <div className="flex-1 h-2 bg-white/10 rounded" />
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 ml-8">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">AI</div>
                                <div className="flex-1 h-2 bg-white/10 rounded" />
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">$</div>
                                <div className="flex-1 h-2 bg-white/10 rounded" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
