import React from 'react';
import { Eye } from 'lucide-react';
import DealKitPreview from './DealKitPreview';
import InvoicePreview from './InvoicePreview';
import FraudCasePreview from './FraudCasePreview';
import DefaultPreview from './DefaultPreview';

export interface PreviewPanelProps {
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
        <div className="rounded-2xl p-6 relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl bg-white dark:bg-[var(--card-bg-solid)]">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                    <Eye className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{data.title}</h3>
            </div>

            {data.type === 'deal-kit' && data.dealKit ? (
                <DealKitPreview data={data.dealKit} />
            ) : data.type === 'invoice' && data.invoiceDetails && data.validation && data.action ? (
                <InvoicePreview data={data} />
            ) : data.type === 'fraud-case' && data.fraudCase ? (
                <FraudCasePreview data={data.fraudCase} />
            ) : (
                <DefaultPreview data={data} />
            )}
        </div>
    );
}
