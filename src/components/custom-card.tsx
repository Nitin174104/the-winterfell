"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface CustomCardProps {
    onSearch: (query: string) => void;
}

export default function CustomCard({ onSearch }: CustomCardProps) {
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(e.currentTarget.value);
        }
    };
    
    return (
        <motion.div 
             whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-3xl h-96 flex flex-col justify-between relative overflow-hidden group"
        >
             <div className="absolute inset-0 bg-[var(--color-neon-lime)]/10 group-hover:bg-[var(--color-neon-lime)]/20 transition-colors" />

            <div className="relative z-10">
                <div className="w-12 h-12 bg-[var(--color-neon-lime)]/20 rounded-xl flex items-center justify-center mb-4">
                    <Search className="text-[var(--color-neon-lime)]" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Custom Mode</h2>
                <p className="text-gray-400">Search for exactly what you crave.</p>
            </div>

             <div className="relative z-10">
                <div className="relative group/input">
                    <input 
                        type="text" 
                        onKeyDown={handleSearch}
                        placeholder="I want something spicy..." 
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-[var(--color-neon-lime)] transition-colors"
                    />
                    <button className="absolute right-2 top-2 bottom-2 p-2 bg-[var(--color-neon-lime)] text-black rounded-lg hover:brightness-110 transition-all">
                        <Search size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
