'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroVisual() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black selection:bg-purple-500/30">

            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-7xl"
                >
                    Build your personal brand with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">AI vibe coding</span>.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl"
                >
                    No fixed layouts. No rigid grids. Just drag, drop, or prompt AI to design a website that feels as free as your creativity.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/login"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Start Building Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                        href="/login"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:text-zinc-100 dark:hover:bg-zinc-900"
                    >
                        See Examples
                    </Link>
                </motion.div>

            </div>

            {/* Abstract Floating UI Elements simulation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-1/4 left-10 w-48 h-32 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 rotate-[-6deg]"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 mb-3" />
                    <div className="w-3/4 h-3 rounded bg-zinc-200 dark:bg-zinc-800" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="absolute bottom-1/4 right-10 w-40 h-40 bg-white dark:bg-zinc-900 rounded-full shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-center rotate-[12deg]"
                >
                    <div className="text-4xl">✨</div>
                </motion.div>
            </div>
        </section>
    );
}
