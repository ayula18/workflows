import { motion } from "framer-motion";

export type TabId = 'automations' | 'case-studies' | 'sector-thesis';

export const tabs: { id: TabId; label: string }[] = [
    { id: 'automations', label: 'Automations' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'sector-thesis', label: 'Sector Thesis' },
];

interface LibraryTabsProps {
    activeTab: TabId;
    setActiveTab: (tab: TabId) => void;
}

export default function LibraryTabs({ activeTab, setActiveTab }: LibraryTabsProps) {
    return (
        <div className="flex justify-center mb-16 px-4">
            {/* Mobile: vertical stack */}
            <div className="flex flex-col w-full max-w-sm gap-2 md:hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-5 py-3 rounded-2xl text-sm font-medium transition-all border ${activeTab === tab.id
                            ? "text-white dark:text-slate-900 border-transparent shadow-lg"
                            : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="active-tab-mobile"
                                className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-2xl"
                                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Desktop: horizontal pills */}
            <div className="hidden md:flex bg-slate-100 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-1.5 rounded-full">
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
    );
}
