"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "bot";
    text: string;
    timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: "welcome",
        role: "bot",
        text: "Hey! 👋 I'm Ayush's AI clone. Ask me anything about his experience, skills, projects, or anything else!",
        timestamp: new Date(),
    },
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const sessionIdRef = useRef(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isTyping) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            text: trimmed,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: trimmed,
                    sessionId: sessionIdRef.current
                }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();

            // Parse out the response. n8n might return the string directly, or inside a property.
            let botText = "Sorry, I received an empty response.";
            if (typeof data === 'string') {
                botText = data;
            } else if (data.output) {
                botText = data.output;
            } else if (data.text) {
                botText = data.text;
            } else if (data.message) {
                botText = data.message;
            } else if (data.response) {
                botText = data.response;
            } else if (Array.isArray(data) && data.length > 0 && data[0].output) {
                botText = data[0].output;
            } else {
                botText = JSON.stringify(data);
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: botText,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: "Oops, something went wrong connecting to the AI. Please try again later.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const formatTime = (d: Date) =>
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <>
            {/* ───────── Floating Toggle Button ───────── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="chat-toggle"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={() => setIsOpen(true)}
                        aria-label="Open chat"
                        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full shadow-lg cursor-pointer focus:outline-none"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                        }}
                    >
                        <MessageCircle className="h-6 w-6 text-[var(--background)]" />

                        {/* pulse ring */}
                        <span
                            className="absolute inset-0 rounded-full animate-ping opacity-30"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                            }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ───────── Chat Panel ───────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat-panel"
                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="fixed bottom-6 right-6 z-[9999] flex flex-col overflow-hidden rounded-2xl shadow-2xl"
                        style={{
                            width: "min(380px, calc(100vw - 2rem))",
                            height: "min(520px, calc(100vh - 6rem))",
                            background: "rgba(8, 12, 30, 0.92)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        {/* ── Header ── */}
                        <div
                            className="flex items-center gap-3 px-5 py-4"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(160,232,230,0.12), rgba(209,167,255,0.12))",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                                }}
                            >
                                <Bot className="h-5 w-5 text-[var(--background)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white leading-tight">
                                    Chat with Ayush&apos;s AI
                                </p>
                                <p className="text-[11px] text-white/50">
                                    Typically replies instantly
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chat"
                                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10 cursor-pointer"
                            >
                                <X className="h-4 w-4 text-white/70" />
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
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`relative max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${msg.role === "user"
                                            ? "rounded-br-md text-white"
                                            : "rounded-bl-md text-white/90"
                                            }`}
                                        style={
                                            msg.role === "user"
                                                ? {
                                                    background:
                                                        "linear-gradient(135deg, rgba(160,232,230,0.25), rgba(209,167,255,0.25))",
                                                    border: "1px solid rgba(160,232,230,0.2)",
                                                }
                                                : {
                                                    background: "rgba(255,255,255,0.05)",
                                                    border: "1px solid rgba(255,255,255,0.06)",
                                                }
                                        }
                                    >
                                        {msg.text}
                                        <span className="mt-1 block text-[10px] text-white/30 text-right">
                                            {formatTime(msg.timestamp)}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div
                                        className="flex items-center gap-1 rounded-2xl rounded-bl-md px-4 py-3"
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        {[0, 1, 2].map((idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block h-2 w-2 rounded-full"
                                                style={{
                                                    background: "var(--accent)",
                                                    animation: `typingDot 1.4s infinite ease-in-out ${idx * 0.2
                                                        }s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* ── Input ── */}
                        <form
                            onSubmit={sendMessage}
                            className="flex items-center gap-2 px-4 py-3"
                            style={{
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                                background: "rgba(0,0,0,0.25)",
                            }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything…"
                                disabled={isTyping}
                                className="flex-1 rounded-xl border-none bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/40 disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                aria-label="Send message"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                style={{
                                    background:
                                        input.trim() && !isTyping
                                            ? "linear-gradient(135deg, var(--accent), var(--accent-secondary))"
                                            : "rgba(255,255,255,0.05)",
                                }}
                            >
                                <Send
                                    className={`h-4 w-4 ${input.trim() && !isTyping
                                        ? "text-[var(--background)]"
                                        : "text-white/30"
                                        }`}
                                />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Keyframe for typing dots ── */}
            <style jsx global>{`
        @keyframes typingDot {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
      `}</style>
        </>
    );
}
