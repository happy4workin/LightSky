import mongoose, { Schema, Model, Document, Types } from 'mongoose';

export interface ICanvasBlock {
    id: string;
    type: 'text' | 'image' | 'section' | 'rectangle';
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    styles: {
        // Common
        backgroundColor?: string;
        opacity?: number;
        borderRadius?: number;
        boxShadow?: string;
        borderWidth?: number;
        borderColor?: string;
        zIndex?: number;

        // Text specific
        fontSize?: number;
        fontWeight?: number;
        lineHeight?: number;
        letterSpacing?: number;
        color?: string;
        textAlign?: 'left' | 'center' | 'right';
        textTransform?: 'none' | 'uppercase' | 'lowercase';

        // Image specific
        objectFit?: 'cover' | 'contain';

        // Section specific
        direction?: 'vertical' | 'horizontal';
        gap?: number;
        padding?: number;
        alignItems?: 'start' | 'center' | 'end';
        justifyContent?: 'start' | 'center' | 'space-between';

        [key: string]: any;
    };
    content?: {
        // Text
        text?: string;

        // Image
        src?: string;
        alt?: string;

        [key: string]: any;
    };
    children?: ICanvasBlock[];
}

export interface ILayout extends Document {
    userId: Types.ObjectId;
    name: string;
    blocks: ICanvasBlock[];
    thumbnail?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CanvasBlockSchema = new Schema<ICanvasBlock>({
    id: { type: String, required: true },
    type: {
        type: String,
        enum: ['text', 'image', 'section', 'rectangle'],
        required: true,
    },
    position: {
        x: { type: Number, required: true, default: 0 },
        y: { type: Number, required: true, default: 0 },
    },
    size: {
        width: { type: Number, required: true, default: 100 },
        height: { type: Number, required: true, default: 100 },
    },
    styles: { type: Schema.Types.Mixed, default: {} },
    content: { type: Schema.Types.Mixed, default: {} },
});

// Recursive support for children
CanvasBlockSchema.add({
    children: [CanvasBlockSchema],
});

const LayoutSchema = new Schema<ILayout>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            default: 'Untitled Layout',
        },
        blocks: [CanvasBlockSchema],
        thumbnail: String,
    },
    {
        timestamps: true,
    }
);

const Layout: Model<ILayout> = mongoose.models.Layout || mongoose.model<ILayout>('Layout', LayoutSchema);

export default Layout;
