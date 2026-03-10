import React from 'react';

interface DefaultPreviewProps {
    data: {
        chips?: string[];
        miniRow?: {
            url: string;
            hook: string;
            pillar: string;
            why: string;
            replication: string;
        };
    };
}

export default function DefaultPreview({ data }: DefaultPreviewProps) {
    if (!data) return null;

    return (
        <>
            {/* Chips */}
            {data.chips && (
                <div className="mb-6 space-y-3">
                    <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono">Analyzed Dimensions</p>
                    <div className="flex flex-wrap gap-2">
                        {data.chips.map((chip, i) => (
                            <span key={i} className="font-mono text-[10px] md:text-xs px-2.5 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 uppercase tracking-widest whitespace-nowrap">
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Mini Row */}
            {data.miniRow && (
                <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono">Output Example</p>
                    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 p-4 text-sm font-mono overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="opacity-50 text-[10px] uppercase tracking-wider border-b border-slate-200 dark:border-white/10">
                                    <th className="pb-3 font-medium">Reel URL</th>
                                    <th className="pb-3 font-medium">Hook</th>
                                    <th className="pb-3 font-medium">Pillar</th>
                                    <th className="pb-3 pl-4 font-medium">Why it Worked</th>
                                    <th className="pb-3 pl-4 font-medium text-[var(--accent)]">Replication Idea</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-xs text-slate-700 dark:text-[#e8f1ff] whitespace-nowrap">
                                    <td className="pt-4 pr-4 text-blue-400 truncate max-w-[120px]">{data.miniRow.url}</td>
                                    <td className="pt-4 pr-4 truncate max-w-[150px] opacity-90">{data.miniRow.hook}</td>
                                    <td className="pt-4 pr-4 opacity-70"><span className="px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-[10px]">{data.miniRow.pillar}</span></td>
                                    <td className="pt-4 pl-4 pr-4 opacity-90 truncate max-w-[200px]">{data.miniRow.why}</td>
                                    <td className="pt-4 pl-4 text-[var(--accent)] truncate max-w-[200px]">{data.miniRow.replication}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
