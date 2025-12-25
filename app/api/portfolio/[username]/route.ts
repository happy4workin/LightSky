import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Portfolio from '@/lib/models/Portfolio';
import Layout from '@/lib/models/Layout';
import User from '@/lib/models/User';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    try {
        await connectDB();

        const { username } = await params;

        // Find user by username
        const user = await User.findOne({ username: username.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Find portfolio (layout)
        const layout = await Layout.findOne({ userId: user._id }).sort({ updatedAt: -1 });

        if (!layout) {
            return NextResponse.json(
                { error: 'Portfolio not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            portfolio: {
                blocks: layout.blocks || [],
                metadata: { backgroundColor: '#ffffff' }
            },
            user: {
                username: user.username,
                displayName: user.displayName,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
            },
        });
    } catch (error: any) {
        console.error('Get public portfolio error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
