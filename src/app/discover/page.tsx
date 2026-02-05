"use client";

import { motion } from "framer-motion";
import { Search, Filter, Mic, X } from "lucide-react";
import { useState } from "react";

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Vegan", "High Protein"];

  return (
    <div className="min-h-screen mesh-gradient text-white p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8 mt-12">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold">
            Find Your <span className="text-gradient">Flavor</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Search for recipes by ingredient, cuisine, or mood.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl max-w-2xl mx-auto backdrop-blur-md focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all"
        >
            <Search className="text-gray-400 w-6 h-6" />
            <input 
                type="text" 
                placeholder="What are you craving? (e.g., 'Spicy Pasta', 'Comfort Food')" 
                className="bg-transparent border-none outline-none flex-1 text-lg placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                    <X className="text-gray-400 hover:text-white w-5 h-5 transition-colors" />
                </button>
            )}
            <div className="w-[1px] h-6 bg-white/10 mx-2" />
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors group">
              <Mic className="text-[var(--color-accent)] w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
        </motion.div>

        {/* Filters */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
        >
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                        activeFilter === filter 
                        ? "bg-white text-black border-white" 
                        : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                >
                    {filter}
                </button>
            ))}
        </motion.div>

        {/* Placeholder Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + item * 0.1 }}
                    className="glass-card h-64 rounded-3xl flex items-center justify-center text-gray-500"
                >
                    <p>Recipe Card Placeholder {item}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
