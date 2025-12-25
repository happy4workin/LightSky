export type BlockType = 'text' | 'image' | 'section' | 'rectangle';

export interface CanvasBlock {
    id: string;
    type: BlockType;
    position: { x: number; y: number };
    size: { width: number; height: number };
    styles: Record<string, any>;
    content?: any;
    children?: CanvasBlock[];
}

export const createBlock = (type: BlockType, position: { x: number; y: number }): CanvasBlock => {
    const id = crypto.randomUUID();

    const baseBlock = {
        id,
        type,
        position,
    };

    switch (type) {
        case 'text':
            return {
                ...baseBlock,
                size: { width: 200, height: 50 },
                styles: {
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#000000',
                    textAlign: 'left',
                    lineHeight: 1.5,
                },
                content: { text: 'Double click to edit' },
            };

        case 'image':
            return {
                ...baseBlock,
                size: { width: 200, height: 200 },
                styles: {
                    objectFit: 'cover',
                    borderRadius: 0,
                },
                content: {
                    src: 'https://placehold.co/400x400',
                    alt: 'Placeholder image',
                },
            };

        case 'section':
            return {
                ...baseBlock,
                size: { width: 400, height: 300 },
                styles: {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 8,
                    direction: 'vertical',
                    gap: 16,
                    padding: 16,
                    alignItems: 'start',
                    justifyContent: 'start',
                },
                children: [],
            };

        case 'rectangle':
            return {
                ...baseBlock,
                size: { width: 100, height: 100 },
                styles: {
                    backgroundColor: '#3b82f6',
                    borderRadius: 8,
                    opacity: 1,
                },
            };

        default:
            throw new Error(`Unknown block type: ${type}`);
    }
};
