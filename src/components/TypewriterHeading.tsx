"use client";

import { useState, useEffect, useCallback } from "react";

const PHRASES = ["Ayush Lahoti.", "your next hire.", "an AI Business Generalist."];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

export default function TypewriterHeading() {
    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const tick = useCallback(() => {
        const current = PHRASES[phraseIndex];

        if (!isDeleting) {
            // Typing
            const next = current.slice(0, text.length + 1);
            setText(next);

            if (next === current) {
                // Finished typing — pause then start deleting
                setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
                return;
            }
        } else {
            // Deleting
            const next = current.slice(0, text.length - 1);
            setText(next);

            if (next === "") {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
                // Small pause before typing next phrase
                return;
            }
        }
    }, [text, phraseIndex, isDeleting]);

    useEffect(() => {
        const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
        // If we just finished typing, the pause is handled inside tick()
        if (!isDeleting && text === PHRASES[phraseIndex]) return;
        // If we just finished deleting, add a pause
        if (!isDeleting && text === "") {
            const timer = setTimeout(tick, PAUSE_AFTER_DELETE);
            return () => clearTimeout(timer);
        }
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, text, isDeleting, phraseIndex]);

    return (
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900 dark:text-white flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 overflow-hidden">
            <span className="shrink-0">I&apos;m</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shrink-0 min-w-[200px] sm:min-w-[280px] md:min-w-[360px] text-left">
                {text}
                <span className="animate-pulse">|</span>
            </span>
        </h1>
    );
}
