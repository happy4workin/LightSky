import { CanvasBlock } from '@/lib/editor/blockFactory';
import Canvas from '../editor/canvas/Canvas';

interface PortfolioPreviewProps {
    name: string;
    description: string;
    blocks: CanvasBlock[];
    backgroundColor: string;
}

export default function PortfolioPreview({
    name,
    description,
    blocks,
    backgroundColor,
}: PortfolioPreviewProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>

            <div className="flex-1 overflow-hidden relative bg-gray-100">
                <div
                    className="absolute inset-0 origin-top-left"
                    style={{
                        transform: 'scale(0.5)',
                        width: '200%',
                        height: '200%',
                    }}
                >
                    <Canvas
                        blocks={blocks}
                        readOnly={true}
                        onSelectBlock={() => { }}
                        onUpdateBlock={() => { }}
                        onMoveBlock={() => { }}
                        selectedBlockId={null}
                    />
                </div>
            </div>
        </div>
    );
}

