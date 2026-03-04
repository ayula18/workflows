import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";

export default function EngineeringExperience() {
    return (
        <SectionWrapper id="engineering-experience" className="py-12 md:py-16">
            <div className="relative w-[95%] max-[1200px]:w-full left-[2.5%] max-[1200px]:left-0 bg-[#111111] border border-white/10 rounded-[2rem] p-6 md:p-8 lg:p-10 overflow-hidden shadow-[0_0_80px_rgba(255,79,0,0.1)] mb-32 max-[900px]:mb-0">

                {/* Glow Effects */}
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] opacity-20 blur-[100px] pointer-events-none rounded-full" />
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 opacity-50 blur-[100px] pointer-events-none rounded-full" />

                {/* Decorative Quote-like Icon Bottom Right */}
                <div className="absolute -bottom-4 right-4 md:bottom-2 md:right-4 text-[var(--accent)] opacity-80 pointer-events-none">
                    <svg width="108" height="108" viewBox="0 0 24 24" fill="currentColor">
                        <defs>
                            <linearGradient id="orange-gradient-eng" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "var(--accent)" }} />
                                <stop offset="100%" style={{ stopColor: "var(--accent-secondary)" }} />
                            </linearGradient>
                        </defs>
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="url(#orange-gradient-eng)" />
                    </svg>
                </div>

                {/* Top Header */}
                <div className="flex justify-between items-center mb-6 md:mb-10 relative z-10">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                        Thakur College of Engineering
                    </span>
                    <span className="text-white/40 text-xs md:text-sm font-medium tracking-widest uppercase">
                        002
                    </span>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative z-10">

                    {/* Left Text Content */}
                    <div className="flex flex-col h-full justify-center gap-4 md:pr-4">
                        <div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-4 leading-snug lg:w-4/5 pt-2">
                                Building the technical foundation.
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm lg:text-base font-light leading-[1.85]">
                                Before business school, I built my technical foundation with a{" "}
                                <span className="text-slate-200 bg-white/10 px-1.5 py-0.5 rounded-md font-medium">B.E. in Computer Science &amp; Cybersecurity</span>{" "}
                                from Thakur College of Engineering. While mentoring early-stage student startups, I realized my passion was in 0-to-1 product building. I dropped out of the traditional placement race to found{" "}
                                <span className="text-slate-200 bg-white/10 px-1.5 py-0.5 rounded-md font-medium">Bunchup</span>, a consumer social app. Over two years, I led product and engineering, scaled it to{" "}
                                <span className="text-slate-200 bg-white/10 px-1.5 py-0.5 rounded-md font-medium">2,000+ organic users</span>, and successfully raised{" "}
                                <span className="text-slate-200 bg-white/10 px-1.5 py-0.5 rounded-md font-medium">₹10L in pre-seed funding</span>.
                            </p>
                        </div>

                        <div className="mt-auto pt-2">
                            <span className="text-white/90 text-sm font-bold tracking-widest uppercase">
                                TCET.AC.IN
                            </span>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full relative group lg:ml-auto max-w-sm mx-auto lg:max-w-md 2xl:-mr-5">
                        <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[1.5rem] overflow-hidden border border-white/10 bg-black/50">
                            <Image
                                src="/team_bunchup.jpeg"
                                alt="Bunchup Team"
                                fill
                                className="object-cover scale-[1.15] transition-transform duration-700 group-hover:scale-[1.2] opacity-90 group-hover:opacity-100 grayscale hover:grayscale-0"
                            />

                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#111111]/80 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                        </div>

                        {/* Image Caption */}
                        <p className="text-sm text-white/40 italic mt-2 text-center">
                            Late nights, broken code, and the reality of building a startup from a dorm room.
                        </p>

                        {/* Soft Glow behind image */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 pointer-events-none rounded-[2rem] -z-10" />
                    </div>

                </div>
            </div>
        </SectionWrapper>
    );
}
