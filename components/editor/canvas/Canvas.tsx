'use client';

import React from 'react';
import { CanvasBlock } from '@/lib/editor/blockFactory';
import BlockWrapper from './BlockWrapper';
import { TextBlock, ImageBlock, RectangleBlock, SectionBlock } from '../blocks/CoreBlocks';

interface CanvasProps {
    blocks: CanvasBlock[];
    selectedBlockId: string | null;
    onSelectBlock: (id: string | null) => void;
    onUpdateBlock: (id: string, updates: Partial<CanvasBlock>) => void;
    onMoveBlock: (id: string, newPos: { x: number; y: number }) => void;
    readOnly?: boolean;
    scale?: number;
}

export default function Canvas({
    blocks,
    selectedBlockId,
    onSelectBlock,
    onUpdateBlock,
    onMoveBlock,
    readOnly = false,
    scale = 1,
}: CanvasProps) {

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (!readOnly && e.target === e.currentTarget) {
            onSelectBlock(null);
        }
    };

    const renderBlock = (block: CanvasBlock) => {
        const isSelected = selectedBlockId === block.id;

        // TODO: Recursive rendering for sections will be handled here
        // For now, simpler flat rendering to test primitives

        let content;
        switch (block.type) {
            case 'text':
                content = <TextBlock block={block} updateBlock={onUpdateBlock} isEditing={!readOnly && isSelected} />;
                break;
            case 'image':
                content = <ImageBlock block={block} updateBlock={onUpdateBlock} />;
                break;
            case 'rectangle':
                content = <RectangleBlock block={block} updateBlock={onUpdateBlock} />;
                break;
            case 'section':
                content = (
                    <SectionBlock block={block} updateBlock={onUpdateBlock}>
                        {/* Recursion would happen here */}
                        {block.children?.map(renderBlock)}
                    </SectionBlock>
                );
                break;
            default:
                return null;
        }

        return (
            <BlockWrapper
                key={block.id}
                block={block}
                isSelected={isSelected}
                onSelect={(e) => {
                    if (!readOnly) {
                        e.stopPropagation();
                        onSelectBlock(block.id);
                    }
                }}
                updateBlock={onUpdateBlock}
                readOnly={readOnly}
                scale={scale}
            >
                {content}
            </BlockWrapper>
        );
    };

    return (
        <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            onClick={handleCanvasClick}
            style={{
                backgroundColor: 'transparent',
                backgroundImage: readOnly ? undefined : 'radial-gradient(#ddd 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }}
        >
            {blocks.map(renderBlock)}
        </div>
    );
}
