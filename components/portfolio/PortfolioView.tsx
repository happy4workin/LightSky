'use client';

import { IBlock } from '@/lib/models/Portfolio';
import BlockRenderer from './BlockRenderer';

interface PortfolioViewProps {
    blocks: IBlock[];
    backgroundColor?: string;
    showEditButton?: boolean;
    onEditClick?: () => void;
}

export default function PortfolioView({
    blocks,
    backgroundColor = '#ffffff',
    showEditButton = false,
    onEditClick,
}: PortfolioViewProps) {
    return (
        <div className="relative" style={{ backgroundColor }}>
            {showEditButton && (
                <div className="absolute top-4 right-4 z-50">
                    <button
                        onClick={onEditClick}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Edit Portfolio
                    </button>
                </div>
            )}

            <div className="relative min-h-screen">
                {blocks.length === 0 ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📄</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Empty Portfolio</h3>
                            <p className="text-gray-500">
                                {showEditButton ? 'Click "Edit Portfolio" to get started' : 'This portfolio is empty'}
                            </p>
                        </div>
                    </div>
                ) : (
                    blocks.map((block) => (
                        <BlockRenderer key={block.id} block={block} />
                    ))
                )}
            </div>
        </div>
    );
}
