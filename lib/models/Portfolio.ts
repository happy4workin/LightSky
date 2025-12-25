import mongoose, { Schema, Model, Document, Types } from 'mongoose';

export interface IBlock {
    id: string;
    type: 'text' | 'image' | 'section';
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    content: any;
    styles?: {
        backgroundColor?: string;
        color?: string;
        fontSize?: string;
        fontWeight?: string;
        padding?: string;
        borderRadius?: string;
        [key: string]: any;
    };
}

export interface IPortfolio extends Document {
    userId: Types.ObjectId;
    blocks: IBlock[];
    metadata: {
        theme?: string;
        backgroundColor?: string;
    };
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BlockSchema = new Schema<IBlock>({
    id: { type: String, required: true },
    type: {
        type: String,
        enum: ['text', 'image', 'section'],
        required: true,
    },
    position: {
        x: { type: Number, required: true, default: 0 },
        y: { type: Number, required: true, default: 0 },
    },
    size: {
        width: { type: Number, required: true, default: 200 },
        height: { type: Number, required: true, default: 100 },
    },
    content: { type: Schema.Types.Mixed, required: true },
    styles: { type: Schema.Types.Mixed },
}, { _id: false });

const PortfolioSchema = new Schema<IPortfolio>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        blocks: {
            type: [BlockSchema],
            default: [],
        },
        metadata: {
            theme: { type: String, default: 'light' },
            backgroundColor: { type: String, default: '#ffffff' },
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Portfolio: Model<IPortfolio> = mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;
