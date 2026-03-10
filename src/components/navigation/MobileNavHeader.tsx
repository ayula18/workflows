import { Menu } from "lucide-react";

interface MobileNavHeaderProps {
    onOpen: () => void;
}

export default function MobileNavHeader({ onOpen }: MobileNavHeaderProps) {
    return (
        <div className="flex md:hidden w-full h-14 items-center justify-between bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm dark:bg-black/40 dark:border-white/10 dark:shadow-none rounded-full px-4">
            {/* Hamburger – left */}
            <button
                onClick={onOpen}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                aria-label="Open navigation menu"
            >
                <Menu className="w-5 h-5 text-slate-700 dark:text-gray-300" />
            </button>

            {/* Hire Me – right */}
            <a
                href="mailto:ayush_lahoti@pg26.mesaschool.co"
                className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white dark:text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(160,232,230,0.4)] transition-all"
            >
                Hire Me
            </a>
        </div>
    );
}
