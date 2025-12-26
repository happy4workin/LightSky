'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingAccessButton() {
    const pathname = usePathname();
    // Only show on portfolio pages, but not if we are already in some specific flows if needed.
    // The prompt says "Visible across all /portfolio/* pages"
    const isVisible = pathname?.startsWith('/portfolio');
    const user = useUserStore((state) => state.user);

    // Optionally hide if user is already upgraded, but prompt says "Clicking it always routes to /getaccess"
    // Does not specify to hide if upgraded. I will keep it visible to allow managing plan or just following instructions strict.
    // "Floating Get Access Button... Visible across all /portfolio/* pages"

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed top-24 right-6 z-50 hidden md:block"
            >
                <Link
                    href="/getaccess"
                    className="group flex items-center gap-2 pl-3 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-sm font-medium text-[#202124]"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-nebula-blue to-purple-600 flex items-center justify-center text-white shadow-inner">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="group-hover:text-nebula-blue transition-colors">
                        {user?.plan === 'free' || !user ? 'Get Access' : 'Manage Plan'}
                    </span>
                </Link>
            </motion.div>
        </AnimatePresence>
    );
}
