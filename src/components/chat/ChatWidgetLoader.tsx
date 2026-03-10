"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), {
    ssr: false,
});

export default function ChatWidgetLoader() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handler = () => setShow(true);
        window.addEventListener("open-chat-widget", handler);
        return () => window.removeEventListener("open-chat-widget", handler);
    }, []);

    const handleOpen = () => {
        setShow(true);
        // Dispatch the event so ChatWidget opens immediately when it mounts
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("open-chat-widget"));
        }, 0);
    };

    return (
        <>
            {/* Lightweight floating button — always visible until ChatWidget takes over */}
            {!show && (
                <button
                    onClick={handleOpen}
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
                </button>
            )}

            {/* Full ChatWidget — only loaded after first interaction */}
            {show && <ChatWidget />}
        </>
    );
}
