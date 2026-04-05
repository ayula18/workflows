"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default memo(function SectionWrapper({
    children,
    className,
    id,
    delay = 0,
}: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative", className)}
        >
            {children}
        </motion.section>
    );
});
