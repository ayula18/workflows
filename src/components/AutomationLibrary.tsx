"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { automations, categories, caseStudiesData, sectorThesisData } from "@/lib/data";
import AutomationCard from "@/components/AutomationCard";
import DocumentCard from "@/components/DocumentCard";
import SectionWrapper from "@/components/SectionWrapper";

type TabId = 'automations' | 'case-studies' | 'sector-thesis';

const tabs: { id: TabId; label: string }[] = [
    { id: 'automations', label: 'Automations' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'sector-thesis', label: 'Sector Thesis' },
];

export default function AutomationLibrary() {
    const allAutomations = Object.values(automations);
    const [activeTab, setActiveTab] = useState<TabId>('automations');

    return (
        <SectionWrapper id="library" className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
                    Proof of Work
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A collection of business bottlenecks I&apos;ve solved. Explore my execution across operational automations, strategic case studies, and market research.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-16 px-4">
                <div className="flex bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? "text-slate-900"
                                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                                }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full"
                                    transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'automations' && (
                        <div>
                            {categories.map((cat, idx) => {
                                const items = allAutomations.filter(a => a.category === cat.key);
                                if (items.length === 0) return null;
                                return (
                                    <div key={cat.key} className={idx < categories.length - 1 ? "mb-20" : ""}>
                                        <div className="flex items-center gap-3 mb-8">
                                            <h3 className="text-2xl font-bold">{cat.label}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${cat.badgeClass}`}>
                                                {items.length}
                                            </span>
                                        </div>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {items.map(automation => (
                                                <AutomationCard key={automation.slug} automation={automation} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === 'case-studies' && (
                        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {caseStudiesData.map((doc) => (
                                <DocumentCard key={doc.id} document={doc} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'sector-thesis' && (
                        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {sectorThesisData.map((doc) => (
                                <DocumentCard key={doc.id} document={doc} />
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </SectionWrapper>
    );
}
