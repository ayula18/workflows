import React from 'react';

interface FraudCasePreviewProps {
    data: {
        callType: string;
        fraudCategory: string;
        riskLevel: string;
        keySignals: string[];
        recommendedAction: string;
    };
}

export default function FraudCasePreview({ data }: FraudCasePreviewProps) {
    if (!data) return null;

    return (
        <div className="space-y-6">
            {/* Call Classification */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Call Classification</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="opacity-60 mt-1">Call Type:</div>
                    <div className="font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded px-2 py-1 w-fit">{data.callType}</div>
                    <div className="opacity-60 mt-1">Fraud Category:</div>
                    <div className="font-medium mt-1">{data.fraudCategory}</div>
                    <div className="opacity-60 mt-1">Risk Level:</div>
                    <div className="font-medium text-red-400 mt-1">&quot;{data.riskLevel}&quot; <span className="text-xs opacity-60 ml-1 text-slate-500 dark:text-white">(Flagged)</span></div>
                </div>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-white/10" />

            {/* Key Signals */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Key Signals Extracted</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-300 opacity-90">
                    {data.keySignals.map((signal, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="text-[var(--accent)] opacity-80 mt-0.5">•</span>
                            <span>{signal}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-white/10" />

            {/* Action */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Recommended Action</p>
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm mb-4 text-slate-700 dark:text-[#e8f1ff]">
                    &quot;{data.recommendedAction}&quot;
                </div>
                <a href="#" className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity">
                    [Open Full Report →]
                </a>
            </div>
        </div>
    );
}
