"use client";

import { motion } from "framer-motion";
import { Clock, Flame, Utensils } from "lucide-react";

interface RecipeProps {
    recipe: any;
}

export default function RecipeCard({ recipe }: RecipeProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
        >
            <div className="h-48 overflow-hidden relative">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--color-neon-lime)] border border-[var(--color-neon-lime)]/20">
                    {recipe.matchScore}% Match
                </div>
            </div>
            
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 truncate">{recipe.title}</h3>
                
                <div className="flex gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                        <Clock size={16} /> 20m
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame size={16} /> {recipe.flavor || "Tasty"}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                        View Recipe
                    </button>
                    <button className="px-4 py-2 bg-[var(--color-neon-lime)] text-black hover:brightness-110 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                        Order Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
