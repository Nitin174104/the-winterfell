"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChefHat, Flame, Sparkles } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "The Fresh Origins",
        description: "It starts with the finest, hand-picked ingredients from local sustainable farms. Fresh basil, ripe tomatoes, and premium cuts.",
        image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=2000&auto=format&fit=crop", // Fresh ingredients
        icon: <Sparkles className="text-green-400" size={32} />,
        color: "from-green-500/20 to-transparent",
    },
    {
        id: 2,
        title: "The Alchemic Heat",
        description: "Precision temperatures and timing. The sizzle of the pan, the aroma filling the air as flavors meld together.",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop", // Cooking action
        icon: <Flame className="text-orange-500" size={32} />,
        color: "from-orange-500/20 to-transparent",
    },
    {
        id: 3,
        title: "The Masterpiece",
        description: "Plated with artistic precision. A feast for the eyes before it touches your soul. Ready to be devoured.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop", // Plated dish
        icon: <ChefHat className="text-[var(--color-neon-lime)]" size={32} />,
        color: "from-[var(--color-neon-lime)]/20 to-transparent",
    },
];

export function CookingProcess() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Transform scroll progress to current step index (0 to 2)
    const currentStep = useTransform(scrollYProgress, [0, 1], [0, 3]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* Background Images Layer */}
                {steps.map((step, index) => (
                    <StepImage
                        key={step.id}
                        step={step}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}

                {/* Content Overlay */}
                <div className="relative z-10 container mx-auto px-6 flex justify-center">
                    <div className="max-w-2xl w-full">
                        {steps.map((step, index) => (
                            <StepContent
                                key={step.id}
                                step={step}
                                index={index}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                    {steps.map((_, index) => (
                        <ProgressDot
                            key={index}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StepImage({ step, index, scrollYProgress }: any) {
    // Calculated ranges
    const rangePeakEnd = (index + 0.8) / 3;
    const rangeEnd = (index + 1) / 3;
    const rangeStart = (index - 0.5) / 3;
    const rangePeakStart = index / 3;

    // Handle index 0 specifically to avoid negative ranges
    let inputRange: number[];
    let outputRange: number[];

    if (index === 0) {
        // First item starts fully visible and fades out later
        inputRange = [0, rangePeakEnd, rangeEnd];
        outputRange = [1, 1, 0];
    } else if (index === steps.length - 1) {
        // Last item fades in and STAYS visible
        inputRange = [rangeStart, rangePeakStart, 1];
        outputRange = [0, 1, 1];
    } else {
        // Standard fade-in / fade-out for intermediate items
        inputRange = [rangeStart, rangePeakStart, rangePeakEnd, rangeEnd];
        outputRange = [0, 1, 1, 0];
    }

    const opacity = useTransform(scrollYProgress, inputRange, outputRange);

    const scale = useTransform(
        scrollYProgress,
        [index / 3, (index + 1) / 3],
        [1.1, 1]
    );

    return (
        <motion.div style={{ opacity }} className="absolute inset-0 w-full h-full">
            <motion.div
                style={{ scale }}
                className="w-full h-full"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${step.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-60`} />
                <div className="absolute inset-0 bg-black/50" />
            </motion.div>
        </motion.div>
    );
}

function StepContent({ step, index, scrollYProgress }: any) {
    const rangePeakEnd = (index + 0.8) / 3;
    const rangeEnd = (index + 1) / 3;
    const rangeStart = (index - 0.2) / 3;
    const rangePeakStart = index / 3;

    let inputRangeOpacity: number[];
    let outputRangeOpacity: number[];
    let inputRangeY: number[];
    let outputRangeY: number[];

    if (index === 0) {
        inputRangeOpacity = [0, rangePeakEnd, rangeEnd];
        outputRangeOpacity = [1, 1, 0];

        inputRangeY = [0, rangeEnd];
        outputRangeY = [0, -50];
    } else if (index === steps.length - 1) {
        // Last item stays visible
        inputRangeOpacity = [rangeStart, rangePeakStart, 1];
        outputRangeOpacity = [0, 1, 1];

        // Last item settles at 0 and stays there
        inputRangeY = [rangeStart, rangePeakStart, 1];
        outputRangeY = [50, 0, 0];
    } else {
        inputRangeOpacity = [rangeStart, rangePeakStart, rangePeakEnd, rangeEnd];
        outputRangeOpacity = [0, 1, 1, 0];

        inputRangeY = [rangeStart, rangePeakStart, rangeEnd];
        outputRangeY = [50, 0, -50];
    }

    const opacity = useTransform(scrollYProgress, inputRangeOpacity, outputRangeOpacity);
    const y = useTransform(scrollYProgress, inputRangeY, outputRangeY);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center"
        >
            <div className="inline-flex items-center justify-center p-4 rounded-full glass-card border-[var(--color-neon-lime)]/30 mb-6 mx-auto">
                {step.icon}
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white tracking-tight">
                {step.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-xl mx-auto font-light">
                {step.description}
            </p>
        </motion.div>
    );
}

function ProgressDot({ index, scrollYProgress }: any) {
    const rangeActive = index / 3;
    const rangeActiveEnd = (index + 0.9) / 3;
    const rangeEnd = (index + 1) / 3;
    const rangeStart = (index - 0.1) / 3;

    let inputRange: number[];
    let outputRange: string[];

    if (index === 0) {
        inputRange = [0, rangeActiveEnd, rangeEnd];
        outputRange = ["#D4AF37", "#D4AF37", "rgba(255,255,255,0.2)"];
    } else if (index === steps.length - 1) {
        // Last dot stays active
        inputRange = [rangeStart, rangeActive, 1];
        outputRange = ["rgba(255,255,255,0.2)", "#D4AF37", "#D4AF37"];
    } else {
        inputRange = [rangeStart, rangeActive, rangeActiveEnd, rangeEnd];
        outputRange = ["rgba(255,255,255,0.2)", "#D4AF37", "#D4AF37", "rgba(255,255,255,0.2)"];
    }

    const backgroundColor = useTransform(
        scrollYProgress,
        inputRange,
        outputRange
    );

    return (
        <motion.div
            style={{ backgroundColor }}
            className="w-3 h-3 rounded-full"
        />
    );
}
