'use client';

import { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { IBlock } from '@/lib/models/Portfolio';

interface DraggableBlockProps {
    block: IBlock;
    onUpdate: (block: IBlock) => void;
    onDelete: (id: string) => void;
    onSelect: (id: string) => void;
    isSelected: boolean;
}

export default function DraggableBlock({
    block,
    onUpdate,
    onDelete,
    onSelect,
    isSelected,
}: DraggableBlockProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(block.content?.text || '');

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'EXISTING_BLOCK',
        item: { id: block.id, currentPosition: block.position },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [block.id, block.position]);

    const handleDoubleClick = () => {
        if (block.type === 'text') {
            setIsEditing(true);
            setEditValue(block.content?.text || '');
        }
    };

    const handleBlur = () => {
        if (isEditing) {
            onUpdate({
                ...block,
                content: { ...block.content, text: editValue },
            });
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleBlur();
        }
    };

    const baseStyles: React.CSSProperties = {
        position: 'absolute',
        left: `${block.position.x}px`,
        top: `${block.position.y}px`,
        width: `${block.size.width}px`,
        height: `${block.size.height}px`,
        ...block.styles,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    const renderBlockContent = () => {
        switch (block.type) {
            case 'text':
                if (isEditing) {
                    return (
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className="w-full h-full p-4 bg-transparent resize-none focus:outline-none"
                            style={{ color: block.styles?.color || '#000000', fontSize: block.styles?.fontSize }}
                            autoFocus
                        />
                    );
                }
                return (
                    <div className="p-4 h-full overflow-auto" style={{ whiteSpace: 'pre-wrap' }}>
                        {block.content?.text || 'Double-click to edit'}
                    </div>
                );

            case 'image':
                return (
                    <div className="w-full h-full overflow-hidden">
                        {block.content?.url ? (
                            <img
                                src={block.content.url}
                                alt={block.content.alt || 'Image'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                Click to add image
                            </div>
                        )}
                    </div>
                );

            case 'section':
                return (
                    <div className="h-full overflow-hidden">
                        <div className="p-4 font-semibold bg-gray-50 border-b" style={{ borderColor: block.styles?.border }}>
                            {block.content?.title || 'Section Title'}
                        </div>
                        <div className="p-4">
                            {block.content?.description || 'Section content'}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div
            ref={drag as any}
            style={baseStyles}
            className={`group ${isSelected ? 'ring-4 ring-blue-500' : ''}`}
            onClick={() => onSelect(block.id)}
            onDoubleClick={handleDoubleClick}
        >
            {renderBlockContent()}

            {/* Delete button */}
            {isSelected && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(block.id);
                    }}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-150 z-10"
                >
                    ×
                </button>
            )}

            {/* Resize handle (visual only for now) */}
            {isSelected && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize" />
            )}
        </div>
    );
}
