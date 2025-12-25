import { IBlock } from '@/lib/models/Portfolio';

export function createDefaultBlock(
    type: 'text' | 'image' | 'section',
    position: { x: number; y: number }
): IBlock {
    const id = `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const baseBlock = {
        id,
        type,
        position,
        size: { width: 300, height: 200 },
        styles: {},
    };

    switch (type) {
        case 'text':
            return {
                ...baseBlock,
                content: {
                    text: 'Double-click to edit text',
                },
                styles: {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontSize: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                },
            };

        case 'image':
            return {
                ...baseBlock,
                size: { width: 400, height: 300 },
                content: {
                    url: '',
                    alt: 'Image',
                },
                styles: {
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                },
            };

        case 'section':
            return {
                ...baseBlock,
                size: { width: 500, height: 300 },
                content: {
                    title: 'Section Title',
                    description: 'Section description',
                },
                styles: {
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                },
            };

        default:
            return baseBlock as IBlock;
    }
}

export function calculateDropPosition(
    dropX: number,
    dropY: number,
    canvasScrollTop: number,
    canvasScrollLeft: number
): { x: number; y: number } {
    return {
        x: Math.max(0, dropX + canvasScrollLeft),
        y: Math.max(0, dropY + canvasScrollTop),
    };
}
