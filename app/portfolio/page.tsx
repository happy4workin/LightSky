'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PortfolioView from '@/components/portfolio/PortfolioView';
import Canvas from '@/components/editor/canvas/Canvas';
import SearchBar from '@/components/portfolio/SearchBar';
import { IBlock } from '@/lib/models/Portfolio';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { useUserStore } from '@/lib/store/userStore';
import { FloatingGetAccessButton } from '@/components/portfolio/FloatingGetAccessButton';


export default function PortfolioPage() {
    const router = useRouter();
    const [portfolio, setPortfolio] = useState<{ blocks: IBlock[]; metadata: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated, hasHydrated } = useUserStore();

    useEffect(() => {
        // Wait for hydration before checking auth
        if (hasHydrated && !isAuthenticated) {
            router.push('/login?redirect=/portfolio');
            return;
        }

        if (hasHydrated && isAuthenticated) {
            fetchPortfolio();
        }
    }, [hasHydrated, isAuthenticated, router]);

    const fetchPortfolio = async () => {
        try {
            const response = await fetch('/api/portfolio');
            if (!response.ok) {
                throw new Error('Failed to fetch portfolio');
            }
            const data = await response.json();
            setPortfolio(data.portfolio);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        } finally {
            setLoading(false);
        }
    };



    if (!hasHydrated || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] text-[#202124]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-nebula-blue/30 border-t-nebula-blue rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#5F6368]">Loading portfolio...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-[#202124] selection:bg-nebula-blue/30 overflow-x-hidden relative">
            {/* Floating Get Access Button */}
            <FloatingGetAccessButton />

            {/* Ambient Background - Adjusted for Light Mode */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-nebula-blue/10 blur-[150px] rounded-full mix-blend-multiply opacity-60 animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-solar-flare/10 blur-[150px] rounded-full mix-blend-multiply opacity-50 animate-pulse-slow delay-1000" />
            </div>

            <div className="relative z-10 pt-20 pb-20 px-6 max-w-7xl mx-auto">
                {/* Header */}
                <GlassCard className="mb-8 p-6 flex flex-row items-center justify-between gap-6 !bg-white/60 !border-black/5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-nebula-blue to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-nebula-blue/20">
                            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#202124] tracking-tight">{user?.name || user?.email?.split('@')[0]}</h1>
                            <p className="text-[#5F6368] text-sm">
                                <span className="inline-flex items-center gap-2">
                                    {user?.email}
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user?.plan === 'pro' ? 'bg-purple-100 text-purple-700' :
                                            user?.plan === 'creator' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {user?.plan?.toUpperCase() || 'FREE'}
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>

                </GlassCard>

                {/* Discovery Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center md:text-left text-[#202124]">
                        Discover <span className="text-nebula-blue">Flows</span>
                    </h2>
                    <GlassCard className="p-8 !bg-white/60 !border-black/5">
                        <SearchBar />
                    </GlassCard>
                </div>

                {/* My Portfolio */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold tracking-tight text-[#202124]">My Portfolio</h2>
                        <a
                            href="/portfolio/edit"
                            className="group flex items-center gap-2 text-nebula-blue hover:text-[#174EA6] transition-colors duration-300 font-medium"
                        >
                            Open Editor
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>

                    <GlassCard className="overflow-hidden !border-black/5 min-h-[600px] relative !bg-white/60">
                        <div className="absolute inset-0 bg-grid-black/[0.03] -z-[1]" />
                        {/* Mock Canvas View */}
                        <div className="w-full h-full min-h-[600px] bg-white/40 backdrop-blur-sm">
                            <Canvas
                                blocks={portfolio?.blocks as any[] || []}
                                selectedBlockId={null}
                                onSelectBlock={() => { }}
                                onUpdateBlock={() => { }}
                                onMoveBlock={() => { }}
                                readOnly={true}
                            />
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Footer gradient */}
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F8F9FA] to-transparent pointer-events-none z-20" />
        </main>
    );
}
