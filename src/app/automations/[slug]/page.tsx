import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";
import { automations } from "@/lib/data";
import SectionWrapper from "@/components/SectionWrapper";
import AutomationOverview from "@/components/AutomationOverview";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import TechStack from "@/components/TechStack";
import CallToAction from "@/components/CallToAction";
import WorkflowArchitecture from "@/components/WorkflowArchitecture";
import GeneratedAssets from "@/components/GeneratedAssets";
import PreviewPanel from "@/components/PreviewPanel";

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
            {(automation.loomVideoUrl || automation.previewPanel) ? (
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
                            {automation.metricsPills ? (
                                <div className="mt-4 pb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-4">Impact</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {automation.metricsPills.map((pill, idx) => (
                                            <div key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium">
                                                <span className="text-[var(--accent)] font-bold mr-2">{pill.split(' ')[0]}</span>
                                                <span className="opacity-90">{pill.split(' ').slice(1).join(' ')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <AutomationOverview
                                    title="Impact Summary"
                                    problemTitle={automation.problem.title}
                                    problemDescription={automation.problem.description}
                                    solutionDescription={automation.solution}
                                    metrics={automation.metrics}
                                    loomVideoUrl="hidden" // Renders left-column layout (extracts video to parent)
                                />
                            )}

                            {/* Conditionally render Problem & Built For immediately below Hero in the Left Column */}
                            {automation.problemPoints && automation.builtFor ? (
                                <div className="mt-8 pt-8 border-t border-white/5 space-y-16">
                                    {/* The Problem */}
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold">{automation.problem.title}</h2>
                                        <p className="text-lg opacity-70 leading-relaxed font-light">
                                            {automation.problem.description}
                                        </p>
                                        <ul className="space-y-4 mt-6">
                                            {automation.problemPoints.map((point, i) => (
                                                <li key={i} className="flex items-start gap-4">
                                                    <XCircle className="w-5 h-5 text-red-500/80 mt-0.5 shrink-0" />
                                                    <span className="opacity-80 leading-snug">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Built For */}
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold">Built For</h2>
                                        <div className="flex flex-col gap-6 pt-2">
                                            {automation.builtFor.map((persona, i) => (
                                                <div key={i} className="flex flex-col gap-1.5 border-l-2 border-white/10 pl-5">
                                                    <h3 className="text-xl font-semibold inline-block text-gradient pb-1">{persona.persona}</h3>
                                                    <p className="opacity-70 leading-relaxed text-sm max-w-lg">
                                                        {persona.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Right Column (Sticky Container) */}
                        <div className="lg:sticky lg:top-36 lg:h-fit lg:pt-8">
                            {automation.loomVideoUrl ? (
                                <>
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
                                </>
                            ) : automation.previewPanel ? (
                                <PreviewPanel data={automation.previewPanel} />
                            ) : null}
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

            {/* Conditionally render new layout sections if the data is present; fallback to old ones otherwise */}

            <BeforeAfter before={automation.before} after={automation.after} />

            {automation.workflowNodes ? (
                <WorkflowArchitecture nodes={automation.workflowNodes} techStack={automation.workflowTechStack || []} />
            ) : (
                <>
                    <HowItWorks steps={automation.steps} />
                    <TechStack stack={automation.techStack} architectureLabels={automation.architectureLabels} />
                </>
            )}

            {automation.generatedAssets ? (
                <GeneratedAssets assets={automation.generatedAssets} />
            ) : null}

            <CallToAction />
        </main>
    );
}
