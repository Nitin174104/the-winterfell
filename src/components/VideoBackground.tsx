"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function VideoBackground() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax and Blur Effects
    const y = useTransform(scrollY, [0, 1000], ["0%", "30%"]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);
    const blur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(10px)"]);
    const scale = useTransform(scrollY, [0, 1000], [1.1, 1]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden bg-black">
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Gradient Overlay for bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10" />

            <motion.video
                style={{ y, opacity, filter: blur, scale }}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop"
            >
                {/* High-quality slow-motion cooking video */}
                <source src="https://videos.pexels.com/video-files/3195828/3195828-hd_1920_1080_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </motion.video>
        </div>
    );
}
