"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Flame, Clock } from "lucide-react";

const foodItems = [
    {
        id: 1,
        title: "Spicy Ramen",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2000&auto=format&fit=crop",
        rating: 4.8,
        calories: "450 kcal",
        time: "20 min",
        tags: ["Spicy", "Hot", "Asian"],
    },
    {
        id: 2,
        title: "Avocado Toast",
        image: "https://images.unsplash.com/photo-1588137372308-15f75323a51d?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        calories: "320 kcal",
        time: "10 min",
        tags: ["Healthy", "Breakfast", "Green"],
    },
    {
        id: 3,
        title: "Berry Smoothie",
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=2000&auto=format&fit=crop",
        rating: 4.7,
        calories: "210 kcal",
        time: "5 min",
        tags: ["Fresh", "Sweet", "Detox"],
    },
    {
        id: 4,
        title: "Grilled Salmon",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        calories: "500 kcal",
        time: "30 min",
        tags: ["Protein", "Keto", "Dinner"],
    },
];

export function FoodShowcase() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black/20">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-10 left-10 z-10 glass-card px-6 py-3 rounded-full border border-[var(--color-neon-lime)]/30">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Trending Vibes
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-16 px-20">
                    {foodItems.map((item) => (
                        <FoodCard key={item.id} item={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function FoodCard({ item }: { item: any }) {
    return (
        <div className="group relative h-[450px] w-[350px] overflow-hidden rounded-[2.5rem] bg-gray-900 border border-white/10 hover:border-[var(--color-neon-lime)]/50 transition-colors duration-500">
            <div
                style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-2 mb-3">
                    {item.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[var(--color-neon-lime)]/20 text-[var(--color-neon-lime)] border border-[var(--color-neon-lime)]/20">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
                    {item.title}
                </h3>

                <div className="flex items-center gap-4 text-gray-300 text-sm font-medium">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={16} fill="currentColor" /> {item.rating}
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame size={16} className="text-orange-500" /> {item.calories}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={16} className="text-blue-400" /> {item.time}
                    </div>
                </div>

                <button className="mt-6 w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-[var(--color-neon-lime)] transition-colors duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 text-sm uppercase tracking-wide">
                    View Recipe
                </button>
            </div>
        </div>
    );
}
