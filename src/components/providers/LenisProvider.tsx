"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

interface LenisProviderProps {
    children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard smooth easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync Lenis with Framer Motion's internal animation loop
        // This ensures both run exactly on the same frame, eliminating jitter
        function update(data: { timestamp: number }) {
            lenis.raf(data.timestamp);
        }

        frame.update(update, true);

        return () => {
            cancelFrame(update);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
