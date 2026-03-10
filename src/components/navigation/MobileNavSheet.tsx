import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { navLinks } from "./navLinks";

interface MobileNavSheetProps {
    isOpen: boolean;
    pathname: string;
    onClose: () => void;
}

export default function MobileNavSheet({ isOpen, pathname, onClose }: MobileNavSheetProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop overlay */}
                    <motion.div
                        key="nav-backdrop"
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    {/* Side sheet panel */}
                    <motion.aside
                        key="nav-sidebar"
                        className="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white dark:bg-gray-950 border-r border-slate-200 dark:border-white/10 shadow-2xl flex flex-col md:hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Close button */}
                        <div className="flex items-center justify-between px-5 pt-6 pb-4">
                            <span className="text-sm font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
                                Menu
                            </span>
                            <button
                                onClick={onClose}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                                aria-label="Close navigation menu"
                            >
                                <X className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="mx-5 h-px bg-slate-200 dark:bg-white/10" />

                        {/* Nav links */}
                        <nav className="flex flex-col gap-1 px-4 pt-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={onClose}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? "bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 text-slate-900 dark:text-white font-semibold"
                                            : "text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Divider */}
                        <div className="mx-5 mt-4 h-px bg-slate-200 dark:bg-white/10" />

                        {/* Action buttons */}
                        <div className="flex flex-col gap-3 px-5 pt-5">
                            <a
                                href="https://drive.google.com/file/d/1ug60B8tidw9ujYirz46xv_O8VSuNutpH/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                            >
                                Resume
                            </a>
                            <a
                                href="mailto:ayush_lahoti@pg26.mesaschool.co"
                                onClick={onClose}
                                className="flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
                            >
                                Hire Me
                            </a>
                        </div>

                        {/* Theme toggle at bottom */}
                        <div className="mt-auto px-5 pb-6 flex items-center justify-between">
                            <span className="text-xs text-slate-400 dark:text-gray-500">Appearance</span>
                            <ThemeToggle />
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
