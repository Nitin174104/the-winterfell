"use client";

import { motion } from "framer-motion";
import { Heart, Activity } from "lucide-react";

export default function HealthCard() {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-3xl h-96 flex flex-col justify-between relative overflow-hidden group"
        >
             <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors" />

            <div className="relative z-10">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Heart className="text-red-400" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Health Mode</h2>
                <p className="text-gray-400">Low Sodium goals active.</p>
            </div>

             <div className="relative z-10">
                <div className="bg-black/40 p-4 rounded-xl mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Daily Sodium</span>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">On Track</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div className="w-[30%] h-full bg-red-500" />
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500">450 / 2000 mg</p>
                </div>

                <button className="w-full py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                    View Health Plan
                </button>
            </div>
        </motion.div>
    );
}
