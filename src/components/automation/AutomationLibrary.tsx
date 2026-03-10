"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { automations, categories, caseStudiesData, sectorThesisData } from "@/lib/data";
import AutomationCard from "@/components/automation/AutomationCard";
import DocumentCard from "@/components/documents/DocumentCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import LibraryTabs, { TabId } from "@/components/automation/LibraryTabs";
import CategorySidebar from "@/components/automation/CategorySidebar";

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
            <LibraryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
                            <CategorySidebar
                                categories={categories}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />

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
