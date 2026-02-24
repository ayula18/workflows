import React from "react";
import SectionWrapper from "./SectionWrapper";
import { FileSpreadsheet, FileText } from "lucide-react";

interface GeneratedAssetsProps {
    assets?: {
        leftCard: {
            title: string;
            subtitle: string;
            tags: string[];
        };
        rightCard?: {
            title: string;
            subtitle: string;
            items: string[];
        };
    };
}

export default function GeneratedAssets({ assets }: GeneratedAssetsProps) {
    if (!assets) return null;

    return (
        <SectionWrapper className="py-16">
            <div className="flex flex-col items-center max-w-5xl mx-auto space-y-12">

                <div className="text-center space-y-4 mb-4">
                    <h2 className="text-3xl font-bold">What Gets Generated</h2>
                    <p className="text-lg opacity-60">
                        {assets.rightCard ? "Every run produces two ready-to-use artifacts" : "Every run produces a ready-to-use pipeline of creators"}
                    </p>
                </div>

                <div className={`grid gap-8 w-full ${assets.rightCard ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
                    {/* Left Card - Google Sheets */}
                    <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col pt-10 pb-10">
                        <div className="flex items-center gap-4 mb-4 text-[var(--accent)]">
                            <FileSpreadsheet className="w-8 h-8" />
                            <h3 className="text-xl font-bold">{assets.leftCard.title}</h3>
                        </div>
                        <p className="opacity-70 mb-8">{assets.leftCard.subtitle}</p>

                        <div className="flex flex-wrap gap-2">
                            {assets.leftCard.tags.map((tag, i) => (
                                <span key={i} className="font-mono text-[10px] md:text-xs px-2.5 py-1.5 rounded bg-white/5 border border-white/10 opacity-80 uppercase tracking-widest whitespace-nowrap">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Card - Google Docs (Optional) */}
                    {assets.rightCard && (
                        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col pt-10 pb-10">
                            <div className="flex items-center gap-4 mb-4 text-[var(--accent)]">
                                <FileText className="w-8 h-8" />
                                <h3 className="text-xl font-bold">{assets.rightCard.title}</h3>
                            </div>
                            <p className="opacity-70 mb-8">{assets.rightCard.subtitle}</p>

                            <div className="flex flex-wrap gap-2">
                                {assets.rightCard.items.map((item, i) => (
                                    <span key={i} className="flex items-center gap-1.5 font-mono text-[10px] md:text-xs px-2.5 py-1.5 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20 uppercase tracking-widest text-[#e8f1ff]">
                                        <span className="text-[var(--accent)] font-bold">{i + 1}.</span>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </SectionWrapper>
    );
}
