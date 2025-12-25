import { NextRequest, NextResponse } from 'next/server';
import { modifyLayout } from '@/lib/ai/mockGenerator';
import { getAuthUser } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
    try {
        const authUser = await getAuthUser(request);
        if (!authUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { prompt, currentBlocks } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Simulate AI delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newBlocks = modifyLayout(currentBlocks || [], prompt);

        return NextResponse.json({ blocks: newBlocks });
    } catch (error: any) {
        console.error('AI Edit error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
