"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChefHat, Search, Heart, Music, CheckCircle, Smartphone, Globe, Instagram, Twitter, Facebook, User, LogOut } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Parallax } from "@/components/animations/Parallax";
import { Mirror } from "@/components/animations/Mirror";
import { CookingProcess } from "@/components/CookingProcess";
import { FoodShowcase } from "@/components/FoodShowcase";

import { VideoBackground } from "@/components/VideoBackground";

export default function Home() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-100">
            <VideoBackground />

            {/* Persistent Navbar */}
            <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform">
                        Vibe<span className="text-[var(--color-creamy-gold)]">Bite</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-white/70 hover:text-white transition-colors">Dashboard</Link>
                                <div className="flex items-center gap-3 glass-card px-3 py-1.5 rounded-full border border-white/10">
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-white/20" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <User size={16} />
                                        </div>
                                    )}
                                    <span className="font-medium text-sm hidden sm:block pr-1">{session.user?.name?.split(' ')[0]}</span>
                                </div>
                                <button
                                    onClick={() => import("next-auth/react").then(({ signOut }) => signOut())}
                                    className="p-2.5 glass-card rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    title="Sign Out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                                className="px-6 py-2.5 glass-card rounded-full font-medium text-sm hover:bg-white hover:text-black transition-all border border-white/10"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
                <ScrollReveal direction="down" duration={0.8}>
                    <span className="px-5 py-2 rounded-full glass-card border border-white/10 text-sm font-medium text-[var(--color-neon-lime)] inline-flex items-center gap-2 mb-8">
                        <Sparkles size={16} /> #1 AI Food Companion
                    </span>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2} duration={0.8}>
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.1]">
                        Match Your <span className="text-gradient">Unknown</span> <br />
                        To Your <span className="text-gradient">Craving</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.4} duration={0.8}>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Stop scrolling for hours. Let VibeBite's AI analyse your Spotify jams, health goals, and deepest cravings to find your perfect meal across 2M+ recipes.
                    </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.6} duration={0.8}>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        {session ? (
                            <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg">
                                Go to Dashboard <ArrowRight size={20} />
                            </Link>
                        ) : (
                            <button
                                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg"
                            >
                                Start Your Journey <ArrowRight size={20} />
                            </button>
                        )}
                        <Link href="#features" className="w-full sm:w-auto px-10 py-5 glass-card text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
                            Explore Features
                        </Link>
                    </div>
                </ScrollReveal>

                {/* Hero Image Concept */}
                <ScrollReveal direction="up" delay={0.8} duration={1} className="mt-20 w-full max-w-5xl">
                    <Mirror className="rounded-[3rem]">
                        <div className="relative glass-card rounded-[3rem] p-4 border border-white/10 shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop" className="w-full h-auto rounded-[2.5rem] object-cover max-h-[500px] opacity-80" alt="App Dashboard Preview" />
                            <div className="absolute -bottom-10 -right-10 glass-card p-6 rounded-3xl animate-bounce-slow hidden md:block">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"><CheckCircle size={20} color="white" /></div>
                                    <span className="font-bold">Match Found!</span>
                                </div>
                                <p className="text-sm text-gray-400">"Spicy Pasta" matched with <br /> Weeknd's "Starboy"</p>
                            </div>
                        </div>
                    </Mirror>
                </ScrollReveal>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <ScrollReveal direction="up" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Explore Your Vibe</h2>
                        <p className="text-gray-400 text-lg">Three powerful modes designed for however you're feeling today.</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal direction="left" delay={0.2} className="h-full">
                            <Link href="/mood" className="h-full block">
                                <FeatureCard
                                    icon={<Music className="w-10 h-10 text-[#1DB954]" />}
                                    title="Spotify Sync"
                                    subtitle="Feeling sad? Getting pumped?"
                                    description="We analyze your 'Now Playing' to recommend food that matches the tempo and mood of your music."
                                    color="hover:border-[#1DB954]/50"
                                />
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.4} className="h-full">
                            <Link href="/health" className="h-full block">
                                <FeatureCard
                                    icon={<Heart className="w-10 h-10 text-red-500" />}
                                    title="Health Guard"
                                    subtitle="Low Sodium? Keto?"
                                    description="Strictly filters recipes based on your dietary needs without sacrificing the flavor you crave."
                                    color="hover:border-red-500/50"
                                />
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal direction="right" delay={0.6} className="h-full">
                            <Link href="/custom" className="h-full block">
                                <FeatureCard
                                    icon={<Search className="w-10 h-10 text-[var(--color-neon-lime)]" />}
                                    title="Cravings Hunter"
                                    subtitle="Specific taste?"
                                    description="Advanced search that understands 'spicy but not too hot' or 'sweet breakfast for dinner'."
                                    color="hover:border-[var(--color-neon-lime)]/50"
                                />
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Cooking Process Section */}
            <CookingProcess />

            {/* Food Showcase Section */}
            <FoodShowcase />

            {/* How It Works - Visual Diagram */}
            <section className="py-20 relative text-center overflow-hidden">
                <div className="container mx-auto max-w-6xl px-4 relative z-10">
                    <ScrollReveal direction="up" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">How VibeBite Works</h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">From your vibe to your plate in 3 simple steps.</p>
                    </ScrollReveal>

                    {/* Diagram Container */}
                    <div className="relative flex flex-col md:flex-row justify-center items-center gap-12 md:gap-0">

                        {/* Connecting Line - Desktop (Horizontal) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-2 bg-white/5 -translate-y-1/2 z-0">
                            <div className="absolute inset-0 bg-[var(--color-neon-lime)]/30 blur-sm" />
                            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,var(--color-neon-lime)_20px,var(--color-neon-lime)_40px)] opacity-20 animate-slide-bg" />
                        </div>

                        {/* Connecting Line - Mobile (Vertical) */}
                        <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-2 bg-white/5 -translate-x-1/2 z-0">
                            <div className="absolute inset-0 bg-[var(--color-neon-lime)]/30 blur-sm" />
                            <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,var(--color-neon-lime)_20px,var(--color-neon-lime)_40px)] opacity-20 animate-slide-bg-vertical" />
                        </div>

                        {/* Step 1: Input */}
                        <ScrollReveal direction="left" delay={0.1}>
                            <DiagramNode
                                title="1. Connect"
                                subtitle="Spotify / Health"
                                icon={<Music size={32} />}
                                position="start"
                            />
                        </ScrollReveal>

                        {/* Arrow Connector */}
                        <div className="hidden md:flex relative z-10 w-24 items-center justify-center">
                            <ArrowRight className="text-[var(--color-neon-lime)] animate-pulse" size={32} />
                        </div>

                        {/* Step 2: Processing */}
                        <ScrollReveal direction="up" delay={0.3}>
                            <DiagramNode
                                title="2. Analyze"
                                subtitle="AI Magic"
                                icon={<Sparkles size={32} />}
                                position="middle"
                                isCentral={true}
                            />
                        </ScrollReveal>

                        {/* Arrow Connector */}
                        <div className="hidden md:flex relative z-10 w-24 items-center justify-center">
                            <ArrowRight className="text-[var(--color-neon-lime)] animate-pulse" size={32} />
                        </div>

                        {/* Step 3: Output */}
                        <ScrollReveal direction="right" delay={0.5}>
                            <DiagramNode
                                title="3. Eat"
                                subtitle="Perfect Recipe"
                                icon={<ChefHat size={32} />}
                                position="end"
                            />
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <ScrollReveal direction="up" className="mb-12">
                        <h2 className="text-4xl font-display font-bold">Cooked by 10,000+ Users</h2>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <ScrollReveal direction="left" delay={0.2}>
                            <div className="glass-card p-8 rounded-3xl h-full">
                                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                    <CheckCircle size={16} fill="currentColor" /> Verified User
                                </div>
                                <p className="text-lg leading-relaxed mb-6">"I never knew I needed a pasta recipe that matches my lofi playlist until now. Valid."</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-600 rounded-full" />
                                    <div>
                                        <div className="font-bold">Rahul C.</div>
                                        <div className="text-sm text-gray-500">Music Lover</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.4}>
                            <div className="glass-card p-8 rounded-3xl h-full">
                                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                    <CheckCircle size={16} fill="currentColor" /> Verified User
                                </div>
                                <p className="text-lg leading-relaxed mb-6">"Finally an app that respects my low-sodium diet but actually gives me tasty ideas."</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-600 rounded-full" />
                                    <div>
                                        <div className="font-bold">Sarah J.</div>
                                        <div className="text-sm text-gray-500">Fitness Coach</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-black/40 pt-20 pb-10 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2">
                            <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                                <ChefHat className="text-[var(--color-neon-lime)]" /> VibeBite
                            </h3>
                            <p className="text-gray-400 max-w-sm mb-6">
                                The world's first mood-based recipe discovery engine. Built for music lovers, health nuts, and foodies.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={<Twitter size={20} />} />
                                <SocialIcon icon={<Instagram size={20} />} />
                                <SocialIcon icon={<Facebook size={20} />} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Explore</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="/mood" className="hover:text-white transition-colors">Mood Match</Link></li>
                                <li><Link href="/health" className="hover:text-white transition-colors">Health Goals</Link></li>
                                <li><Link href="/custom" className="hover:text-white transition-colors">Custom Search</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Company</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} VibeBite Inc. All rights reserved. Crafted with 💚 & 🎵.
                    </div>
                </div>
            </footer>

        </div>
    );
}

