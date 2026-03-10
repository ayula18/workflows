"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORDS = ["Perspective", "Creativity", "Innovation"];

export default function AnimatedText() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const words = containerRef.current.querySelectorAll<HTMLHeadingElement>(".gsap-word");

        // Set all words off-screen to the right initially
        gsap.set(words, { xPercent: 110, opacity: 0 });

        const tl = gsap.timeline({ repeat: -1 });

        words.forEach((word, i) => {
            const next = words[(i + 1) % words.length];

            // Slide current word in from right
            tl.to(word, { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
                // Hold for a beat
                .to(word, { duration: 1.5 })
                // Slide current word out to left, bring next word in from right
                .to(word, { xPercent: -110, opacity: 0, duration: 0.6, ease: "power2.in" })
                .set(word, { xPercent: 110 }); // reset for next loop
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="gsap-container">
            {WORDS.map((word) => (
                <h2
                    key={word}
                    className="gsap-word"
                    data-word={word}
                >
                    {word}
                </h2>
            ))}
        </div>
    );
}
