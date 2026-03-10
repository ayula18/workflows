import React from 'react';

interface InvoicePreviewProps {
    data: {
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
    };
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
    if (!data.invoiceDetails || !data.validation || !data.action) return null;

    return (
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

            <div className="h-px w-full bg-slate-200 dark:bg-white/10" />

            {/* Validation */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Validation</p>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-slate-100 dark:bg-white/5 rounded-md p-2 border border-slate-200 dark:border-white/5">
                        <span className="opacity-70">PO Match:</span>
                        <span className="text-red-400 font-medium">&quot;{data.validation.poMatch}&quot; <span className="text-xs opacity-60 ml-1">(Flagged)</span></span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-100 dark:bg-white/5 rounded-md p-2 border border-slate-200 dark:border-white/5">
                        <span className="opacity-70">Duplicate Check:</span>
                        <span className="text-green-400 font-medium">&quot;{data.validation.duplicateCheck}&quot;</span>
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-white/10" />

            {/* Action */}
            <div>
                <p className="text-xs uppercase tracking-wider opacity-50 font-semibold font-mono mb-3">Action</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="opacity-70 text-sm">Status:</span>
                    <span className="font-semibold text-orange-400">&quot;{data.action.status}&quot;</span>
                </div>
                <a href="#" className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity">
                    [Open AP Ledger Row →]
                </a>
            </div>
        </div>
    );
}
