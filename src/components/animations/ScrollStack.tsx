"use client";

import React, {
    useRef,
    useEffect,
    useCallback,
    ReactNode,
} from "react";

/* ─────────── types ─────────── */

interface ScrollStackContextValue {
    /** Total number of items in the stack */
    itemCount: number;
    /** Distance (px) each card travels before settling */
    itemDistance: number;
    /** Vertical gap (px) between stacked cards */
    itemStackDistance: number;
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

/* ─────────── ScrollStack ─────────── */

/**
 * Performance-optimised scroll stack.
 *
 * Key design decision: scroll progress is tracked via a ref (not React state)
 * and card transforms are applied via direct DOM manipulation inside a
 * requestAnimationFrame loop. This keeps the entire scroll animation off the
 * React render path — zero re-renders during scroll.
 */
export function ScrollStack({
    children,
    useWindowScroll = false,
    itemDistance = 120,
    itemStackDistance = 40,
    className = "",
}: ScrollStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef(0);
    const itemRefsMap = useRef<Map<number, HTMLDivElement>>(new Map());
    const rafId = useRef(0);

    const items = React.Children.toArray(children);
    const itemCount = items.length;

    // Store config in a ref so the RAF loop always has fresh values
    // without re-creating closures.
    const configRef = useRef({ itemCount, itemDistance, itemStackDistance });
    configRef.current = { itemCount, itemDistance, itemStackDistance };

    /** Register a card DOM node by index */
    const registerItem = useCallback((index: number, el: HTMLDivElement | null) => {
        if (el) {
            itemRefsMap.current.set(index, el);
        } else {
            itemRefsMap.current.delete(index);
        }
    }, []);

    /* ── Apply transforms to all cards (called from rAF, NOT React render) ── */
    const applyTransforms = useCallback(() => {
        const progress = scrollProgressRef.current;
        const { itemCount: count, itemDistance: dist, itemStackDistance: stackDist } = configRef.current;
        const segmentSize = 1 / count;

        itemRefsMap.current.forEach((el, index) => {
            const itemStart = index * segmentSize;
            const itemEnd = itemStart + segmentSize;

            const localProgress = Math.max(
                0,
                Math.min(1, (progress - itemStart) / (itemEnd - itemStart))
            );

            const isSettled = progress >= itemEnd;
            const settledY = isSettled ? index * stackDist : 0;

            const translateY = isSettled
                ? settledY
                : dist * (1 - localProgress) + index * stackDist;

            const behindCount = isSettled
                ? Math.max(0, Math.floor(progress / segmentSize) - index - 1)
                : 0;
            const scale = 1 - behindCount * 0.03;

            const opacity = index === 0 ? 1 : Math.min(1, localProgress * 2);

            // Direct DOM mutation — no React re-render
            el.style.transform = `translateY(${translateY}px) scale(${scale}) translateZ(0)`;
            el.style.opacity = String(opacity);
        });
    }, []);

    /* ── Scroll listener — writes to ref, schedules rAF ── */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let ticking = false;

        const onScroll = () => {
            if (useWindowScroll) {
                const rect = el.getBoundingClientRect();
                const windowH = window.innerHeight;
                const maxTravel = el.scrollHeight - windowH;
                if (maxTravel <= 0) {
                    scrollProgressRef.current = 1;
                } else {
                    const scrolled = -rect.top;
                    scrollProgressRef.current = Math.max(0, Math.min(1, scrolled / maxTravel));
                }
            } else {
                const maxScroll = el.scrollHeight - el.clientHeight;
                if (maxScroll <= 0) return;
                scrollProgressRef.current = el.scrollTop / maxScroll;
            }

            if (!ticking) {
                ticking = true;
                rafId.current = requestAnimationFrame(() => {
                    applyTransforms();
                    ticking = false;
                });
            }
        };

        const target = useWindowScroll ? window : el;
        target.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // init

        return () => {
            target.removeEventListener("scroll", onScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [useWindowScroll, applyTransforms]);

    /* ── Total scrollable height so items have room to animate ── */
    const totalHeight = itemCount * itemDistance + 100 + "vh";

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{
                height: useWindowScroll ? totalHeight : "100vh",
                overflow: useWindowScroll ? "visible" : "auto",
            }}
        >
            <div className="sticky top-[80px]" style={{ height: "100vh" }}>
                {items.map((child, i) =>
                    React.isValidElement(child)
                        ? React.cloneElement(child as React.ReactElement<ScrollStackItemProps>, {
                            index: i,
                            // Pass the register function via a custom prop
                            ...(({ __registerRef: (el: HTMLDivElement | null) => registerItem(i, el) }) as Record<string, unknown>),
                        })
                        : child
                )}
            </div>
        </div>
    );
}

/* ─────────── ScrollStackItem ─────────── */

export function ScrollStackItem({
    children,
    index = 0,
    className = "",
    itemClassName = "",
    ...rest
}: ScrollStackItemProps & { __registerRef?: (el: HTMLDivElement | null) => void }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const registerRef = (rest as { __registerRef?: (el: HTMLDivElement | null) => void }).__registerRef;

    useEffect(() => {
        if (registerRef && itemRef.current) {
            registerRef(itemRef.current);
        }
        return () => {
            if (registerRef) registerRef(null);
        };
    }, [registerRef]);

    return (
        <div
            ref={itemRef}
            className={`absolute inset-x-0 flex items-start justify-center ${className}`}
            style={{
                zIndex: index + 1,
                willChange: "transform, opacity",
                transform: "translateZ(0)", // GPU layer promotion
            }}
        >
            <div className={`w-full ${itemClassName}`}>{children}</div>
        </div>
    );
}

export default ScrollStack;
