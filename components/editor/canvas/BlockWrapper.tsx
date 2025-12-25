'use client';

import React, { useRef, useState, useEffect } from 'react';
import { CanvasBlock } from '@/lib/editor/blockFactory';

interface BlockWrapperProps {
    block: CanvasBlock;
    isSelected: boolean;
    onSelect: (e: React.MouseEvent) => void;
    updateBlock: (id: string, updates: Partial<CanvasBlock>) => void;
    children: React.ReactNode;
    readOnly?: boolean;
    scale?: number;
}

export default function BlockWrapper({
    block,
    isSelected,
    onSelect,
    updateBlock,
    children,
    readOnly = false,
    scale = 1,
}: BlockWrapperProps) {
    const [isResizing, setIsResizing] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const handleResize = (e: React.MouseEvent, corner: string) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = block.size.width;
        const startHeight = block.size.height;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = (moveEvent.clientX - startX) / scale;
            const deltaY = (moveEvent.clientY - startY) / scale;

            updateBlock(block.id, {
                size: {
                    width: Math.max(20, startWidth + deltaX),
                    height: Math.max(20, startHeight + deltaY),
                },
            });
        };

        const onMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleDrag = (e: React.MouseEvent) => {
        if (e.defaultPrevented) return; // Prevent drag if resize was clicked

        // Select on mousedown immediately
        onSelect(e);

        const startX = e.clientX;
        const startY = e.clientY;
        const initialLeft = block.position.x;
        const initialTop = block.position.y;
        let hasMoved = false;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = (moveEvent.clientX - startX) / scale;
            const deltaY = (moveEvent.clientY - startY) / scale;

            if (!hasMoved && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
                hasMoved = true;
            }

            if (hasMoved) {
                updateBlock(block.id, {
                    position: {
                        x: initialLeft + deltaX,
                        y: initialTop + deltaY,
                    },
                });
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            ref={elementRef}
            onMouseDown={handleDrag}
            onClick={(e) => e.stopPropagation()}
            className={`absolute group touch-none select-none ${isSelected ? 'ring-2 ring-blue-500 z-50' : 'hover:ring-1 hover:ring-blue-300 z-10'
                }`}
            style={{
                left: block.position.x,
                top: block.position.y,
                width: block.size.width,
                height: block.size.height,
                opacity: block.styles.opacity ?? 1,
                transform: `rotate(${block.styles.rotation || 0}deg)`,
                transformOrigin: 'center center',
            }}
        >
            {/* Selection indicators and handlers */}
            {isSelected && (
                <>
                    {/* Resize handle (bottom-right) */}
                    <div
                        className="absolute -right-1 -bottom-1 w-3 h-3 bg-white border border-blue-500 cursor-se-resize z-50"
                        onMouseDown={(e) => handleResize(e as any, 'se')}
                    />

                    {/* Rotation handle */}
                    <div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-50"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            const blockRect = elementRef.current?.getBoundingClientRect();
                            if (!blockRect) return;

                            const centerX = blockRect.left + blockRect.width / 2;
                            const centerY = blockRect.top + blockRect.height / 2;

                            const getAngle = (clientX: number, clientY: number) => {
                                const dx = clientX - centerX;
                                const dy = clientY - centerY;
                                return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                            };

                            const startAngle = getAngle(e.clientX, e.clientY);
                            const startRotation = block.styles.rotation || 0;

                            const onMouseMove = (moveEvent: MouseEvent) => {
                                const currentAngle = getAngle(moveEvent.clientX, moveEvent.clientY);
                                let newRotation = startRotation + (currentAngle - startAngle);
                                newRotation = ((newRotation % 360) + 360) % 360;

                                updateBlock(block.id, {
                                    styles: { ...block.styles, rotation: Math.round(newRotation) }
                                });
                            };

                            const onMouseUp = () => {
                                document.removeEventListener('mousemove', onMouseMove);
                                document.removeEventListener('mouseup', onMouseUp);
                            };

                            document.addEventListener('mousemove', onMouseMove);
                            document.addEventListener('mouseup', onMouseUp);
                        }}
                    >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    </div>

                    {/* Dimensions label */}
                    <div className="absolute -bottom-6 left-0 bg-blue-500 text-white text-[10px] px-1 rounded">
                        {Math.round(block.size.width)} x {Math.round(block.size.height)}
                        {block.styles.rotation ? ` • ${Math.round(block.styles.rotation)}°` : ''}
                    </div>
                </>
            )}

            {/* Render the actual block content */}
            <div className="w-full h-full overflow-hidden">
                {children}
            </div>
        </div>
    );
}
