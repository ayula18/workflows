import { Clock, Zap, TrendingUp } from "lucide-react";

const ICONS = [Clock, Zap, TrendingUp];
const STYLES = [
    "bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 text-[var(--accent)]",
    "bg-gradient-to-br from-[var(--accent-secondary)]/20 to-[var(--accent-secondary)]/5 text-[var(--accent-secondary)]",
    "bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-400",
];

interface MetricPillProps {
    value: string;
    label: string;
    index: number;
    size?: "sm" | "lg";
}

export default function MetricPill({ value, label, index, size = "sm" }: MetricPillProps) {
    const Icon = ICONS[index % ICONS.length];
    const colorClass = STYLES[index % STYLES.length];
    const isLarge = size === "lg";

    return (
        <div className={`flex items-center gap-3 ${isLarge ? "" : "glass-panel rounded-xl px-5 py-3"}`}>
            <div className={`${isLarge ? "p-3" : "p-2"} rounded-lg border border-white/10 ${colorClass}`}>
                <Icon className={isLarge ? "w-6 h-6" : "w-4 h-4"} />
            </div>
            <div>
                <span className={`font-mono font-bold ${isLarge ? "text-3xl" : "text-xl"}`}>{value}</span>
                <p className={`font-mono opacity-60 ${isLarge ? "text-sm" : "text-xs"}`}>{label}</p>
            </div>
        </div>
    );
}
