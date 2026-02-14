"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxProps {
    children: React.ReactNode;
    offset?: number;
    className?: string;
}

export function Parallax({ children, offset = 50, className = "" }: ParallaxProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div style={{ y }} className="w-full h-full">
                {children}
            </motion.div>
        </div>
    );
}
