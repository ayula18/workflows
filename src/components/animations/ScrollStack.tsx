"use client";

import React, {
    useRef,
    useEffect,
    useState,
    createContext,
    useContext,
    ReactNode,
} from "react";
import Lenis from "lenis";

/* ─────────── types ─────────── */

interface ScrollStackContextValue {
    /** Total number of items in the stack */
    itemCount: number;
    /** Distance (px) each card travels before settling */
    itemDistance: number;
    /** Vertical gap (px) between stacked cards */
    itemStackDistance: number;
    /** Current scroll progress (0-1) for the container */
    scrollProgress: number;
}

interface ScrollStackProps {
    children: ReactNode;
    /** Use the window scroll instead of a container scroll (default: false) */
    useWindowScroll?: boolean;
    /** Distance (px) each card travels before settling (default: 120) */
    itemDistance?: number;
    /** Vertical gap (px) between stacked cards at rest (default: 40) */
    itemStackDistance?: number;
    className?: string;
}

interface ScrollStackItemProps {
    children: ReactNode;
    /** Index of this item — injected automatically by ScrollStack */
    index?: number;
    /** Optional class applied to the sticky wrapper */
    className?: string;
    /** Optional class applied to the inner card element */
    itemClassName?: string;
}

/* ─────────── context ─────────── */

const ScrollStackCtx = createContext<ScrollStackContextValue>({
    itemCount: 0,
    itemDistance: 120,
    itemStackDistance: 40,
    scrollProgress: 0,
});

/* ─────────── ScrollStack ─────────── */

export function ScrollStack({
    children,
    useWindowScroll = false,
    itemDistance = 120,
    itemStackDistance = 40,
    className = "",
}: ScrollStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const items = React.Children.toArray(children);
    const itemCount = items.length;

    /* ---- Lenis smooth-scroll (only when NOT using window scroll) ---- */
    useEffect(() => {
        if (useWindowScroll) return;
        const el = containerRef.current;
        if (!el) return;

        const lenis = new Lenis({
            wrapper: el,
            content: el.firstElementChild as HTMLElement,
            smoothWheel: true,
            lerp: 0.08,
        });

        let raf: number;
        const loop = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, [useWindowScroll]);

    /* ---- Track scroll progress ---- */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onScroll = () => {
            if (useWindowScroll) {
                const rect = el.getBoundingClientRect();
                const windowH = window.innerHeight;

                // Distance from when element top hits viewport top to when element bottom hits viewport bottom
                const maxTravel = el.scrollHeight - windowH;
                if (maxTravel <= 0) {
                    setScrollProgress(1);
                    return;
                }

                // How far we have scrolled past the element's top edge
                const scrolled = -rect.top;

                // Allow progress to go from 0 (at top) to 1 (at bottom) cleanly
                const progress = Math.max(0, Math.min(1, scrolled / maxTravel));
                setScrollProgress(progress);
            } else {
                const maxScroll = el.scrollHeight - el.clientHeight;
                if (maxScroll <= 0) return;
                setScrollProgress(el.scrollTop / maxScroll);
            }
        };

        const target = useWindowScroll ? window : el;
        target.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // init

        return () => target.removeEventListener("scroll", onScroll);
    }, [useWindowScroll]);

    /* ---- Total scrollable height so items have room to animate ---- */
    const totalHeight = itemCount * itemDistance + 100 + "vh";

    const ctxValue: ScrollStackContextValue = {
        itemCount,
        itemDistance,
        itemStackDistance,
        scrollProgress,
    };

    return (
        <ScrollStackCtx.Provider value={ctxValue}>
            <div
                ref={containerRef}
                className={`relative ${className}`}
                style={{
                    height: useWindowScroll ? totalHeight : "100vh",
                    overflow: useWindowScroll ? "visible" : "auto",
                }}
            >
                <div className="sticky top-[80px]" style={{ height: "calc(100vh - 80px)" }}>
                    {items.map((child, i) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child as React.ReactElement<ScrollStackItemProps>, {
                                index: i,
                            })
                            : child
                    )}
                </div>
            </div>
        </ScrollStackCtx.Provider>
    );
}

/* ─────────── ScrollStackItem ─────────── */

export function ScrollStackItem({
    children,
    index = 0,
    className = "",
    itemClassName = "",
}: ScrollStackItemProps) {
    const { itemCount, itemDistance, itemStackDistance, scrollProgress } =
        useContext(ScrollStackCtx);

    /* ---- Per-item animation values ---- */
    const segmentSize = 1 / itemCount;
    const itemStart = index * segmentSize;
    const itemEnd = itemStart + segmentSize;

    // Normalised progress for *this* card (0 → 1 within its segment)
    const localProgress = Math.max(
        0,
        Math.min(1, (scrollProgress - itemStart) / (itemEnd - itemStart))
    );

    // Cards that are fully "settled" stack at the top with increasing offset
    const isSettled = scrollProgress >= itemEnd;
    const settledY = isSettled ? index * itemStackDistance : 0;

    // While animating, the card moves from off-screen bottom → its stacked position
    const translateY = isSettled
        ? settledY
        : itemDistance * (1 - localProgress) + index * itemStackDistance;

    // Scale slightly smaller once settled behind other cards
    const behindCount = isSettled
        ? Math.max(0, Math.floor(scrollProgress / segmentSize) - index - 1)
        : 0;
    const scale = 1 - behindCount * 0.03;

    // Opacity: fade in as card enters
    const opacity = index === 0 ? 1 : Math.min(1, localProgress * 2);

    return (
        <div
            className={`absolute inset-x-0 flex items-start justify-center ${className}`}
            style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex: index + 1,
                transition: "transform 0.05s linear, opacity 0.1s linear",
                willChange: "transform, opacity",
            }}
        >
            <div className={`w-full ${itemClassName}`}>{children}</div>
        </div>
    );
}

export default ScrollStack;
