import { CanvasBlock } from '@/lib/editor/blockFactory';

export interface GeneratedPortfolio {
    id: string;
    name: string;
    description: string;
    blocks: CanvasBlock[];
    metadata: {
        theme: string;
        backgroundColor: string;
    };
}

const portfolioTemplates: { [key: string]: GeneratedPortfolio[] } = {
    minimal: [
        {
            id: 'minimal-dark-1',
            name: 'Minimal Dark',
            description: 'Clean, dark theme with subtle accents',
            blocks: [
                {
                    id: 'header-1',
                    type: 'text',
                    position: { x: 100, y: 100 },
                    size: { width: 600, height: 150 },
                    content: { text: 'John Doe\nCreative Designer' },
                    styles: {
                        backgroundColor: '#1f2937',
                        color: '#ffffff',
                        fontSize: 48,
                        fontWeight: 700,
                        padding: 32,
                        borderRadius: 16,
                    },
                },
                {
                    id: 'about-1',
                    type: 'text',
                    position: { x: 100, y: 300 },
                    size: { width: 600, height: 200 },
                    content: { text: 'Passionate about creating beautiful and functional designs that make a difference.' },
                    styles: {
                        backgroundColor: '#374151',
                        color: '#e5e7eb',
                        fontSize: 20,
                        padding: 24,
                        borderRadius: 12,
                    },
                },
            ],
            metadata: {
                theme: 'dark',
                backgroundColor: '#111827',
            },
        },
        {
            id: 'minimal-light-1',
            name: 'Minimal Light',
            description: 'Bright and clean with modern typography',
            blocks: [
                {
                    id: 'header-2',
                    type: 'text',
                    position: { x: 150, y: 150 },
                    size: { width: 500, height: 120 },
                    content: { text: 'Welcome to My Portfolio' },
                    styles: {
                        backgroundColor: '#ffffff',
                        color: '#111827',
                        fontSize: 42,
                        fontWeight: 700,
                        padding: 24,
                        borderRadius: 8,
                        border: '2px solid #e5e7eb',
                    },
                },
            ],
            metadata: {
                theme: 'light',
                backgroundColor: '#f9fafb',
            },
        },
    ],
    creative: [
        {
            id: 'creative-colorful-1',
            name: 'Creative Colorful',
            description: 'Vibrant colors and playful layout',
            blocks: [
                {
                    id: 'header-3',
                    type: 'text',
                    position: { x: 80, y: 80 },
                    size: { width: 400, height: 100 },
                    content: { text: "Hi! I'm a Designer ✨" },
                    styles: {
                        backgroundColor: '#8b5cf6',
                        color: '#ffffff',
                        fontSize: 32,
                        fontWeight: 700,
                        padding: 20,
                        borderRadius: 20,
                    },
                },
                {
                    id: 'section-1',
                    type: 'section',
                    position: { x: 550, y: 80 },
                    size: { width: 350, height: 250 },
                    content: {
                        title: 'My Work',
                        description: 'Check out my latest projects and creative endeavors.',
                    },
                    styles: {
                        backgroundColor: '#fbbf24',
                        borderRadius: 20,
                    },
                },
                {
                    id: 'image-1',
                    type: 'image',
                    position: { x: 80, y: 250 },
                    size: { width: 400, height: 300 },
                    content: {
                        src: 'https://placehold.co/600x400/png',
                        alt: 'Portfolio showcase',
                    },
                    styles: {
                        borderRadius: 20,
                        border: '4px solid #ec4899',
                    },
                },
            ],
            metadata: {
                theme: 'colorful',
                backgroundColor: '#fef3c7',
            },
        },
    ],
};

export function generatePortfolios(prompt: string): GeneratedPortfolio[] {
    const lowerPrompt = prompt.toLowerCase();
    let results: GeneratedPortfolio[] = [];

    if (lowerPrompt.includes('minimal') || lowerPrompt.includes('simple') || lowerPrompt.includes('clean')) {
        results = [...results, ...portfolioTemplates.minimal];
    }

    if (lowerPrompt.includes('creative') || lowerPrompt.includes('colorful') || lowerPrompt.includes('vibrant')) {
        results = [...results, ...portfolioTemplates.creative];
    }

    if (results.length === 0 || lowerPrompt.includes('portfolio') || lowerPrompt.includes('design')) {
        results = [
            ...portfolioTemplates.minimal,
            ...portfolioTemplates.creative,
        ];
    }

    return results.slice(0, 5);
}

export function modifyLayout(currentBlocks: CanvasBlock[], prompt: string): CanvasBlock[] {
    const lowerPrompt = prompt.toLowerCase();
    let newBlocks = [...currentBlocks];

    if (lowerPrompt.includes('clear') || lowerPrompt.includes('reset')) {
        return [];
    }

    if (lowerPrompt.includes('add title') || lowerPrompt.includes('add header')) {
        newBlocks.push({
            id: `text-${Date.now()}`,
            type: 'text',
            position: { x: 100, y: 100 },
            size: { width: 600, height: 100 },
            content: { text: 'New Headline' },
            styles: {
                backgroundColor: 'transparent',
                color: '#000000',
                fontSize: 48,
                fontWeight: 700,
                textAlign: 'center',
            },
        });
    }

    return newBlocks;
}

