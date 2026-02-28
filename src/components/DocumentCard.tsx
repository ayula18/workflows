import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import TagPill from "@/components/ui/TagPill";

export interface DocumentData {
    id: string;
    title: string;
    problemStatement: string;
    proposedSolution: string;
    tags: string[];
    pdfLink: string;
    pptLink?: string;
    gradientClass?: string;
    companyLogoUrl?: string;
    companyName?: string;
    logoBgColor?: string;
    solutionLabel?: string;
    imageClassName?: string;
}

interface DocumentCardProps {
    document: DocumentData;
}

export default function DocumentCard({ document }: DocumentCardProps) {
    return (
        <div className="group block h-full">
            <div className="rounded-2xl h-full border border-slate-200 dark:border-white/10 hover:border-[var(--accent)] transition-colors duration-300 relative overflow-hidden flex flex-col sm:flex-row bg-white dark:bg-[#0B0F19]">
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                {/* Left Side: Visuals */}
                <div
                    className="w-full md:w-80 h-40 md:h-full min-h-[160px] relative z-10 flex-shrink-0 flex items-center justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 overflow-hidden"
                    style={{ backgroundColor: document.logoBgColor || '#0f172a' }}
                >
                    {/* Decorative background elements inside the thumbnail */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent)]/10 rounded-tr-full blur-2xl" />

                    {/* Company Logo Box */}
                    {document.companyLogoUrl ? (
                        <div className="relative w-full h-full max-w-[240px] max-h-[140px]">
                            <Image
                                src={document.companyLogoUrl}
                                alt={document.companyName || "Company Logo"}
                                fill
                                className={`object-contain opacity-90 group-hover:opacity-100 transition-opacity ${document.imageClassName || ''}`}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium text-sm tracking-widest uppercase">
                            {document.companyName || "Logo"}
                        </div>
                    )}

                    {/* Subtle inner shadow effect */}
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none z-10" />
                </div>

                {/* Right Side: Content */}
                <div className="w-full flex-1 p-5 md:p-6 flex flex-col relative z-10 justify-between">
                    <div>
                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap mb-3">
                            {document.tags.map((tag, i) => (
                                <TagPill key={i} tag={tag} />
                            ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--accent)] group-hover:to-[var(--accent-secondary)] transition-colors line-clamp-2">
                            {document.title}
                        </h3>

                        {/* Problem & Solution Text */}
                        <div className="space-y-3 mb-4 text-sm text-slate-500 dark:text-gray-400 opacity-90 leading-relaxed md:text-[15px]">
                            <p>
                                <span className="font-bold text-slate-900 dark:text-white tracking-wide uppercase text-xs">The Problem: </span>
                                {document.problemStatement}
                            </p>
                            <p>
                                <span className="font-bold text-slate-900 dark:text-white tracking-wide uppercase text-xs">{document.solutionLabel || "The Solution:"} </span>
                                {document.proposedSolution}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-2 flex flex-wrap gap-3">
                        <Link
                            href={document.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-sm font-medium transition-all group/btn"
                        >
                            <span>View Deck (PDF)</span>
                            <ExternalLink size={14} className="opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>

                        {document.pptLink && (
                            <Link
                                href={document.pptLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-sm font-medium transition-all group/btn"
                            >
                                <span>View Deck (PPT)</span>
                                <ExternalLink size={14} className="opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
