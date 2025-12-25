import { CanvasBlock } from '@/lib/editor/blockFactory';

interface BlockProps {
    block: CanvasBlock;
    updateBlock: (id: string, updates: Partial<CanvasBlock>) => void;
    isEditing?: boolean;
}

export const TextBlock = ({ block, updateBlock, isEditing }: BlockProps) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                fontSize: block.styles.fontSize,
                fontWeight: block.styles.fontWeight,
                color: block.styles.color,
                textAlign: block.styles.textAlign,
                lineHeight: block.styles.lineHeight,
                letterSpacing: block.styles.letterSpacing,
                textTransform: block.styles.textTransform,
                ...block.styles,
            }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => {
                updateBlock(block.id, {
                    content: { ...block.content, text: e.currentTarget.innerHTML },
                });
            }}
            dangerouslySetInnerHTML={{ __html: block.content?.text || '' }}
            className="outline-none min-h-[1em]"
        />
    );
};

export const ImageBlock = ({ block }: BlockProps) => {
    return (
        <img
            src={block.content?.src}
            alt={block.content?.alt}
            style={{
                width: '100%',
                height: '100%',
                objectFit: block.styles.objectFit,
                borderRadius: block.styles.borderRadius,
                opacity: block.styles.opacity,
                boxShadow: block.styles.boxShadow,
            }}
            className="pointer-events-none select-none" // Prevent native drag
        />
    );
};

export const RectangleBlock = ({ block }: BlockProps) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: block.styles.backgroundColor,
                borderRadius: block.styles.borderRadius,
                borderWidth: block.styles.borderWidth,
                borderColor: block.styles.borderColor,
                opacity: block.styles.opacity,
                boxShadow: block.styles.boxShadow,
            }}
        />
    );
};

export const SectionBlock = ({ block, children }: BlockProps & { children: React.ReactNode }) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: block.styles.backgroundColor,
                borderRadius: block.styles.borderRadius,
                display: 'flex',
                flexDirection: block.styles.direction === 'horizontal' ? 'row' : 'column',
                gap: block.styles.gap,
                padding: block.styles.padding,
                alignItems: block.styles.alignItems,
                justifyContent: block.styles.justifyContent,
                border: '1px dashed #ccc', // Visual indicator for section
            }}
        >
            {children}
        </div>
    );
};
