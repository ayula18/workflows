"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { automations, categories, caseStudiesData, sectorThesisData } from "@/lib/data";
import AutomationCard from "@/components/automation/AutomationCard";
import DocumentCard from "@/components/documents/DocumentCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import LibraryTabs, { TabId } from "@/components/automation/LibraryTabs";
import CategorySidebar from "@/components/automation/CategorySidebar";
import Pagination from "@/components/ui/Pagination";

export default function AutomationLibrary() {
    const allAutomations = Object.values(automations);
    const [activeTab, setActiveTab] = useState<TabId>('automations');
    const [activeCategory, setActiveCategory] = useState<string>(categories[0].key);
    
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, activeCategory]);

    const filteredAutomations = allAutomations.filter(a => a.category === activeCategory);
    const paginatedAutomations = filteredAutomations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const totalAutomationPages = Math.ceil(filteredAutomations.length / ITEMS_PER_PAGE);

    const paginatedCaseStudies = caseStudiesData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const totalCaseStudiesPages = Math.ceil(caseStudiesData.length / ITEMS_PER_PAGE);

    const paginatedSectorThesis = sectorThesisData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const totalSectorThesisPages = Math.ceil(sectorThesisData.length / ITEMS_PER_PAGE);

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
                                            {paginatedAutomations.map(automation => (
                                                <AutomationCard key={automation.slug} automation={automation} />
                                            ))}
                                        </div>
                                        {totalAutomationPages > 1 && (
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalAutomationPages}
                                                onPageChange={setCurrentPage}
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {activeTab === 'case-studies' && (
                        <>
                            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto w-full">
                                {paginatedCaseStudies.map((doc) => (
                                    <DocumentCard key={doc.id} document={doc} />
                                ))}
                            </div>
                            {totalCaseStudiesPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalCaseStudiesPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    )}

                    {activeTab === 'sector-thesis' && (
                        <>
                            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto w-full">
                                {paginatedSectorThesis.map((doc) => (
                                    <DocumentCard key={doc.id} document={doc} />
                                ))}
                            </div>
                            {totalSectorThesisPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalSectorThesisPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </SectionWrapper>
    );
}
