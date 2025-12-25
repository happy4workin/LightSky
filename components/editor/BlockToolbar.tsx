'use client';

// import { useDraggable } from '@dnd-kit/core';
import { BlockType } from '@/lib/editor/blockFactory';

interface BlockToolbarProps {
    onAddBlock?: (type: BlockType) => void;
}

interface DraggableBlockTypeProps {
    type: BlockType;
    icon: string;
    label: string;
    color: string;
}

function DraggableBlockType({ type, icon, label, color }: DraggableBlockTypeProps) {
    // Simple draggable for now, relying on click-to-add for this step
    // Dnd-kit implementation would go here for drag-to-canvas

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify({ type }));
                e.dataTransfer.effectAllowed = 'copy';
            }}
            className="p-4 rounded-xl border-2 border-dashed cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 bg-white"
            style={{ borderColor: color }}
        >
            <div className="text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-sm font-semibold" style={{ color }}>
                    {label}
                </div>
            </div>
        </div>
    );
}

export default function BlockToolbar() {
    const blockTypes: DraggableBlockTypeProps[] = [
        { type: 'text', icon: '📝', label: 'Text', color: '#3b82f6' },
        { type: 'image', icon: '🖼️', label: 'Image', color: '#8b5cf6' },
        { type: 'section', icon: '📦', label: 'Section', color: '#10b981' },
        { type: 'rectangle', icon: '🟦', label: 'Rectangle', color: '#f59e0b' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Primitives</h3>
            <div className="space-y-3">
                {blockTypes.map((blockType) => (
                    <DraggableBlockType key={blockType.type} {...blockType} />
                ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                    Drag to canvas
                </p>
            </div>
        </div>
    );
}
