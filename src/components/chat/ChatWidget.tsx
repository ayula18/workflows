"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { Message } from "./types";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatPanel from "./ChatPanel";

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

    // specific handler for external components to trigger opening the chat box
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat-widget', handleOpenChat);
        return () => window.removeEventListener('open-chat-widget', handleOpenChat);
    }, []);

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
                console.error("DEBUG Chat API Status:", res.status, res.statusText);
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

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <ChatFloatingButton onClick={() => setIsOpen(true)} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <ChatPanel
                        messages={messages}
                        isTyping={isTyping}
                        input={input}
                        setInput={setInput}
                        sendMessage={sendMessage}
                        onClose={() => setIsOpen(false)}
                        messagesEndRef={messagesEndRef}
                        inputRef={inputRef}
                    />
                )}
            </AnimatePresence>

            {/* ── Keyframe for typing dots ── */}
            <style jsx global>{`
                @keyframes typingDot {
                  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                  30% { transform: translateY(-4px); opacity: 1; }
                }

                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 4px; }
            `}</style>
        </>
    );
}
