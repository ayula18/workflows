import { memo } from "react";
import { motion } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "./types";
import { RefObject, FormEvent } from "react";

interface ChatPanelProps {
    messages: Message[];
    isTyping: boolean;
    input: string;
    setInput: (val: string) => void;
    sendMessage: (e: FormEvent) => void;
    onClose: () => void;
    messagesEndRef: RefObject<HTMLDivElement | null>;
    inputRef: RefObject<HTMLInputElement | null>;
}

/** Pure helper — defined outside the component to avoid re-creation */
function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default memo(function ChatPanel({
    messages,
    isTyping,
    input,
    setInput,
    sendMessage,
    onClose,
    messagesEndRef,
    inputRef
}: ChatPanelProps) {
    return (
        <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-[9999] flex flex-col overflow-hidden rounded-2xl shadow-2xl bg-white/95 dark:bg-[var(--card-bg-solid)]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10"
            style={{
                width: "min(380px, calc(100vw - 2rem))",
                height: "min(520px, calc(100vh - 6rem))",
            }}
        >
            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-100 to-white dark:from-[rgba(160,232,230,0.12)] dark:to-[rgba(209,167,255,0.12)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))" }}>
                    <Bot className="h-5 w-5 text-[var(--background)]" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                        Chat with Ayush&apos;s AI
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-white/50">
                        Typically replies instantly
                    </p>
                </div>
                <button onClick={onClose} aria-label="Close chat" className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer">
                    <X className="h-4 w-4 text-slate-600 dark:text-white/70" />
                </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
                {messages.map((msg, i) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i === messages.length - 1 ? 0.05 : 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`relative max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${msg.role === "user" ? "rounded-br-md text-slate-900 dark:text-white bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 dark:from-[rgba(160,232,230,0.25)] dark:to-[rgba(209,167,255,0.25)] dark:border-[rgba(160,232,230,0.2)]" : "rounded-bl-md text-slate-800 dark:text-white/90 bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10"}`}>
                            {msg.role === "bot" ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none text-[13.5px] leading-relaxed prose-p:mb-2 prose-p:last:mb-0 prose-ul:my-1 prose-ul:pl-4 prose-li:my-0 prose-a:text-[var(--accent)] hover:prose-a:underline prose-pre:bg-slate-100 dark:prose-pre:bg-black/20 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-white/10">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                </div>
                            ) : (
                                msg.text
                            )}
                            <span className="mt-1 block text-[10px] text-slate-400 dark:text-white/30 text-right">
                                {formatTime(msg.timestamp)}
                            </span>
                        </div>
                    </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md px-4 py-3 bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10">
                            {[0, 1, 2].map((idx) => (
                                <span
                                    key={idx}
                                    className="inline-block h-2 w-2 rounded-full"
                                    style={{
                                        background: "var(--accent)",
                                        animation: `typingDot 1.4s infinite ease-in-out ${idx * 0.2}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/25">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything…"
                    disabled={isTyping}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-transparent bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/40 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${input.trim() && !isTyping ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex-shrink-0" : "bg-slate-200 dark:bg-white/5"}`}
                >
                    <Send className={`h-4 w-4 ${input.trim() && !isTyping ? "text-[var(--background)]" : "text-slate-400 dark:text-white/30"}`} />
                </button>
            </form>
        </motion.div>
    );
});
