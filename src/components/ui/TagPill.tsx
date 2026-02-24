interface TagPillProps {
    tag: string;
    className?: string;
}

export default function TagPill({ tag, className = "" }: TagPillProps) {
    return (
        <span className={`font-mono text-[10px] uppercase tracking-wider font-medium opacity-60 border border-white/10 bg-white/5 px-2.5 py-1 rounded-sm ${className}`}>
            {tag}
        </span>
    );
}
