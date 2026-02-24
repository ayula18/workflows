import React from "react";
import SectionWrapper from "./SectionWrapper";

interface WorkflowArchitectureProps {
    nodes?: {
        title: string;
        description: string;
    }[];
    techStack?: string[];
}

export default function WorkflowArchitecture({ nodes, techStack }: WorkflowArchitectureProps) {
    if (!nodes || nodes.length === 0) return null;

    return (
        <SectionWrapper className="py-16">
            <div className="flex flex-col items-center max-w-5xl mx-auto space-y-12">

                <div className="text-center space-y-4 mb-4">
                    <h2 className="text-3xl font-bold">How the Workflow Runs</h2>
                    <p className="text-lg opacity-60">From raw input to client-ready execution</p>
                </div>

                <div className="w-full relative rounded-2xl glass-panel py-12 px-4 md:px-12 flex flex-col items-center overflow-hidden border border-white/5 shadow-2xl">
                    {/* Abstract Architecture Diagram Background */}
                    <div className="absolute inset-0 bg-grid-white/[0.02]" />

                    <div className="relative z-10 flex items-start justify-center gap-2 md:gap-4 overflow-x-auto no-scrollbar w-full px-2">
                        {nodes.map((node, i) => {
                            // Automatically highlight nodes resembling "Core Processing" or AI steps
                            const isHighlighted = node.title.toLowerCase().match(/(llm|agent|claude|gpt|core|matching)/);
                            return (
                                <React.Fragment key={i}>
                                    <div className="flex flex-col items-center justify-center w-24 md:w-32 shrink-0">
                                        {/* Node Box */}
                                        <div className={`font-mono w-full aspect-square rounded-xl flex items-center justify-center text-[10px] md:text-sm font-bold text-center p-3 leading-relaxed transition-colors ${isHighlighted
                                            ? "border-2 border-emerald-400 bg-emerald-400/10 shadow-[0_0_30px_rgba(52,211,153,0.2)] text-emerald-400"
                                            : "border border-[var(--card-border)] bg-[var(--background)] shadow-xl hover:border-[var(--accent)]/50 text-white"
                                            }`}>
                                            {node.title}
                                        </div>
                                    </div>

                                    {/* Connecting Arrow */}
                                    {i < nodes.length - 1 && (
                                        <div className="h-0.5 w-6 md:w-12 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] relative shrink-0 self-center">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[var(--accent-secondary)] rotate-45" />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Tech Stack Pills below */}
                {techStack && techStack.length > 0 && (
                    <div className="w-full flex flex-col items-center gap-4">
                        <p className="text-xs uppercase tracking-widest opacity-40 font-semibold">Tech Stack</p>
                        <div className="flex flex-wrap justify-center items-center gap-3">
                            {techStack.map((tech, idx) => (
                                <span key={idx} className="font-mono text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors opacity-80 cursor-default font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
}
