import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export async function POST(request: NextRequest) {
    try {
        // Authenticate user
        const authUser = await getAuthUser(request);
        if (!authUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse request body
        const body = await request.json();
        const { message, selectedBlockType, selectedBlockContent, conversationHistory } = body;

        // Validate inputs
        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'AI service not configured' },
                { status: 503 }
            );
        }

        // Build context-aware prompt
        let systemPrompt = `You are an AI assistant embedded in the LightSky personal branding website builder.

Your role:
- Act as a helpful, professional assistant for users who are building and editing their personal branding website.
- Answer questions related to website content, structure, layout, branding, and usage of the LightSky editor.
- Support both free-form questions and editing-related requests.

Context information:
- Current page: Website editor (canvas-based)`;

        if (selectedBlockType) {
            systemPrompt += `\n- Selected block type: ${selectedBlockType}`;
        }

        if (selectedBlockContent) {
            systemPrompt += `\n- Selected block content:\n"""\n${selectedBlockContent}\n"""`;
        }

        systemPrompt += `

Behavior rules:
1. If a block is selected and the user's request is related to editing or rewriting content:
   - Provide specific suggestions for improving the selected block content.
   - Keep responses concise and actionable.
2. If no block is selected:
   - Provide guidance, suggestions, or explanations related to:
     - Personal branding websites
     - Website structure and sections
     - Content writing for personal branding
     - How to use LightSky features
3. Do NOT perform actions outside the scope of a website builder assistant.
4. Keep responses clear, concise, and suitable for non-technical users.
5. Use a professional and supportive tone.
6. Format your response in plain text, no markdown.

User message:
"""
${message}
"""

Respond appropriately based on the current context and the user's message.`;

        // Call Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: systemPrompt,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 500,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText
                }`
            );
        }

        const data = await response.json();

        // Extract the generated text from Gemini response
        const assistantMessage =
            data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            'Sorry, I could not generate a response. Please try again.';

        return NextResponse.json({
            success: true,
            message: assistantMessage,
        });
    } catch (error: any) {
        console.error('Chat AI error:', error);

        return NextResponse.json(
            { error: error.message || 'Failed to process chat message' },
            { status: 500 }
        );
    }
}
