export default function SkeletonCard() {
    return (
        <div className="glass-panel p-6 rounded-2xl h-full border border-white/5 bg-black/50 overflow-hidden relative">
            <div className="animate-pulse flex flex-col h-full space-y-4">
                {/* Header: Icon & Metric */}
                <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-white/10"></div>
                    <div className="w-20 h-6 rounded-full bg-white/10"></div>
                </div>

                {/* Title */}
                <div className="w-3/4 h-6 rounded bg-white/10 mb-2"></div>

                {/* Description */}
                <div className="space-y-2 mb-6">
                    <div className="w-full h-4 rounded bg-white/5"></div>
                    <div className="w-5/6 h-4 rounded bg-white/5"></div>
                </div>

                {/* Footer: Tags & Arrow */}
                <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex gap-2">
                        <div className="w-16 h-5 rounded bg-white/10"></div>
                        <div className="w-16 h-5 rounded bg-white/10"></div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                </div>
            </div>
        </div>
    );
}
