import { IBlock } from '@/lib/models/Portfolio';

interface BlockRendererProps {
    block: IBlock;
    isEditable?: boolean;
}

export default function BlockRenderer({ block, isEditable = false }: BlockRendererProps) {
    const baseStyles = {
        position: 'absolute' as const,
        left: `${block.position.x}px`,
        top: `${block.position.y}px`,
        width: `${block.size.width}px`,
        height: `${block.size.height}px`,
        ...block.styles,
    };

    const renderContent = () => {
        switch (block.type) {
            case 'text':
                return (
                    <div
                        style={baseStyles}
                        className="p-4 overflow-auto"
                    >
                        {block.content?.text || 'Text block'}
                    </div>
                );

            case 'image':
                return (
                    <div
                        style={baseStyles}
                        className="overflow-hidden"
                    >
                        {block.content?.url ? (
                            <img
                                src={block.content.url}
                                alt={block.content.alt || 'Image'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                Image placeholder
                            </div>
                        )}
                    </div>
                );

            case 'section':
                return (
                    <div
                        style={baseStyles}
                        className="border border-gray-300 rounded-lg overflow-hidden"
                    >
                        {block.content?.title && (
                            <div className="p-4 font-semibold bg-gray-50 border-b border-gray-300">
                                {block.content.title}
                            </div>
                        )}
                        <div className="p-4">
                            {block.content?.description || 'Section content'}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return renderContent();
}
