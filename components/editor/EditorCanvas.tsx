'use client';

import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { IBlock } from '@/lib/models/Portfolio';
import { createDefaultBlock, calculateDropPosition } from '@/lib/editor/blockHelpers';
import DraggableBlock from './DraggableBlock';

interface EditorCanvasProps {
    blocks: IBlock[];
    onUpdateBlock: (block: IBlock) => void;
    onDeleteBlock: (id: string) => void;
    onAddBlock: (block: IBlock) => void;
    selectedBlockId: string | null;
    onSelectBlock: (id: string | null) => void;
    backgroundColor: string;
}

export default function EditorCanvas({
    blocks,
    onUpdateBlock,
    onDeleteBlock,
    onAddBlock,
    selectedBlockId,
    onSelectBlock,
    backgroundColor,
}: EditorCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['NEW_BLOCK', 'EXISTING_BLOCK'],
        drop: (item: any, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset || !canvasRef.current) return;

            const canvasRect = canvasRef.current.getBoundingClientRect();
            const dropX = offset.x - canvasRect.left;
            const dropY = offset.y - canvasRect.top;

            if (monitor.getItemType() === 'NEW_BLOCK') {
                // Adding new block
                const position = calculateDropPosition(
                    dropX,
                    dropY,
                    canvasRef.current.scrollTop,
                    canvasRef.current.scrollLeft
                );
                const newBlock = createDefaultBlock(item.blockType, position);
                onAddBlock(newBlock);
            } else if (monitor.getItemType() === 'EXISTING_BLOCK') {
                // Moving existing block
                const block = blocks.find((b) => b.id === item.id);
                if (block) {
                    const position = calculateDropPosition(
                        dropX,
                        dropY,
                        canvasRef.current.scrollTop,
                        canvasRef.current.scrollLeft
                    );
                    onUpdateBlock({
                        ...block,
                        position,
                    });
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [blocks, onAddBlock, onUpdateBlock]);

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onSelectBlock(null);
        }
    };

    return (
        <div
            ref={(node) => {
                drop(node);
                (canvasRef as any).current = node;
            }}
            onClick={handleCanvasClick}
            className={`relative min-h-screen overflow-auto ${isOver ? 'ring-4 ring-blue-400' : ''}`}
            style={{ backgroundColor }}
        >
            {/* Grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
                    backgroundSize: '20px 20px',
                    opacity: 0.5,
                }}
            />

            {/* Empty state */}
            {blocks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎨</div>
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Empty Canvas</h3>
                        <p className="text-gray-500">Drag blocks from the toolbar to get started</p>
                    </div>
                </div>
            )}

            {/* Blocks */}
            {blocks.map((block) => (
                <DraggableBlock
                    key={block.id}
                    block={block}
                    onUpdate={onUpdateBlock}
                    onDelete={onDeleteBlock}
                    onSelect={onSelectBlock}
                    isSelected={selectedBlockId === block.id}
                />
            ))}
        </div>
    );
}
