import { NextRequest, NextResponse } from 'next/server';
import { rewriteTextWithGemini } from '@/lib/ai/geminiService';
import { getAuthUser } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
    try {
        // Authenticate user
        const authUser = await getAuthUser(request);
        if (!authUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse request body
        const body = await request.json();
        const { text, instruction } = body;

        // Validate inputs
        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text content is required' },
                { status: 400 }
            );
        }

        if (!instruction || typeof instruction !== 'string') {
            return NextResponse.json(
                { error: 'Instruction is required' },
                { status: 400 }
            );
        }

        // Call Gemini service to rewrite text
        const result = await rewriteTextWithGemini({
            text,
            instruction,
        });

        return NextResponse.json({
            success: true,
            rewrittenText: result.rewrittenText,
        });
    } catch (error: any) {
        console.error('Text rewrite error:', error);

        // Handle specific error cases
        if (error.message.includes('GEMINI_API_KEY')) {
            return NextResponse.json(
                { error: 'AI service not configured. Please contact support.' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to rewrite text' },
            { status: 500 }
        );
    }
}
