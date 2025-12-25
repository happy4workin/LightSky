import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Layout from '@/lib/models/Layout';
import { getAuthUser } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
    try {
        const authUser = await getAuthUser(request);
        if (!authUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const layout = await Layout.findOne({ userId: authUser.userId });

        return NextResponse.json({ layout });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const authUser = await getAuthUser(request);
        if (!authUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        await connectDB();

        const layout = await Layout.findOneAndUpdate(
            { userId: authUser.userId },
            {
                userId: authUser.userId,
                blocks: body.blocks,
                name: body.name || 'Untitled'
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ layout });
    } catch (error: any) {
        console.error("Save layout error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
