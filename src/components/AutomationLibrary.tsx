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
    const [activeCategory, setActiveCategory] = useState<string>(categories[0].key);

    return (
        <SectionWrapper id="library" className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                    Proof of Work
                </h2>
                <p className="text-xl text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
                    A collection of business bottlenecks I&apos;ve solved. Explore my execution across operational automations, strategic case studies, and market research.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-16 px-4">
                <div className="flex bg-slate-100 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-1.5 rounded-full overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? "text-white dark:text-slate-900"
                                : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 hover:bg-slate-200/50 dark:hover:bg-white/5"
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
                        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto w-full">
                            {/* Left Sidebar Menu */}
                            <div className="md:w-64 lg:w-72 shrink-0">
                                <div className="sticky top-24">
                                    {/* Heading */}
                                    <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 pl-4">
                                        Browse Automations For
                                    </h4>

                                    <div className="flex flex-col gap-1 relative pl-2">
                                        {/* Continuous Vertical Line */}
                                        <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-white/5 z-0" />

                                        {categories.map((cat) => {
                                            const isActive = activeCategory === cat.key;
                                            return (
                                                <button
                                                    key={cat.key}
                                                    onClick={() => setActiveCategory(cat.key)}
                                                    className={`group relative flex items-center gap-4 py-3.5 pr-4 w-full text-left outline-none rounded-xl transition-all ${isActive ? 'z-10 bg-white/40 dark:bg-transparent' : 'z-0 hover:bg-slate-50 dark:hover:bg-white/[0.02]'}`}
                                                >
                                                    {/* Active Indicator Box */}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="active-category-box"
                                                            className="absolute inset-0 border border-[var(--accent)]/30 rounded-xl bg-gradient-to-r from-[var(--accent)]/10 to-transparent z-0"
                                                            initial={false}
                                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        />
                                                    )}

                                                    {/* Dot Container */}
                                                    <div className="relative z-10 w-8 flex justify-center flex-shrink-0">
                                                        <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-2.5 h-2.5 bg-[var(--accent)] ring-4 ring-[var(--accent)]/20 shadow-[0_0_10px_var(--accent)]' : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:scale-125 dark:group-hover:bg-slate-500'}`} />
                                                    </div>

                                                    {/* Text */}
                                                    <span className={`relative z-10 text-[12px] tracking-widest uppercase transition-colors ${isActive ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`}>
                                                        {cat.key}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Right Content Area */}
                            <div className="flex-1 min-w-0">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeCategory}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Optional Category Header for Mobile/Context */}
                                        <div className="md:hidden flex items-center gap-3 mb-6">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{categories.find(c => c.key === activeCategory)?.label}</h3>
                                        </div>

                                        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                                            {allAutomations
                                                .filter(a => a.category === activeCategory)
                                                .map(automation => (
                                                    <AutomationCard key={automation.slug} automation={automation} />
                                                ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
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
