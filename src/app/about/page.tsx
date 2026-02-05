"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen mesh-gradient text-white p-6 relative">
      <div className="max-w-4xl mx-auto mt-12 space-y-16">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>

        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <h1 className="text-4xl md:text-6xl font-display font-bold">
                Revolutionizing <br />
                <span className="text-gradient">How You Eat</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                VibeBite isn't just a recipe app. It's an intelligent companion that understands that food is emotional. 
                Whether you need comfort after a long day or fuel for a workout, we match your biology and your mood to the perfect meal.
            </p>
        </motion.div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl space-y-4">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-gray-400">To bridge the gap between nutrition and intuition, making healthy eating feel natural and aligned with how you actually feel.</p>
            </div>
            <div className="glass-card p-8 rounded-3xl space-y-4">
                <h3 className="text-2xl font-bold">The Technology</h3>
                <p className="text-gray-400">Powered by advanced LLMs and mood-analysis algorithms, VibeBite processes thousands of recipes to find the one that speaks to you.</p>
            </div>
        </div>

        {/* Team / Social */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-16"
        >
            <h2 className="text-2xl font-bold mb-8">Connect With Us</h2>
            <div className="flex gap-6">
                <SocialLink icon={<Github className="w-6 h-6" />} href="#" label="GitHub" />
                <SocialLink icon={<Twitter className="w-6 h-6" />} href="#" label="Twitter" />
                <SocialLink icon={<Linkedin className="w-6 h-6" />} href="#" label="LinkedIn" />
            </div>
        </motion.div>
      </div>
    </div>
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) {
    return (
        <a 
            href={href} 
            className="p-4 glass-card rounded-full hover:bg-white/10 transition-colors flex items-center gap-3 text-gray-300 hover:text-white"
        >
            {icon}
            <span className="font-medium">{label}</span>
        </a>
    )
}
