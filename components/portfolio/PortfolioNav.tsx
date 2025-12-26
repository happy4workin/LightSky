"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function PortfolioNav() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="glass px-2 p-2 rounded-full flex items-center gap-4 shadow-sm border border-black/5 !bg-white/80 backdrop-blur-md">
                <button className="flex items-center gap-2 bg-gradient-to-r from-nebula-blue to-purple-600 hover:from-nebula-blue/90 hover:to-purple-600/90 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Upgrade to Premium</span>
                </button>
            </div>
        </motion.nav>
    );
}
