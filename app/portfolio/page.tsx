'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PortfolioView from '@/components/portfolio/PortfolioView';
import Canvas from '@/components/editor/canvas/Canvas';
import SearchBar from '@/components/portfolio/SearchBar';
import { IBlock } from '@/lib/models/Portfolio';

export default function PortfolioPage() {
    const router = useRouter();
    const [portfolio, setPortfolio] = useState<{ blocks: IBlock[]; metadata: any } | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolio();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (!response.ok) {
                router.push('/login');
                return;
            }
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            router.push('/login');
        }
    };

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

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                                {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-800">{user?.displayName}</h1>
                                <p className="text-sm text-gray-500">@{user?.username}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-150"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover Portfolios</h2>
                    <SearchBar />
                </div>
            </div>

            {/* Portfolio Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">My Portfolio</h2>
                        <a
                            href="/portfolio/edit"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View in editor →
                        </a>
                    </div>
                    <div className="relative min-h-[600px] w-full bg-gray-50 overflow-hidden">
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
        </div>
    );
}
