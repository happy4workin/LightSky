'use client';

import { useState } from 'react';
import { CanvasBlock } from '@/lib/editor/blockFactory';
import TextRewritePanel from '@/components/ai/TextRewritePanel';

interface BlockEditorProps {
    block: CanvasBlock | null;
    onUpdate: (id: string, updates: Partial<CanvasBlock>) => void;
    onReorder?: (id: string, direction: 'front' | 'back') => void;
    onDelete?: (id: string) => void;
}

export default function BlockEditor({ block, onUpdate, onReorder, onDelete }: BlockEditorProps) {
    const [showAIRewrite, setShowAIRewrite] = useState(false);

    if (!block) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full">
                <div className="text-center text-gray-500 mt-10">
                    <p>Select a block to edit properties</p>
                </div>
            </div>
        );
    }

    const updateContent = (updates: any) => {
        onUpdate(block.id, {
            content: { ...block.content, ...updates },
        });
    };

    const updateStyles = (updates: any) => {
        onUpdate(block.id, {
            styles: { ...block.styles, ...updates },
        });
    };

    const updateSize = (updates: { width?: number; height?: number }) => {
        onUpdate(block.id, {
            size: { ...block.size, ...updates },
        });
    };

    const updatePosition = (updates: { x?: number; y?: number }) => {
        onUpdate(block.id, {
            position: { ...block.position, ...updates },
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6 h-full overflow-y-auto">
            <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{block.type}</h3>
                <div className="text-xs text-gray-500 font-mono mt-1">{block.id.slice(0, 8)}...</div>
            </div>

            {/* Layering Controls */}
            {onReorder && (
                <div className="flex space-x-2">
                    <button
                        onClick={() => onReorder(block.id, 'front')}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-xs py-1 px-2 rounded text-gray-700"
                    >
                        Bring to Front ↑
                    </button>
                    <button
                        onClick={() => onReorder(block.id, 'back')}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-xs py-1 px-2 rounded text-gray-700"
                    >
                        Send to Back ↓
                    </button>
                </div>
            )}

            {/* Layout Controls */}
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Layout</label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-xs text-gray-400">X</label>
                        <input
                            type="number"
                            value={Math.round(block.position.x)}
                            onChange={(e) => updatePosition({ x: parseInt(e.target.value) })}
                            className="w-full px-2 py-1 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400">Y</label>
                        <input
                            type="number"
                            value={Math.round(block.position.y)}
                            onChange={(e) => updatePosition({ y: parseInt(e.target.value) })}
                            className="w-full px-2 py-1 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400">W</label>
                        <input
                            type="number"
                            value={Math.round(block.size.width)}
                            onChange={(e) => updateSize({ width: parseInt(e.target.value) })}
                            className="w-full px-2 py-1 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400">H</label>
                        <input
                            type="number"
                            value={Math.round(block.size.height)}
                            onChange={(e) => updateSize({ height: parseInt(e.target.value) })}
                            className="w-full px-2 py-1 text-sm border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Visual Effects */}
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Visual Effects</label>
                <div className="space-y-3">
                    {/* Opacity */}
                    <div>
                        <label className="text-xs text-gray-400 flex justify-between">
                            <span>Opacity</span>
                            <span>{Math.round((block.styles.opacity ?? 1) * 100)}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={block.styles.opacity ?? 1}
                            onChange={(e) => updateStyles({ opacity: parseFloat(e.target.value) })}
                            className="w-full accent-blue-600"
                        />
                    </div>

                    {/* Rotation */}
                    <div>
                        <label className="text-xs text-gray-400">Rotation (degrees)</label>
                        <input
                            type="number"
                            min="0"
                            max="360"
                            value={block.styles.rotation || 0}
                            onChange={(e) => updateStyles({ rotation: parseInt(e.target.value) || 0 })}
                            className="w-full px-2 py-1 text-sm border rounded"
                        />
                    </div>

                    {/* Border Radius */}
                    <div>
                        <label className="text-xs text-gray-400">Border Radius</label>
                        <input
                            type="number"
                            min="0"
                            value={block.styles.borderRadius || 0}
                            onChange={(e) => updateStyles({ borderRadius: parseInt(e.target.value) || 0 })}
                            className="w-full px-2 py-1 text-sm border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Specific Controls based on type */}

            {/* TEXT */}
            {block.type === 'text' && (
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Typography</label>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-400">Content</label>
                            <textarea
                                value={block.content?.text}
                                onChange={(e) => updateContent({ text: e.target.value })}
                                className="w-full px-2 py-1 text-sm border rounded"
                                rows={3}
                            />
                        </div>

                        {/* AI Rewrite Button */}
                        <div>
                            <button
                                onClick={() => setShowAIRewrite(!showAIRewrite)}
                                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                {showAIRewrite ? 'Hide AI Rewrite' : '✨ AI Rewrite'}
                            </button>
                        </div>

                        {/* AI Rewrite Panel */}
                        {showAIRewrite && (
                            <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-purple-200">
                                <TextRewritePanel
                                    currentText={block.content?.text || ''}
                                    onApply={(rewrittenText) => {
                                        updateContent({ text: rewrittenText });
                                        setShowAIRewrite(false);
                                    }}
                                    onCancel={() => setShowAIRewrite(false)}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-gray-400">Size (px)</label>
                                <input
                                    type="number"
                                    value={block.styles.fontSize || 16}
                                    onChange={(e) => updateStyles({ fontSize: parseInt(e.target.value) })}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400">Color</label>
                                <input
                                    type="color"
                                    value={block.styles.color || '#000000'}
                                    onChange={(e) => updateStyles({ color: e.target.value })}
                                    className="w-full h-8 border rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* RECTANGLE & SECTION */}
            {(block.type === 'rectangle' || block.type === 'section') && (
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Appearance</label>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-gray-400">Fill</label>
                                <input
                                    type="color"
                                    value={block.styles.backgroundColor || '#ffffff'}
                                    onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                                    className="w-full h-8 border rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400">Opacity</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={block.styles.opacity ?? 1}
                                    onChange={(e) => updateStyles({ opacity: parseFloat(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400">Radius</label>
                            <input
                                type="number"
                                value={block.styles.borderRadius || 0}
                                onChange={(e) => updateStyles({ borderRadius: parseInt(e.target.value) })}
                                className="w-full px-2 py-1 text-sm border rounded"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION SPECIFIC - FLEXBOX */}
            {block.type === 'section' && (
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Auto Layout</label>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-400">Direction</label>
                            <select
                                value={block.styles.direction || 'vertical'}
                                onChange={(e) => updateStyles({ direction: e.target.value })}
                                className="w-full px-2 py-1 text-sm border rounded"
                            >
                                <option value="vertical">Vertical ↓</option>
                                <option value="horizontal">Horizontal →</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-gray-400">Gap</label>
                                <input
                                    type="number"
                                    value={block.styles.gap || 0}
                                    onChange={(e) => updateStyles({ gap: parseInt(e.target.value) })}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400">Padding</label>
                                <input
                                    type="number"
                                    value={block.styles.padding || 0}
                                    onChange={(e) => updateStyles({ padding: parseInt(e.target.value) })}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* IMAGE */}
            {block.type === 'image' && (
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Image Source</label>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-400">URL</label>
                            <input
                                type="text"
                                value={block.content?.src || ''}
                                onChange={(e) => updateContent({ src: e.target.value })}
                                className="w-full px-2 py-1 text-sm border rounded"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400">Fit</label>
                            <select
                                value={block.styles.objectFit || 'cover'}
                                onChange={(e) => updateStyles({ objectFit: e.target.value })}
                                className="w-full px-2 py-1 text-sm border rounded"
                            >
                                <option value="cover">Cover</option>
                                <option value="contain">Contain</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE BUTTON */}
            {onDelete && (
                <div className="pt-6 border-t mt-4">
                    <button
                        onClick={() => onDelete(block.id)}
                        className="w-full py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors"
                    >
                        Delete Block
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-2">
                        Or press Delete / Backspace
                    </p>
                </div>
            )}
        </div>
    );
}
