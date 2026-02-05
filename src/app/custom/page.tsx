"use client";

import { motion } from "framer-motion";
import { Search, Mic, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/recipe/results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient p-6 flex flex-col items-center justify-center relative">
       
       {/* Navigation */}
      <div className="absolute top-6 left-6 z-20">
          <button onClick={() => router.back()} className="p-4 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors border border-white/5 group">
             <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
      </div>

       <div className="max-w-4xl w-full relative z-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--color-neon-lime)]/20 text-[var(--color-neon-lime)] mb-8 border border-[var(--color-neon-lime)]/30 shadow-[0_0_40px_rgba(204,255,0,0.2)]">
                <Search size={48} />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                What are you <br /> <span className="text-gradient">Craving?</span>
            </h1>
        </motion.div>

        <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="relative"
        >
            <div className="glass-card p-2 rounded-3xl flex items-center border-[var(--color-neon-lime)]/30 focus-within:border-[var(--color-neon-lime)] focus-within:shadow-[0_0_30px_rgba(198,255,51,0.2)] transition-all">
                <Search className="ml-6 text-gray-400 w-6 h-6" />
                <input 
                    type="text" 
                    placeholder="e.g., 'Spicy Pasta', 'Comfort food with cheese'..." 
                    className="flex-1 bg-transparent border-none outline-none text-xl p-6 placeholder:text-gray-600 text-white"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <button type="button" className="p-4 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                    <Mic />
                </button>
                <button 
                    type="submit"
                    className="mr-2 px-8 py-4 bg-[var(--color-neon-lime)] text-black font-bold rounded-2xl hover:bg-[#d4ff66] transition-colors flex items-center gap-2"
                >
                    Search <ArrowRight size={20} />
                </button>
            </div>
        </motion.form>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500"
        >
            <span>Trending:</span>
            {["Avocado Toast", "Spicy Ramen", "Vegan Burger", "Protein Smoothie"].map(tag => (
                <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="hover:text-[var(--color-neon-lime)] transition-colors"
                >
                    {tag}
                </button>
            ))}
        </motion.div>
       </div>
    </div>
  );
}
