'use client';

import { useState } from 'react';

interface PromptInputProps {
    onGenerate: (prompt: string) => void;
    loading: boolean;
}

const examplePrompts = [
    'minimal dark marketing portfolio',
    'creative colorful designer portfolio',
    'professional business portfolio',
    'developer tech portfolio',
    'photography showcase',
];

export default function PromptInput({ onGenerate, loading }: PromptInputProps) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    const handleExampleClick = (example: string) => {
        setPrompt(example);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Portfolio Generator</h2>
                <p className="text-gray-600">Describe your ideal portfolio and let AI create it for you</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                        Describe your portfolio
                    </label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={4}
                        placeholder="E.g., 'minimal dark marketing portfolio with modern design'"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!prompt.trim() || loading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </div>
                    ) : (
                        '✨ Generate Portfolios'
                    )}
                </button>
            </form>

            {/* Example Prompts */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example) => (
                        <button
                            key={example}
                            onClick={() => handleExampleClick(example)}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-lg transition-colors duration-150"
                            disabled={loading}
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
