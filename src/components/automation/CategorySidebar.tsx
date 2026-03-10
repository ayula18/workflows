import { motion } from "framer-motion";

interface CategorySidebarProps {
    categories: readonly { key: string; label: string; desc?: string }[];
    activeCategory: string;
    setActiveCategory: (cat: string) => void;
}

export default function CategorySidebar({ categories, activeCategory, setActiveCategory }: CategorySidebarProps) {
    return (
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
    );
}
