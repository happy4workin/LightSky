'use client';

import Link from 'next/link';
import {
    Sparkles,
    ArrowRight,
    Heart,
    Speaker,
    Star,
    Zap,
    MousePointer2,
    MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const FLOATING_ICONS = [
    { icon: Heart, color: 'text-pink-400', top: '15%', left: '10%', delay: 0 },
    { icon: Star, color: 'text-yellow-400', top: '25%', right: '15%', delay: 1.5 },
    { icon: Zap, color: 'text-blue-400', bottom: '20%', left: '20%', delay: 3 },
    { icon: MousePointer2, color: 'text-purple-400', top: '40%', right: '25%', delay: 0.5 },
    { icon: MessageCircle, color: 'text-green-400', bottom: '35%', right: '10%', delay: 2 },
    { icon: Speaker, color: 'text-orange-400', bottom: '15%', right: '40%', delay: 4 },
];

export default function CTASection() {
    return (
        <section className="py-32 bg-black text-white relative overflow-hidden min-h-[600px] flex items-center justify-center">
            {/* 
              Background - Atmospheric "Cloud/Mist" Blobs 
              We use huge blurs and slow movement to create a liquid light feel.
            */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Blob 1 - Purple/Pink - Top Left */}
                <motion.div
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/40 blur-[120px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Blob 2 - Blue/Teal - Bottom Right */}
                <motion.div
                    className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/30 blur-[120px]"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Blob 3 - Pink Accent - Center/Floating */}
                <motion.div
                    className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-pink-900/20 blur-[100px]"
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -30, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5
                    }}
                />
            </div>

            {/* Floating Icons Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {FLOATING_ICONS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={i}
                            className={`absolute ${item.color}`}
                            style={{
                                top: item.top,
                                left: item.left,
                                right: item.right,
                                bottom: item.bottom
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 0.6, scale: 1 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 2, // Randomize float speed
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay
                            }}
                        >
                            <motion.div
                                className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 opacity-70"
                                whileHover={{
                                    scale: 1.2,
                                    opacity: 1,
                                    boxShadow: "0 0 20px rgba(255,255,255,0.3)"
                                }}
                                style={{
                                    // Base blur for depth effect, clears on hover via framer motion if needed, 
                                    // but straightforward CSS filter transition is easier for "clearing" blur
                                    filter: "blur(1px)",
                                }}
                            >
                                <Icon className="w-8 h-8 opacity-90" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="container relative z-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-zinc-300 text-sm mb-6 border border-white/10 backdrop-blur-md"
                >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Beta Access</span>
                </motion.div>

                <motion.h2
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8 drop-shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Ready to break the grid?
                </motion.h2>

                <motion.p
                    className="text-lg text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Join thousands of designers, creators, and founders building their personal brand with LightSky.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/login"
                        className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-10 text-lg font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95"
                    >
                        Start Building Now
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
