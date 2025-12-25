'use client';

import { useState } from 'react';
import { useTextRewrite } from '@/lib/ai/useTextRewrite';

interface TextRewritePanelProps {
    currentText: string;
    onApply: (rewrittenText: string) => void;
    onCancel?: () => void;
}

/**
 * AI Text Rewrite Panel Component
 * 
 * Allows users to rewrite selected text using AI (Gemini)
 * Usage: Display this panel when user wants to edit text with AI assistance
 */
export default function TextRewritePanel({
    currentText,
    onApply,
    onCancel,
}: TextRewritePanelProps) {
    const [instruction, setInstruction] = useState('');
    const [previewText, setPreviewText] = useState<string | null>(null);

    const { rewriteText, isLoading, error } = useTextRewrite({
        onSuccess: (rewrittenText) => {
            setPreviewText(rewrittenText);
        },
        onError: (error) => {
            console.error('Rewrite error:', error);
        },
    });

    const handleRewrite = async () => {
        if (!instruction.trim()) return;
        await rewriteText(currentText, instruction);
    };

    const handleApply = () => {
        if (previewText) {
            onApply(previewText);
            setPreviewText(null);
            setInstruction('');
        }
    };

    const handleCancel = () => {
        setPreviewText(null);
        setInstruction('');
        onCancel?.();
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="mb-3">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                    AI Text Rewrite
                </h3>
                <p className="text-xs text-gray-600">
                    Tell the AI how you want to modify your text
                </p>
            </div>

            {/* Original Text */}
            <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                    Original Text
                </label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200 text-xs text-gray-800 max-h-20 overflow-y-auto">
                    {currentText || '(No text)'}
                </div>
            </div>

            {/* Instruction Input */}
            <div className="mb-3">
                <label
                    htmlFor="instruction"
                    className="block text-xs font-medium text-gray-700 mb-1"
                >
                    Your Instruction
                </label>
                <textarea
                    id="instruction"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="e.g., Make it more professional, Add enthusiasm, Shorten it, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                    rows={2}
                    disabled={isLoading}
                />
            </div>

            {/* Generate Button */}
            <button
                onClick={handleRewrite}
                disabled={!instruction.trim() || isLoading}
                className="w-full mb-3 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Rewriting...
                    </span>
                ) : (
                    '✨ Rewrite with AI'
                )}
            </button>

            {/* Error Message */}
            {error && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-800">{error}</p>
                </div>
            )}

            {/* Preview */}
            {previewText && (
                <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Rewritten Text (Preview)
                    </label>
                    <div className="p-2 bg-green-50 rounded-lg border border-green-200 text-xs text-gray-800 whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {previewText}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            {previewText && (
                <div className="flex gap-2 mb-2">
                    <button
                        onClick={handleApply}
                        className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Apply Changes
                    </button>
                    <button
                        onClick={() => setPreviewText(null)}
                        className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Cancel Button */}
            {!previewText && (
                <button
                    onClick={handleCancel}
                    className="w-full mt-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Cancel
                </button>
            )}

            {/* Quick Suggestions */}
            <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                    {[
                        'Make it more professional',
                        'Add enthusiasm',
                        'Make it shorter',
                        'Make it longer',
                        'Simplify the language',
                    ].map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setInstruction(suggestion)}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                            disabled={isLoading}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
