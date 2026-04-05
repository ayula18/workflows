import Link from "next/link";
import { ArrowRight, TrendingUp, Briefcase, CircleDollarSign, Search, Package, type LucideIcon } from "lucide-react";
import { Automation } from "@/lib/data";

const categoryIconMap: Record<string, LucideIcon> = {
    "Marketing & GTM": TrendingUp,
    "SaaS & Lead Gen": Briefcase,
    "Fintech": CircleDollarSign,
    "Scraping Tools": Search,
    "Operations": Package,
};

interface AutomationCardProps {
    automation: Automation;
}

export default function AutomationCard({ automation }: AutomationCardProps) {
    const IconComponent = categoryIconMap[automation.category] || TrendingUp;

    return (
        <Link href={`/automations/${automation.slug}`} className="group block h-full">
            <div className="p-6 rounded-2xl h-full min-h-[285px] border border-slate-200 hover:border-[var(--accent)] dark:border-white/10 dark:hover:border-[var(--accent)] transition-colors duration-300 relative overflow-hidden bg-white dark:bg-[var(--card-bg-solid)] flex flex-col">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-gradient">
                            <IconComponent size={20} strokeWidth={1.5} className="text-slate-400 dark:text-white mix-blend-overlay opacity-50 absolute" />
                            <IconComponent size={20} strokeWidth={1.5} />
                        </div>
                        {automation.metrics[0] && (
                            <span className="font-mono text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/20 uppercase tracking-wider whitespace-nowrap">
                                {automation.metrics[0].value} {automation.metrics[0].label.toLowerCase()}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--accent)] group-hover:to-[var(--accent-secondary)] transition-colors">
                        {automation.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-gray-300 opacity-70 mb-6 line-clamp-4">
                        {automation.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                            {automation.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="font-mono text-[10px] uppercase tracking-wider font-medium text-slate-500 dark:text-gray-400 opacity-70 dark:opacity-50 border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[var(--accent)] group-hover:to-[var(--accent-secondary)] group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
