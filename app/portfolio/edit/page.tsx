'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from '@/components/editor/canvas/Canvas';
import BlockToolbar from '@/components/editor/BlockToolbar';
import BlockEditor from '@/components/editor/BlockEditor';
import ChatBubble from '@/components/ai/ChatBubble';
import { CanvasBlock, createBlock, BlockType } from '@/lib/editor/blockFactory';
import { useUserStore } from '@/lib/store/userStore';

export default function PortfolioEditPage() {
    const router = useRouter();
    const { user } = useUserStore();
    const [blocks, setBlocks] = useState<CanvasBlock[]>([]);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedBlock, setCopiedBlock] = useState<CanvasBlock | null>(null);
    const [scale, setScale] = useState(1);

    // Helper logic for button
    const isPaidPlan = user?.plan === 'creator' || user?.plan === 'pro';
    const planButtonText = isPaidPlan ? 'Manage Plan' : 'Get Access';

    const handleAIEdit = async () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/ai/edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: aiPrompt, currentBlocks: blocks }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.blocks) {
                    setBlocks(data.blocks);
                    setShowAIModal(false);
                    setAiPrompt('');
                }
            } else {
                alert('Failed to generate changes');
            }
        } catch (error) {
            console.error('AI error:', error);
            alert('Something went wrong');
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        loadLayout();
    }, []);

    const loadLayout = async () => {
        try {
            const res = await fetch('/api/layout');
            if (res.ok) {
                const data = await res.json();
                if (data.layout) {
                    setBlocks(data.layout.blocks || []);
                    // setBackgroundColor(data.layout.backgroundColor); // If we add this to schema later
                }
            }
        } catch (error) {
            console.error('Failed to load layout:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('application/json');
        if (!data) return;

        try {
            const { type } = JSON.parse(data);
            const canvasRect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - canvasRect.left) / scale;
            const y = (e.clientY - canvasRect.top) / scale;

            const newBlock = createBlock(type as BlockType, { x, y });
            setBlocks([...blocks, newBlock]);
            setSelectedBlockId(newBlock.id);
        } catch (err) {
            console.error('Drop error', err);
        }
    };

    const handleUpdateBlock = (id: string, updates: Partial<CanvasBlock>) => {
        setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    };

    const handleMoveBlock = (id: string, newPos: { x: number; y: number }) => {
        setBlocks(blocks.map((b) => (b.id === id ? { ...b, position: newPos } : b)));
    };

    const handleReorderBlock = (id: string, direction: 'front' | 'back') => {
        const blockToMove = blocks.find((b) => b.id === id);
        if (!blockToMove) return;

        const otherBlocks = blocks.filter((b) => b.id !== id);

        if (direction === 'back') {
            setBlocks([blockToMove, ...otherBlocks]);
        } else {
            setBlocks([...otherBlocks, blockToMove]);
        }
    };

    const handleDeleteBlock = (id: string) => {
        setBlocks(blocks.filter((b) => b.id !== id));
        if (selectedBlockId === id) {
            setSelectedBlockId(null);
        }
    };

    const handleDuplicateBlock = (id: string) => {
        const blockToDuplicate = blocks.find((b) => b.id === id);
        if (!blockToDuplicate) return;

        const newBlock: CanvasBlock = {
            ...blockToDuplicate,
            id: crypto.randomUUID(),
            position: {
                x: blockToDuplicate.position.x + 20,
                y: blockToDuplicate.position.y + 20,
            },
        };

        setBlocks([...blocks, newBlock]);
        setSelectedBlockId(newBlock.id);
    };

    const handleCopyBlock = (id: string) => {
        const blockToCopy = blocks.find((b) => b.id === id);
        if (blockToCopy) {
            setCopiedBlock(blockToCopy);
        }
    };

    const handlePasteBlock = () => {
        if (!copiedBlock) return;

        const newBlock: CanvasBlock = {
            ...copiedBlock,
            id: crypto.randomUUID(),
            position: {
                x: copiedBlock.position.x + 30,
                y: copiedBlock.position.y + 30,
            },
        };

        setBlocks([...blocks, newBlock]);
        setSelectedBlockId(newBlock.id);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            const isTyping =
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable;

            const hasTextSelection = () => {
                const selection = window.getSelection();
                return selection && selection.toString().length > 0;
            };

            // Delete/Backspace
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBlockId) {
                if (isTyping) return;
                handleDeleteBlock(selectedBlockId);
            }

            // Ctrl+D - Duplicate
            if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedBlockId) {
                e.preventDefault();
                handleDuplicateBlock(selectedBlockId);
            }

            // Ctrl+C - Smart copy
            if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedBlockId) {
                if (isTyping && hasTextSelection()) {
                    return;
                }
                e.preventDefault();
                handleCopyBlock(selectedBlockId);
            }

            // Ctrl+V - Smart paste
            if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                if (isTyping) {
                    return;
                }
                if (!copiedBlock) return;
                e.preventDefault();
                handlePasteBlock();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedBlockId, blocks, copiedBlock]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/layout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocks }),
            });

            if (response.ok) {
                alert('Layout saved successfully!');
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save layout');
        } finally {
            setSaving(false);
        }
    };

    return (
        // <DndProvider backend={HTML5Backend}>
        <div className="h-screen flex flex-col bg-gray-100">
            <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-20">
                <div className="px-6 py-4 flex items-center justify-between">
                    {/* Logo Area */}
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => router.push('/portfolio')}
                    >
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            LightSky
                        </span>

                        <div className="h-6 w-px bg-gray-200 mx-4" />

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-nebula-blue to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-nebula-blue/20">
                                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-sm font-bold text-[#202124] leading-tight text-left">
                                    {user?.name || user?.email?.split('@')[0]}
                                </h1>
                                <div className="text-[#5F6368] text-xs flex items-center gap-1.5">
                                    <span>{user?.email}</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none ${user?.plan === 'pro' ? 'bg-purple-100 text-purple-700' :
                                        user?.plan === 'creator' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {user?.plan?.toUpperCase() || 'FREE'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 ml-6 border-l border-gray-200 pl-6 h-8">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/portfolio/ai');
                                }}
                                className="flex items-center px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full text-sm font-semibold transition-colors border border-purple-200"
                            >
                                <span className="mr-1.5">✨</span> AI Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/getaccess');
                                }}
                                className={`flex items-center px-3 py-1.5 rounded-full text-sm font-semibold transition-colors border ${isPaidPlan
                                    ? 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                                    : 'bg-gradient-to-r from-nebula-blue to-purple-600 text-white border-transparent hover:opacity-90'
                                    }`}
                            >
                                <span>{planButtonText}</span>
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => router.push('/portfolio')}
                            className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Exit
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm ${saving ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {saving ? 'Saving...' : 'Save Layout'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Toolbar */}
                <div className="w-64 flex-shrink-0 bg-gray-50 border-r border-gray-200 z-10">
                    <BlockToolbar />
                </div>

                {/* Canvas Area */}
                <div className="flex-1 relative overflow-hidden bg-gray-200">
                    <div className="absolute inset-0 overflow-auto p-8 flex">
                        <div
                            className="w-[1280px] min-h-[800px] bg-white shadow-2xl relative flex-shrink-0 m-auto transition-transform duration-200 origin-top-left"
                            style={{
                                backgroundColor,
                                transform: `scale(${scale})`,
                                // Adjust visual margin to keep centered when scaled down if needed,
                                // but m-auto works reasonably well for scroll.
                                // For origin-top-left, we might need a wrapper or origin-center.
                                // origin-center is easier for 'm-auto' centering.
                                transformOrigin: 'center top'
                            }}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <Canvas
                                blocks={blocks}
                                selectedBlockId={selectedBlockId}
                                onSelectBlock={setSelectedBlockId}
                                onUpdateBlock={handleUpdateBlock}
                                onMoveBlock={handleMoveBlock}
                                scale={scale}
                            />
                        </div>
                    </div>

                    {/* Floating Zoom Controls */}
                    <div className="absolute bottom-6 right-8 flex items-center space-x-1 bg-white p-1.5 rounded-lg shadow-lg border border-gray-200 z-50">
                        <button
                            onClick={() => setScale(s => Math.max(0.1, s - 0.1))}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                            title="Zoom Out"
                        >
                            -
                        </button>
                        <span className="w-12 text-center text-sm font-medium text-gray-700">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            onClick={() => setScale(s => Math.min(2, s + 0.1))}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                            title="Zoom In"
                        >
                            +
                        </button>
                        <div className="w-px h-4 bg-gray-300 mx-1" />
                        <button
                            onClick={() => setScale(1)}
                            className="px-2 text-xs text-blue-600 font-medium hover:bg-blue-50 rounded h-8"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Properties Panel */}
                <div className="w-80 flex-shrink-0 bg-white border-l border-gray-200 z-10">
                    <BlockEditor
                        block={blocks.find(b => b.id === selectedBlockId) || null}
                        onUpdate={handleUpdateBlock}
                        onReorder={handleReorderBlock}
                        onDelete={handleDeleteBlock}
                    />
                </div>
            </div>

            {/* AI Chat Assistant */}
            <ChatBubble
                selectedBlockType={
                    selectedBlockId
                        ? blocks.find(b => b.id === selectedBlockId)?.type
                        : undefined
                }
                selectedBlockContent={
                    selectedBlockId && blocks.find(b => b.id === selectedBlockId)?.type === 'text'
                        ? blocks.find(b => b.id === selectedBlockId)?.content?.text
                        : undefined
                }
            />
        </div >
        // </DndProvider>
    );
}
