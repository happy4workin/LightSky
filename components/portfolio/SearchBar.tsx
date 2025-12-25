'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
    id: string;
    username: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
}

export default function SearchBar() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=5`);
            const data = await response.json();
            setResults(data.users || []);
            setShowResults(true);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    const navigateToPortfolio = (username: string) => {
        router.push(`/${username}`);
        setShowResults(false);
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-2xl">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => query && setShowResults(true)}
                    placeholder="Search portfolios by username..."
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </div>
            </div>

            {showResults && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    {results.map((result) => (
                        <button
                            key={result.id}
                            onClick={() => navigateToPortfolio(result.username)}
                            className="w-full px-6 py-4 hover:bg-purple-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 text-left"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                                    {result.displayName.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800">{result.displayName}</div>
                                    <div className="text-sm text-gray-500">@{result.username}</div>
                                    {result.bio && (
                                        <div className="text-sm text-gray-600 mt-1 truncate">{result.bio}</div>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showResults && results.length === 0 && query && !loading && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 text-center z-50">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-gray-600">No portfolios found</p>
                </div>
            )}
        </div>
    );
}
