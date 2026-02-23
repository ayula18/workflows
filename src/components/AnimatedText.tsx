"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";

const WORDS = ["Perspective", "Creativity", "Innovation"];

export default function AnimatedText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!containerRef.current || !isInView) return;

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

            <style jsx>{`
                .gsap-container {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr;
                    min-height: 50px;
                    align-items: center;
                    overflow: hidden;
                }
                .gsap-word {
                    grid-row: 1;
                    grid-column: 1;
                    color: hsl(0 0% 98%);
                    position: relative;
                    text-align: right;
                    font-size: clamp(1.5rem, 3vw, 2.5rem);
                    font-weight: 800;
                    margin: 0;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                }
            `}</style>
        </div>
    );
}
