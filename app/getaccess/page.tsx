'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import PricingSection from '@/components/pricing/PricingSection';

export default function GetAccessPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useUserStore();

    // Auth check removed to allow guest viewing.
    // Logic moved to PricingSection for "Upgrade" click.

    // Optional: Hide content while checking?
    // For now, render content. Layout shift is acceptable for this simulation.

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-[#202124] overflow-hidden selection:bg-nebula-blue/30 pb-20">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-nebula-blue/5 blur-[120px] rounded-full mix-blend-multiply opacity-60" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-multiply opacity-50" />
            </div>

            <div className="relative z-10 pt-32 px-6 text-center max-w-4xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                    Professional AI tools shouldn't be expensive.
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    LightSky makes personal branding accessible to everyone. Simple, affordable, and designed for creators.
                </p>
            </div>

            <PricingSection />
        </main>
    );
}
