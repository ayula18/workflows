import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { automations } from "@/lib/data";
import SectionWrapper from "@/components/SectionWrapper";
import AutomationOverview from "@/components/AutomationOverview";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import TechStack from "@/components/TechStack";
import CallToAction from "@/components/CallToAction";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const automation = automations[slug];

    if (!automation) {
        return {
            title: "Automation Not Found",
        };
    }

    return {
        title: `${automation.title} | Kapture GTM`,
        description: automation.description,
    };
}

export default async function AutomationPage({ params }: PageProps) {
    const { slug } = await params;
    const automation = automations[slug];

    if (!automation) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24">
            {automation.loomVideoUrl ? (
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Unified Grid: Hero Text + Impact Summary on left, Sticky Video on right */}
                    <div className="grid lg:grid-cols-[1fr_45%] gap-12 relative pb-12">
                        {/* Left Column (Hero + Summary) */}
                        <div className="flex flex-col">
                            {/* Hero Section Content */}
                            <div className="pb-12 pt-8">
                                <Link
                                    href="/automations"
                                    className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-colors mb-8"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Automations
                                </Link>

                                <div className="mb-6 flex gap-2">
                                    {automation.tags.map((tag, i) => (
                                        <span key={i} className="font-mono text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider opacity-70">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                    {automation.title}
                                </h1>
                                <p className="text-xl md:text-1xl opacity-60 max-w-3xl">
                                    {automation.description}
                                </p>
                            </div>

                            {/* Impact Summary Section Content */}
                            <AutomationOverview
                                title="Impact Summary"
                                problemTitle={automation.problem.title}
                                problemDescription={automation.problem.description}
                                solutionDescription={automation.solution}
                                metrics={automation.metrics}
                                loomVideoUrl="hidden" // Renders left-column layout (extracts video to parent)
                            />
                        </div>

                        {/* Right Column (Sticky Video Container) */}
                        <div className="lg:sticky lg:top-36 lg:h-fit lg:pt-8">
                            <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">Quick Video Demo</h3>
                            <div className="glass-panel rounded-2xl p-2 relative overflow-hidden border border-white/10 shadow-2xl">
                                <div style={{ position: "relative", paddingBottom: "62.5%", height: 0 }}>
                                    <iframe
                                        src={automation.loomVideoUrl}
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
                </div>
            ) : (
                <>
                    <SectionWrapper className="pb-12">
                        <Link
                            href="/automations"
                            className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Automations
                        </Link>

                        <div className="mb-6 flex gap-2">
                            {automation.tags.map((tag, i) => (
                                <span key={i} className="font-mono text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider opacity-70">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {automation.title}
                        </h1>
                        <p className="text-xl md:text-2xl opacity-60 max-w-3xl">
                            {automation.description}
                        </p>
                    </SectionWrapper>

                    <AutomationOverview
                        title="Impact Summary"
                        problemTitle={automation.problem.title}
                        problemDescription={automation.problem.description}
                        solutionDescription={automation.solution}
                        metrics={automation.metrics}
                    />
                </>
            )}

            <HowItWorks steps={automation.steps} />

            <BeforeAfter before={automation.before} after={automation.after} />

            <TechStack stack={automation.techStack} architectureLabels={automation.architectureLabels} />

            <CallToAction />
        </main>
    );
}
