"use client";

import Typewriter from 'typewriter-effect';

export default function TypewriterHeading() {
    return (
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 overflow-hidden">
            <span className="shrink-0">I&apos;m</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shrink-0 min-w-[200px] sm:min-w-[280px] md:min-w-[360px] text-left">
                <Typewriter
                    options={{
                        strings: ['Ayush Lahoti.', 'your next hire.', 'an AI Business Generalist.'],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 80,
                    }}
                />
            </span>
        </h1>
    );
}
