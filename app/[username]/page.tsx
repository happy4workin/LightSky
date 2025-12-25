'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Canvas from '@/components/editor/canvas/Canvas';
import PortfolioView from '@/components/portfolio/PortfolioView';
import { IBlock } from '@/lib/models/Portfolio';

export default function PublicPortfolioPage() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;

    const [portfolio, setPortfolio] = useState<{ blocks: IBlock[]; metadata: any } | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPublicPortfolio();
    }, [username]);

    const fetchPublicPortfolio = async () => {
        try {
            const response = await fetch(`/api/portfolio/${username}`);

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Portfolio not found');
                setLoading(false);
                return;
            }

            const data = await response.json();
            setPortfolio(data.portfolio);
            setUser(data.user);
        } catch (error: any) {
            setError(error.message || 'Failed to load portfolio');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <svg className="animate-spin h-12 w-12 mx-auto mb-4 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600">Loading portfolio...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{error}</h2>
                    <p className="text-gray-600 mb-8">The portfolio you're looking for doesn't exist or is private.</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                            {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user?.displayName}</h1>
                            <p className="text-gray-600">@{user?.username}</p>
                            {user?.bio && <p className="text-sm text-gray-500 mt-1">{user.bio}</p>}
                        </div>
                    </div>
                </div>
            </header>

            {/* Portfolio Content */}
            <div className="w-full min-h-screen bg-gray-50 overflow-auto flex justify-center py-8">
                <div className="w-[1280px] min-h-[800px] relative bg-white shadow-2xl flex-shrink-0">
                    <Canvas
                        blocks={portfolio?.blocks as any[] || []}
                        selectedBlockId={null}
                        onSelectBlock={() => { }}
                        onUpdateBlock={() => { }}
                        onMoveBlock={() => { }}
                        readOnly={true}
                    />
                </div>
            </div>
        </div>
    );
}
