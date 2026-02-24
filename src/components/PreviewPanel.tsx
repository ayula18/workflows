import React from 'react';
import { Eye } from 'lucide-react';

interface PreviewPanelProps {
    data: {
        type?: "table" | "deal-kit" | "invoice" | "fraud-case";
        title: string;
        chips?: string[];
        miniRow?: {
            url: string;
            hook: string;
            pillar: string;
            why: string;
            replication: string;
        };
        dealKit?: {
            summary: string;
            painPoints: string[];
            nextSteps: string[];
            emailSubject: string;
        };
        invoiceDetails?: {
            vendor: string;
            invoiceNumber: string;
            invoiceDate: string;
            dueDate: string;
            amount: string;
            gstin: string;
        };
        validation?: {
            poMatch: string;
            duplicateCheck: string;
        };
        action?: {
            status: string;
        };
        fraudCase?: {
            callType: string;
            fraudCategory: string;
            riskLevel: string;
            keySignals: string[];
            recommendedAction: string;
        };
    };
}

export default function PreviewPanel({ data }: PreviewPanelProps) {
    if (!data) return null;

    return (
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                    <Eye className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-bold text-lg">{data.title}</h3>
            </div>

            {data.type === 'deal-kit' && data.dealKit ? (
                <div className="space-y-6">
                    {/* Summary */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-2">Meeting Summary</p>
                        <p className="text-sm opacity-90 leading-relaxed max-w-sm">"{data.dealKit.summary}"</p>
                    </div>

                    {/* Pain Points */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-2">Top Pain Points</p>
                        <ul className="space-y-1.5 text-sm opacity-90">
                            {data.dealKit.painPoints.map((point, i) => (
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
                            {data.dealKit.nextSteps.map((step, i) => (
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
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm mb-2">
                            <span className="opacity-50 mr-2">Subject:</span>
                            <span className="font-medium">"{data.dealKit.emailSubject}"</span>
                        </div>
                        <a href="#" className="text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity">
                            [View in Google Docs →]
                        </a>
                    </div>
                </div>
            ) : data.type === 'invoice' && data.invoiceDetails && data.validation && data.action ? (
                <div className="space-y-6">
                    {/* Invoice Details */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Invoice Details (Extracted)</p>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="opacity-60">Vendor:</div>
                            <div className="font-medium">{data.invoiceDetails.vendor}</div>
                            <div className="opacity-60">Invoice #:</div>
                            <div className="font-mono text-xs mt-0.5">{data.invoiceDetails.invoiceNumber}</div>
                            <div className="opacity-60">Invoice Date:</div>
                            <div className="font-medium">{data.invoiceDetails.invoiceDate}</div>
                            <div className="opacity-60">Due Date:</div>
                            <div className="font-medium">{data.invoiceDetails.dueDate}</div>
                            <div className="opacity-60">Amount:</div>
                            <div className="font-medium text-[var(--accent)]">{data.invoiceDetails.amount}</div>
                            <div className="opacity-60">GSTIN:</div>
                            <div className="font-mono text-xs opacity-80 mt-0.5">{data.invoiceDetails.gstin}</div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10" />

                    {/* Validation */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Validation</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center bg-white/5 rounded-md p-2 border border-white/5">
                                <span className="opacity-70">PO Match:</span>
                                <span className="text-red-400 font-medium">"{data.validation.poMatch}" <span className="text-xs opacity-60 ml-1">(Flagged)</span></span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 rounded-md p-2 border border-white/5">
                                <span className="opacity-70">Duplicate Check:</span>
                                <span className="text-green-400 font-medium">"{data.validation.duplicateCheck}"</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10" />

                    {/* Action */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Action</p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="opacity-70 text-sm">Status:</span>
                            <span className="font-semibold text-orange-400">"{data.action.status}"</span>
                        </div>
                        <a href="#" className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity">
                            [Open AP Ledger Row →]
                        </a>
                    </div>
                </div>
            ) : data.type === 'fraud-case' && data.fraudCase ? (
                <div className="space-y-6">
                    {/* Call Classification */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Call Classification</p>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="opacity-60 mt-1">Call Type:</div>
                            <div className="font-medium bg-white/5 border border-white/10 rounded px-2 py-1 w-fit">{data.fraudCase.callType}</div>
                            <div className="opacity-60 mt-1">Fraud Category:</div>
                            <div className="font-medium mt-1">{data.fraudCase.fraudCategory}</div>
                            <div className="opacity-60 mt-1">Risk Level:</div>
                            <div className="font-medium text-red-400 mt-1">"{data.fraudCase.riskLevel}" <span className="text-xs opacity-60 ml-1 text-white">(Flagged)</span></div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10" />

                    {/* Key Signals */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Key Signals Extracted</p>
                        <ul className="space-y-2 text-sm opacity-90">
                            {data.fraudCase.keySignals.map((signal, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-[var(--accent)] opacity-80 mt-0.5">•</span>
                                    <span>{signal}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="h-px w-full bg-white/10" />

                    {/* Action */}
                    <div>
                        <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Recommended Action</p>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm mb-4 text-[#e8f1ff]">
                            "{data.fraudCase.recommendedAction}"
                        </div>
                        <a href="#" className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity">
                            [Open Full Report →]
                        </a>
                    </div>
                </div>
            ) : (
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
                            <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm font-mono overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="opacity-50 text-[10px] uppercase tracking-wider border-b border-white/10">
                                            <th className="pb-3 font-medium">Reel URL</th>
                                            <th className="pb-3 font-medium">Hook</th>
                                            <th className="pb-3 font-medium">Pillar</th>
                                            <th className="pb-3 pl-4 font-medium">Why it Worked</th>
                                            <th className="pb-3 pl-4 font-medium text-[var(--accent)]">Replication Idea</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-xs text-[#e8f1ff] whitespace-nowrap">
                                            <td className="pt-4 pr-4 text-blue-400 truncate max-w-[120px]">{data.miniRow.url}</td>
                                            <td className="pt-4 pr-4 truncate max-w-[150px] opacity-90">{data.miniRow.hook}</td>
                                            <td className="pt-4 pr-4 opacity-70"><span className="px-2 py-1 rounded bg-white/10 text-[10px]">{data.miniRow.pillar}</span></td>
                                            <td className="pt-4 pl-4 pr-4 opacity-90 truncate max-w-[200px]">{data.miniRow.why}</td>
                                            <td className="pt-4 pl-4 text-[var(--accent)] truncate max-w-[200px]">{data.miniRow.replication}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
