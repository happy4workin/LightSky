"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function NavDock() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="glass px-6 py-3 rounded-full flex items-center gap-8 text-sm font-medium tracking-wide text-[#666666]">
                <Link href="/login" className="hover:text-white transition-colors duration-300">Log In / Sign In</Link>
                <Link href="/getaccess" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-[#666666] transition-all duration-300 border border-white/5 hover:text-white">
                    Get Access
                </Link>
            </div>
        </motion.nav>
    );
}
