interface LoomEmbedProps {
    src: string;
    title?: string;
}

export default function LoomEmbed({ src, title }: LoomEmbedProps) {
    return (
        <div>
            {title && (
                <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">{title}</h3>
            )}
            <div className="rounded-2xl p-2 relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl bg-white dark:bg-[var(--card-bg)]">
                <div style={{ position: "relative", paddingBottom: "62.5%", height: 0 }}>
                    <iframe
                        src={src}
                        frameBorder="0"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            borderRadius: "12px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
