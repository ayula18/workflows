"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useScroll, useSpring, useTransform } from "framer-motion";
import DesktopNav from "./DesktopNav";
import MobileNavHeader from "./MobileNavHeader";
import MobileNavSheet from "./MobileNavSheet";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const smoothY = useSpring(scrollY, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001,
    });

    const maxWidth = useTransform(smoothY, [0, 120], ["1280px", "1024px"]);

    return (
        <>
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
                <DesktopNav maxWidth={maxWidth} />
                <MobileNavHeader onOpen={() => setIsOpen(true)} />
            </header>

            <MobileNavSheet isOpen={isOpen} pathname={pathname} onClose={() => setIsOpen(false)} />
        </>
    );
}
