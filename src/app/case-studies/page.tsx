import { caseStudiesData } from "@/lib/data";
import DocumentCard from "@/components/DocumentCard";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata = {
    title: "Case Studies | Kapture GTM",
    description: "Explore our strategic case studies and deep-dives.",
};

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
                        Case <span className="text-gradient">Studies</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-gray-400 opacity-80 dark:opacity-60 max-w-2xl mx-auto">
                        Deep dives into strategic problems and the comprehensive solutions we designed.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                    {caseStudiesData.map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
