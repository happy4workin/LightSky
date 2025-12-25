'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PromptInput from '@/components/ai/PromptInput';
import PortfolioCarousel from '@/components/ai/PortfolioCarousel';
import { GeneratedPortfolio } from '@/lib/ai/mockGenerator';

export default function AIPortfolioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [generatedPortfolios, setGeneratedPortfolios] = useState<GeneratedPortfolio[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (!response.ok) {
                router.push('/login');
            }
        } catch (error) {
            router.push('/login');
        }
    };

    const handleGenerate = async (prompt: string) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate portfolios');
            }

            const data = await response.json();
            setGeneratedPortfolios(data.portfolios);
        } catch (err: any) {
            setError(err.message || 'Failed to generate portfolios');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPortfolio = async (portfolio: GeneratedPortfolio) => {
        try {
            // Update layout with selected AI-generated blocks
            const response = await fetch('/api/layout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    blocks: portfolio.blocks,
                    name: portfolio.name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to apply portfolio');
            }

            // Navigate back to editor
            router.push('/portfolio/edit');
        } catch (err: any) {
            alert(err.message || 'Failed to apply portfolio');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/portfolio/edit')}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            ← Back to Editor
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">AI Portfolio Generator</h1>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    {/* Hero Section */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">✨</div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Let AI Design Your Portfolio
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Describe your vision and watch as AI creates stunning portfolio layouts tailored to your style
                        </p>
                    </div>

                    {/* Prompt Input */}
                    <PromptInput onGenerate={handleGenerate} loading={loading} />

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                            <p className="text-red-600 font-semibold">{error}</p>
                        </div>
                    )}

                    {/* Generated Portfolios Carousel */}
                    {generatedPortfolios.length > 0 && (
                        <PortfolioCarousel
                            portfolios={generatedPortfolios}
                            onSelect={handleSelectPortfolio}
                        />
                    )}

                    {/* How it Works */}
                    {generatedPortfolios.length === 0 && !loading && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                How It Works
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">💭</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">1. Describe</h4>
                                    <p className="text-sm text-gray-600">
                                        Tell us about your ideal portfolio style and theme
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">🎨</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">2. Generate</h4>
                                    <p className="text-sm text-gray-600">
                                        AI creates multiple portfolio designs matching your description
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">✅</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">3. Select</h4>
                                    <p className="text-sm text-gray-600">
                                        Choose your favorite and apply it to your portfolio
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
