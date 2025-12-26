'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';

export function FloatingGetAccessButton() {
    const router = useRouter();
    const { user, hasHydrated } = useUserStore();
    const [mounted, setMounted] = useState(false);

    // Only render on client after hydration to prevent SSR mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render during SSR or before hydration
    if (!mounted || !hasHydrated) {
        return null;
    }

    // Determine button state based on plan
    const isPaidPlan = user?.plan === 'creator' || user?.plan === 'pro';
    const buttonText = isPaidPlan ? 'Manage Plan' : 'Get Access';

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="fixed top-6 right-6 z-50"
        >
            <button
                onClick={() => router.push('/getaccess')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isPaidPlan
                    ? 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                    : 'bg-gradient-to-r from-nebula-blue to-purple-600 hover:from-nebula-blue/90 hover:to-purple-600/90 text-white'
                    }`}
            >
                <Sparkles className={`w-4 h-4 ${isPaidPlan ? 'text-nebula-blue' : 'text-white'}`} />
                <span>{buttonText}</span>
            </button>
        </motion.div>
    );
}
