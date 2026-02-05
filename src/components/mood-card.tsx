"use client";

import { motion } from "framer-motion";
import { Music, Play } from "lucide-react";
import { useState } from "react";

interface MoodCardProps {
    onMoodChange: (mood: string, flavor?: string) => void;
}

export default function MoodCard({ onMoodChange }: MoodCardProps) {
    const [isSyncing, setIsSyncing] = useState(false);
    const [track, setTrack] = useState<any>(null);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const res = await fetch("/api/mood");
            const data = await res.json();
            
            if (data.mood) {
                // Short timeout to simulate "Scanning" feel
                setTimeout(() => {
                    onMoodChange(data.mood, data.flavor);
                    setTrack(data.track);
                    setIsSyncing(false);
                }, 1500);
            }
        } catch (error) {
            console.error("Failed to sync mood", error);
            setIsSyncing(false);
        }
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-3xl h-96 flex flex-col justify-between relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                        <Music className="text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Mood Mode</h2>
                    <p className="text-gray-400 text-sm mb-4">Let the music decide your meal.</p>
                </div>

                {track && !isSyncing && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 p-4 rounded-xl mb-4 flex items-center gap-4"
                    >
                        <img src={track.albumImage} alt={track.title} className="w-16 h-16 rounded-lg object-cover shadow-lg" />
                        <div className="flex-1 overflow-hidden">
                            <h3 className="font-bold truncate text-white">{track.title}</h3>
                            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                             {/* Mock Progress Bar */}
                             <div className="mt-2 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                    className="h-full bg-purple-500" 
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            
                <div className="relative z-10">
                    {!track && !isSyncing && (
                         <div className="mb-4 text-center text-xs text-gray-500">
                             Connects to mock Spotify context
                         </div>
                    )}

                    <button 
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50"
                    >
                        {isSyncing ? (
                             <>
                                <Play size={20} className="fill-white animate-pulse" /> Analying Vibes...
                             </>
                        ) : (
                            track ? "Sync Different Vibe" : "Sync Music"
                        )}
                    </button>
                    
                    {track && !isSyncing && (
                        <div className="mt-2 text-center text-[10px] text-green-400 flex items-center justify-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Now Playing from Mock Context
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );  
}
