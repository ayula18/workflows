interface TagPillProps {
    tag: string;
    className?: string;
}

export default function TagPill({ tag, className = "" }: TagPillProps) {
    return (
        <span className={`font-mono text-[10px] uppercase tracking-wider font-medium opacity-60 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 px-2.5 py-1 rounded-sm ${className}`}>
            {tag}
        </span>
    );
}
