import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');

        if (!query) {
            return NextResponse.json({ users: [], total: 0 });
        }

        // Search by username or display name
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { displayName: { $regex: query, $options: 'i' } },
            ],
        })
            .select('-password')
            .limit(limit)
            .skip(offset)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { displayName: { $regex: query, $options: 'i' } },
            ],
        });

        return NextResponse.json({
            users: users.map((user) => ({
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
            })),
            total,
        });
    } catch (error: any) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
