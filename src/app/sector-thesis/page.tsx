import { sectorThesisData } from "@/lib/data";
import DocumentCard from "@/components/DocumentCard";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata = {
    title: "Sector Thesis | Kapture GTM",
    description: "In-depth market research and investment memos.",
};

export default function SectorThesisPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Sector <span className="text-gradient">Thesis</span>
                    </h1>
                    <p className="text-xl opacity-60 max-w-2xl mx-auto">
                        In-depth market research, architectural analysis, and investment memos.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                    {sectorThesisData.map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
