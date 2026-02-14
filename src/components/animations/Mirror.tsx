"use client";

import { motion } from "framer-motion";

interface MirrorProps {
    children: React.ReactNode;
    className?: string;
}

export function Mirror({ children, className = "" }: MirrorProps) {
    return (
        <div className={`relative overflow-hidden group ${className}`}>
            {children}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
        </div>
    );
}
