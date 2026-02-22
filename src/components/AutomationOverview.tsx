"use client";

import SectionWrapper from "./SectionWrapper";
import { Zap, Clock, TrendingUp } from "lucide-react";

interface Metric {
    label: string;
    value: string;
    description?: string;
}

interface AutomationOverviewProps {
    title?: string;
    problemTitle?: string;
    problemDescription?: string;
    solutionDescription?: string;
    metrics?: Metric[];
    loomVideoUrl?: string;
}

export default function AutomationOverview({
    title = "What this automation does",
    problemTitle,
    problemDescription,
    solutionDescription,
    metrics,
    loomVideoUrl,
}: AutomationOverviewProps) {

    const renderMetrics = () => {
        if (!metrics || metrics.length === 0) return null;
        return (
            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 grid gap-8">
                    {metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl border border-white/10 ${i === 0 ? 'bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 text-[var(--accent)]' : i === 1 ? 'bg-gradient-to-br from-[var(--accent-secondary)]/20 to-[var(--accent-secondary)]/5 text-[var(--accent-secondary)]' : 'bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-400'}`}>
                                {i === 0 ? <Clock className="w-6 h-6" /> : i === 1 ? <Zap className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                            </div>
                            <div>
                                <h3 className="font-mono text-3xl font-bold">{metric.value}</h3>
                                <p className="font-mono text-sm opacity-60">{metric.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Video layout: text + metrics on left, Loom video on right
    if (loomVideoUrl) {
        return (
            <SectionWrapper id="overview">
                <div className="mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
                        <span className="text-gradient">{title}</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Text + Compact Metrics */}
                    <div className="space-y-6">
                        <div className="space-y-4 text-lg text-[var(--foreground)] opacity-80">
                            {problemTitle && <h3 className="text-xl font-bold text-white">{problemTitle}</h3>}
                            {problemDescription && <p>{problemDescription}</p>}
                            {solutionDescription && <p>{solutionDescription}</p>}
                        </div>

                        {/* Compact inline metrics */}
                        {metrics && metrics.length > 0 && (
                            <div className="flex flex-wrap gap-4 pt-2">
                                {metrics.map((metric, i) => (
                                    <div key={i} className="flex items-center gap-3 glass-panel rounded-xl px-5 py-3">
                                        <div className={`p-2 rounded-lg border border-white/10 ${i === 0 ? 'bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 text-[var(--accent)]' : 'bg-gradient-to-br from-[var(--accent-secondary)]/20 to-[var(--accent-secondary)]/5 text-[var(--accent-secondary)]'}`}>
                                            {i === 0 ? <Clock className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <span className="font-mono text-xl font-bold">{metric.value}</span>
                                            <p className="font-mono text-xs opacity-60">{metric.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Loom Video */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">Quick Video Demo</h3>
                        <div className="glass-panel rounded-2xl p-2 relative overflow-hidden border border-white/10">
                            <div style={{ position: "relative", paddingBottom: "62.5%", height: 0 }}>
                                <iframe
                                    src={loomVideoUrl}
                                    frameBorder="0"
                                    allowFullScreen
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "12px",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        );
    }

    // Default layout: text on left, metrics on right
    return (
        <SectionWrapper id="overview">
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    <span className="text-gradient">{title}</span>
                </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: Text Content */}
                <div className="space-y-6 text-lg text-[var(--foreground)] opacity-80">
                    {problemTitle && <h3 className="text-xl font-bold text-white">{problemTitle}</h3>}
                    {problemDescription && <p>{problemDescription}</p>}
                    {solutionDescription && <p>{solutionDescription}</p>}
                </div>

                {/* Right: Stats Card */}
                {renderMetrics()}
            </div>
        </SectionWrapper>
    );
}
