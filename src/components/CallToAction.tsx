"use client";

import SectionWrapper from "./SectionWrapper";
import AnimatedText from "./AnimatedText";
import { Mail, Linkedin, FileDown } from "lucide-react";

export default function CallToAction() {
    return (
        <footer className="relative border-t border-[var(--card-border)] bg-[var(--background)]">
            <SectionWrapper className="py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: CTA + Links */}
                    <div className="flex flex-col items-start gap-8">
                        <div className="text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                                Let&apos;s discuss your <br />
                                <span className="text-gradient">next bottleneck.</span>
                            </h2>
                            <p className="text-gray-400 max-w-md">
                                I&apos;m currently exploring Founder&apos;s Office, Chief of Staff, and Business Generalist roles at high-growth SaaS and AI companies. Let&apos;s connect.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href="mailto:ayush_lahoti@pg26.mesaschool.co"
                                className="p-3.5 rounded-full border border-white/10 bg-white/5 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ayush-lahoti"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3.5 rounded-full border border-white/10 bg-white/5 hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3.5 rounded-full border border-white/10 bg-white/5 hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]/10 transition-all duration-300"
                                aria-label="Download Resume"
                            >
                                <FileDown className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Right: GSAP Animated Text */}
                    <div className="flex flex-col items-end text-right">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-gradient mb-4 opacity-90">
                            Fueled by
                        </p>
                        <AnimatedText />
                        <p className="text-sm text-gray-400 mt-4 max-w-md">
                            I approach every problem with fresh perspective, solve it through creative engineering, and ship it as real, working automation.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-xs text-gray-500 tracking-wider">
                        © {new Date().getFullYear()} Ayush Lahoti
                    </p>
                    <div className="flex gap-6">
                        <a href="/automations" className="font-mono text-xs text-gray-500 hover:text-[var(--accent)] transition-colors tracking-wider">
                            Proof of Work
                        </a>
                        <a href="mailto:ayush_lahoti@pg26.mesaschool.co" className="font-mono text-xs text-gray-500 hover:text-[var(--accent)] transition-colors tracking-wider">
                            Contact
                        </a>
                    </div>
                </div>
            </SectionWrapper>
        </footer>
    );
}
