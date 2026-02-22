"use client";

import SectionWrapper from "./SectionWrapper";
import { Mail, Linkedin, ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <footer className="relative border-t border-[var(--card-border)] bg-[var(--background)]">
            <SectionWrapper className="py-24 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Ready to scale your <br />
                    <span className="text-gradient">outbound engine?</span>
                </h2>

                <p className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto mb-12">
                    Stop wasting time on manual data work. Let&apos;s build your custom GTM automation today.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a
                        href="mailto:contact@example.com"
                        className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center gap-3"
                    >
                        Get in touch
                        <ArrowRight className="w-5 h-5" />
                    </a>

                    <div className="flex gap-4">
                        <a href="#" className="p-4 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-4 rounded-full border border-[var(--card-border)] hover:border-[#0077b5] hover:text-[#0077b5] transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-white/5 text-sm opacity-40">
                    © {new Date().getFullYear()} Kapture Automation. All rights reserved.
                </div>
            </SectionWrapper>
        </footer>
    );
}
