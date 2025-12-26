"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] text-white"
        >
            {/* Ambient Background (Expansion Metaphor - REVERSED/DARK) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nebula-blue/20 blur-[120px] rounded-full animate-pulse-slow mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-solar-flare/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
            </div>

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                >
                    <h1 className="text-[12vh] leading-[0.9] font-[family-name:var(--font-dream)] tracking-tight text-white mb-2 drop-shadow-2xl">
                        LIGHT SKY
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 max-w-xl text-lg text-white/60 font-mono tracking-wide uppercase flex flex-col items-center gap-6"
                >
                    <p>Where your brand becomes a story, and the world your audience.</p>
                    <a
                        href="/getaccess"
                        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-200 z-20 cursor-pointer"
                        onClick={(e) => {
                            // Verify click handling ensuring no propagation issues
                            e.stopPropagation();
                        }}
                    >
                        Get Access
                    </a>
                </motion.div>

            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute bottom-[25%] left-1/2 -translate-x-1/2 text-2xl md:text-3xl text-white font-[family-name:var(--font-dream)] tracking-wide whitespace-nowrap"
            >
                Light up the sky with your potential.
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-sm font-mono"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                SCROLL TO EXPAND
            </motion.div>
        </section>
    );
}