// Components

function FeatureCard({ icon, title, subtitle, description, color }: any) {
    return (
        <Mirror className={`glass-card p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 h-full border border-white/5 ${color} cursor-pointer`}>
            <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">{subtitle}</div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </Mirror>
    );
}

function DiagramNode({ title, subtitle, icon, position, isCentral }: any) {
    return (
        <div className="flex flex-col items-center relative z-10 group">
            <div className={`relative flex items-center justify-center rounded-full transition-all duration-500 ${isCentral ? 'w-40 h-40 bg-black border-2 border-[var(--color-neon-lime)] shadow-[0_0_50px_rgba(204,255,0,0.3)]' : 'w-32 h-32 bg-gray-900 border border-white/10 hover:border-[var(--color-neon-lime)]'}`}>
                {/* Inner Pulse */}
                {isCentral && <div className="absolute inset-0 rounded-full bg-[var(--color-neon-lime)]/10 animate-ping" />}

                <div className={`text-white transition-transform duration-300 group-hover:scale-110 ${isCentral ? 'text-[var(--color-neon-lime)]' : ''}`}>
                    {icon}
                </div>
            </div>

            <div className="mt-6 text-center bg-black/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">{subtitle}</p>
            </div>
        </div>
    )
}

function SocialIcon({ icon }: any) {
    return (
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all">
            {icon}
        </div>
    )
}
