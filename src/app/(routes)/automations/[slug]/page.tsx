import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";
import { automations } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AutomationOverview from "@/components/automation/AutomationOverview";
import HowItWorks from "@/components/home/HowItWorks";
import BeforeAfter from "@/components/animations/BeforeAfter";
import TechStack from "@/components/home/TechStack";
import CallToAction from "@/components/home/CallToAction";
import WorkflowArchitecture from "@/components/home/WorkflowArchitecture";
import GeneratedAssets from "@/components/documents/GeneratedAssets";
import PreviewPanel from "@/components/preview/PreviewPanel";
import LoomEmbed from "@/components/ui/LoomEmbed";
import TagPill from "@/components/ui/TagPill";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.keys(automations).map((slug) => ({ slug }));
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
                                        <TagPill key={i} tag={tag} className="rounded-full opacity-70" />
                                    ))}
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                                    {automation.title}
                                </h1>
                                <p className="text-xl md:text-1xl text-slate-500 dark:text-gray-400 opacity-80 dark:opacity-60 max-w-3xl">
                                    {automation.description}
                                </p>
                            </div>

                            {/* Impact Summary Section Content */}
                            {automation.metricsPills ? (
                                <div className="mt-4 pb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 opacity-70 dark:opacity-50 mb-4">Impact</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {automation.metricsPills.map((pill, idx) => (
                                            <div key={idx} className="px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 backdrop-blur-sm text-sm font-medium">
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
                                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 space-y-16">
                                    {/* The Problem */}
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{automation.problem.title}</h2>
                                        <p className="text-lg text-slate-600 dark:text-gray-300 opacity-80 dark:opacity-70 leading-relaxed font-light">
                                            {automation.problem.description}
                                        </p>
                                        <ul className="space-y-4 mt-6">
                                            {automation.problemPoints.map((point, i) => (
                                                <li key={i} className="flex items-start gap-4">
                                                    <XCircle className="w-5 h-5 text-red-500/80 mt-0.5 shrink-0" />
                                                    <span className="text-slate-600 dark:text-gray-300 opacity-80 leading-snug">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Built For */}
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Built For</h2>
                                        <div className="flex flex-col gap-6 pt-2">
                                            {automation.builtFor.map((persona, i) => (
                                                <div key={i} className="flex flex-col gap-1.5 border-l-2 border-slate-300 dark:border-white/10 pl-5">
                                                    <h3 className="text-xl font-semibold inline-block text-gradient pb-1">{persona.persona}</h3>
                                                    <p className="text-slate-500 dark:text-gray-400 opacity-80 dark:opacity-70 leading-relaxed text-sm max-w-lg">
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
                                <LoomEmbed src={automation.loomVideoUrl} title="Quick Video Demo" />
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
                                <TagPill key={i} tag={tag} className="rounded-full opacity-70" />
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            {automation.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-gray-400 opacity-80 dark:opacity-60 max-w-3xl">
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
