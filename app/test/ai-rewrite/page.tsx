'use client';

import { useState } from 'react';
import TextRewritePanel from '@/components/ai/TextRewritePanel';

/**
 * Test page for AI Text Rewriting Feature
 * Navigate to /test/ai-rewrite to test this feature
 */
export default function AIRewriteTestPage() {
    const [currentText, setCurrentText] = useState(
        'I am a passionate developer who loves creating amazing websites and applications.'
    );

    const handleApply = (rewrittenText: string) => {
        setCurrentText(rewrittenText);
        alert('Text has been updated!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🤖 AI Text Rewriting Test
                    </h1>
                    <p className="text-gray-600">
                        Test the Gemini-powered text rewriting feature
                    </p>
                </div>

                {/* Current Text Display */}
                <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        Current Text in Editor
                    </h2>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-800">{currentText}</p>
                    </div>
                    <button
                        onClick={() =>
                            setCurrentText(
                                'I am a passionate developer who loves creating amazing websites and applications.'
                            )
                        }
                        className="mt-3 text-sm text-blue-600 hover:text-blue-700"
                    >
                        Reset to default
                    </button>
                </div>

                {/* Text Rewrite Panel */}
                <TextRewritePanel
                    currentText={currentText}
                    onApply={handleApply}
                    onCancel={() => console.log('Cancelled')}
                />

                {/* Instructions */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        💡 How to Test
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                        <li>Make sure you have GEMINI_API_KEY set in .env.local</li>
                        <li>Make sure you&apos;re logged in</li>
                        <li>Enter an instruction like &quot;Make it more professional&quot;</li>
                        <li>Click &quot;Rewrite with AI&quot; button</li>
                        <li>Review the preview</li>
                        <li>Click &quot;Apply Changes&quot; to update the text above</li>
                    </ol>
                </div>

                {/* Example Instructions */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                        📝 Example Instructions to Try
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <strong>Professional:</strong> &quot;Make it more professional and suitable for a corporate portfolio&quot;
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <strong>Enthusiastic:</strong> &quot;Add more enthusiasm and energy&quot;
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <strong>Concise:</strong> &quot;Make it shorter and more impactful&quot;
                        </div>
                        <div className="p-3 bg-pink-50 rounded-lg">
                            <strong>Detailed:</strong> &quot;Expand with more details about skills&quot;
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <strong>Casual:</strong> &quot;Make it sound more casual and friendly&quot;
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-lg">
                            <strong>Creative:</strong> &quot;Make it more creative and unique&quot;
                        </div>
                    </div>
                </div>

                {/* API Status */}
                <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600">
                        API Endpoint: <code className="bg-white px-2 py-1 rounded">/api/ai/rewrite-text</code>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        Model: Google Gemini Pro
                    </p>
                </div>
            </div>
        </div>
    );
}
