"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="relative py-48 px-6 text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-nebula-blue/20 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-nebula-blue/10 to-transparent" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 max-w-2xl mx-auto"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
                    Enter the <span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-blue to-solar-flare">Flow</span>.
                </h2>
                <p className="text-[#666666] text-xl mb-12 font-bold">
                    Enter your <span className="text-white">Light</span>.
                </p>

                <Link href="/login">
                    <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
                        <span className="relative z-10">Start Building Free</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-nebula-blue to-solar-flare opacity-0 group-hover:opacity-20 transition-opacity" />
                    </button>
                </Link>
            </motion.div>
        </section>
    );
}
