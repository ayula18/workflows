import React from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface OutcomesGridProps {
    outcomes?: {
        metric: string;
        description: string;
    }[];
}

export default function OutcomesGrid({ outcomes }: OutcomesGridProps) {
    if (!outcomes || outcomes.length === 0) return null;

    return (
        <SectionWrapper className="py-16">
            <div className="flex flex-col items-center max-w-6xl mx-auto space-y-12">

                <div className="text-center space-y-4 mb-4">
                    <h2 className="text-3xl font-bold">Outcomes</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {outcomes.map((outcome, i) => (
                        <div key={i} className="glass-panel p-8 rounded-3xl border border-white/10 shadow-lg flex flex-col items-center text-center justify-center hover:-translate-y-1 transition-transform duration-300">
                            <h3 className="text-4xl md:text-5xl font-black text-[var(--accent)] mb-4">{outcome.metric}</h3>
                            <p className="text-sm md:text-base opacity-70 leading-relaxed max-w-[200px]">
                                {outcome.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </SectionWrapper>
    );
}
