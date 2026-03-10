import React from 'react';

interface DealKitPreviewProps {
    data: {
        summary: string;
        painPoints: string[];
        nextSteps: string[];
        emailSubject: string;
    };
}

export default function DealKitPreview({ data }: DealKitPreviewProps) {
    if (!data) return null;

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-2">Meeting Summary</p>
                <p className="text-sm text-slate-600 dark:text-gray-300 opacity-90 leading-relaxed max-w-sm">&quot;{data.summary}&quot;</p>
            </div>

            {/* Pain Points */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-2">Top Pain Points</p>
                <ul className="space-y-1.5 text-sm text-slate-600 dark:text-gray-300 opacity-90">
                    {data.painPoints.map((point, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="text-red-400 opacity-80 mt-0.5">•</span>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Next Steps */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-2">Next Steps</p>
                <ul className="space-y-1.5 text-sm opacity-90 text-[var(--accent)] font-medium">
                    {data.nextSteps.map((step, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="opacity-80 mt-0.5">→</span>
                            <span>{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Follow up Email */}
            <div className="pt-2">
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-2">Follow-up Email</p>
                <div className="p-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm mb-2">
                    <span className="opacity-50 mr-2">Subject:</span>
                    <span className="font-medium">&quot;{data.emailSubject}&quot;</span>
                </div>
                <a href="#" className="text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity">
                    [View in Google Docs →]
                </a>
            </div>
        </div>
    );
}
