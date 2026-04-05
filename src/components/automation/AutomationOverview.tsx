"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import MetricPill from "@/components/ui/MetricPill";
import LoomEmbed from "@/components/ui/LoomEmbed";

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

function MetricsCard({ metrics }: { metrics: Metric[] }) {
    return (
        <div className="rounded-2xl p-8 relative overflow-hidden group bg-white dark:bg-[var(--card-bg-solid)] border border-slate-200 dark:border-[var(--card-border)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 grid gap-8">
                {metrics.map((metric, i) => (
                    <MetricPill key={i} value={metric.value} label={metric.label} index={i} size="lg" />
                ))}
            </div>
        </div>
    );
}

function InlineMetrics({ metrics }: { metrics: Metric[] }) {
    return (
        <div className="flex flex-wrap gap-4 pt-2">
            {metrics.map((metric, i) => (
                <MetricPill key={i} value={metric.value} label={metric.label} index={i} size="sm" />
            ))}
        </div>
    );
}

function OverviewTextContent({
    problemTitle,
    problemDescription,
    solutionDescription,
}: Pick<AutomationOverviewProps, "problemTitle" | "problemDescription" | "solutionDescription">) {
    return (
        <div className="space-y-4 text-lg text-slate-600 dark:text-[var(--foreground)] opacity-80">
            {problemTitle && <h3 className="text-xl font-bold text-slate-900 dark:text-white">{problemTitle}</h3>}
            {problemDescription && <p>{problemDescription}</p>}
            {solutionDescription && <p>{solutionDescription}</p>}
        </div>
    );
}

export default function AutomationOverview({
    title = "What this automation does",
    problemTitle,
    problemDescription,
    solutionDescription,
    metrics,
    loomVideoUrl,
}: AutomationOverviewProps) {

    // Layout when video is extracted to a parent sticky container
    if (loomVideoUrl === "hidden") {
        return (
            <div id="overview" className="mt-12 lg:mt-24 pb-12">
                <div className="mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
                        <span className="text-gradient">{title}</span>
                    </h2>
                </div>

                <div className="space-y-6">
                    <OverviewTextContent
                        problemTitle={problemTitle}
                        problemDescription={problemDescription}
                        solutionDescription={solutionDescription}
                    />
                    {metrics && metrics.length > 0 && <InlineMetrics metrics={metrics} />}
                </div>
            </div>
        );
    }

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
                    <div className="space-y-6">
                        <OverviewTextContent
                            problemTitle={problemTitle}
                            problemDescription={problemDescription}
                            solutionDescription={solutionDescription}
                        />
                        {metrics && metrics.length > 0 && <InlineMetrics metrics={metrics} />}
                    </div>

                    <LoomEmbed src={loomVideoUrl} title="Quick Video Demo" />
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
                <div className="space-y-6 text-lg text-slate-600 dark:text-[var(--foreground)] opacity-80">
                    {problemTitle && <h3 className="text-xl font-bold text-slate-900 dark:text-white">{problemTitle}</h3>}
                    {problemDescription && <p>{problemDescription}</p>}
                    {solutionDescription && <p>{solutionDescription}</p>}
                </div>

                {metrics && metrics.length > 0 && <MetricsCard metrics={metrics} />}
            </div>
        </SectionWrapper>
    );
}
