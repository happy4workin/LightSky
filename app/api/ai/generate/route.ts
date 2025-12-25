import { NextRequest, NextResponse } from 'next/server';
import { generatePortfolios } from '@/lib/ai/mockGenerator';
import { getAuthUser } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
    try {
        const authUser = await getAuthUser(request);

        if (!authUser) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { prompt } = body;

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // Simulate AI processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const generatedPortfolios = generatePortfolios(prompt);

        return NextResponse.json({
            portfolios: generatedPortfolios,
            count: generatedPortfolios.length,
        });
    } catch (error: any) {
        console.error('AI generation error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
