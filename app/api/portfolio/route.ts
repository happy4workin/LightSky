import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Portfolio from '@/lib/models/Portfolio';
import Layout from '@/lib/models/Layout';
import { getAuthUser } from '@/lib/auth/middleware';

// GET current user's portfolio (layout)
export async function GET(request: NextRequest) {
    try {
        const authUser = await getAuthUser(request);

        if (!authUser) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        // Fetch the latest layout for the user
        const layout = await Layout.findOne({ userId: authUser.userId }).sort({ updatedAt: -1 });

        return NextResponse.json({
            portfolio: {
                blocks: layout?.blocks || [],
                metadata: { backgroundColor: '#ffffff' } // Mock metadata for now
            }
        });
    } catch (error: any) {
        console.error('Get portfolio error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT update portfolio
export async function PUT(request: NextRequest) {
    try {
        const authUser = await getAuthUser(request);

        if (!authUser) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();
        const { blocks, metadata, isPublic } = body;

        const portfolio = await Portfolio.findOneAndUpdate(
            { userId: authUser.userId },
            {
                blocks,
                metadata,
                isPublic,
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            message: 'Portfolio updated successfully',
            portfolio,
        });
    } catch (error: any) {
        console.error('Update portfolio error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
