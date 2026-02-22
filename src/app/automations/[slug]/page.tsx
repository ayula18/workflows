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
                        <span key={i} className="text-xs font-bold px-2 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider opacity-70">
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
                loomVideoUrl={automation.loomVideoUrl}
            />

            <HowItWorks steps={automation.steps} />

            <BeforeAfter before={automation.before} after={automation.after} />

            <TechStack stack={automation.techStack} architectureLabels={automation.architectureLabels} />

            <CallToAction />
        </main>
    );
}
