"use client";

import { motion } from "framer-motion";
import { Clock, Flame, Utensils } from "lucide-react";

interface RecipeProps {
    recipe: any;
}

export default function RecipeCard({ recipe }: RecipeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="glass-card rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10 hover:border-[var(--color-neon-lime)]/50 transition-colors duration-500 perspective-1000"
        >
            <div className="h-64 overflow-hidden relative">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[var(--color-neon-lime)] border border-[var(--color-neon-lime)]/20 shadow-lg flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-neon-lime)] animate-pulse" />
                    {recipe.matchScore}% Match
                </div>
            </div>

            <div className="p-8 relative">
                {/* Decorative glow */}
                <div className="absolute -top-10 right-10 w-20 h-20 bg-[var(--color-neon-lime)]/20 rounded-full blur-3xl group-hover:bg-[var(--color-neon-lime)]/40 transition-colors duration-500" />

                <h3 className="text-2xl font-display font-bold mb-4 truncate text-white group-hover:text-[var(--color-neon-lime)] transition-colors">{recipe.title}</h3>

                <div className="flex gap-4 text-sm text-gray-400 mb-8">
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg">
                        <Clock size={16} className="text-blue-400" /> 20m
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg">
                        <Flame size={16} className="text-orange-500" /> {recipe.flavor || "Tasty"}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-gray-300 transition-all border border-white/5 hover:border-white/20">
                        View Details
                    </button>
                    <button className="px-4 py-3 bg-[var(--color-neon-lime)] text-black hover:bg-white rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                        Cook This <Utensils size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
