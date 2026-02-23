"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Briefcase, CircleDollarSign, Search, Package, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const categoryIconMap: Record<string, LucideIcon> = {
    "Marketing & GTM": TrendingUp,
    "SaaS & Lead Gen": Briefcase,
    "Fintech": CircleDollarSign,
    "Scraping Tools": Search,
    "Operations": Package,
};

interface AutomationCardProps {
    slug: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    metrics: { label: string; value: string }[];
}

export default function AutomationCard({ slug, title, description, category, tags, metrics }: AutomationCardProps) {
    const IconComponent = categoryIconMap[category] || TrendingUp;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            <Link href={`/automations/${slug}`} className="group block h-full">
                <div className="glass-panel p-6 rounded-2xl h-full border border-white/10 hover:border-[var(--accent)] transition-colors duration-300 relative overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gradient">
                                <IconComponent size={20} strokeWidth={1.5} className="text-white mix-blend-overlay opacity-50 absolute" />
                                <IconComponent size={20} strokeWidth={1.5} />
                            </div>
                            {metrics[0] && (
                                <span className="font-mono text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 text-white border border-white/10 group-hover:border-white/20 uppercase tracking-wider whitespace-nowrap">
                                    {metrics[0].value} {metrics[0].label.toLowerCase()}
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--accent)] group-hover:to-[var(--accent-secondary)] transition-colors">
                            {title}
                        </h3>

                        <p className="text-sm text-gray-300 opacity-70 mb-6 line-clamp-2">
                            {description}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex gap-2 flex-wrap">
                                {tags.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="font-mono text-[10px] uppercase tracking-wider font-medium opacity-50 border border-white/15 bg-white/5 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[var(--accent)] group-hover:to-[var(--accent-secondary)] group-hover:text-black transition-all">
                                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
