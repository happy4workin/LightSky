/**
 * Gemini AI Service for text rewriting and content generation
 */

export interface RewriteTextOptions {
    text: string;
    instruction: string;
}

export interface RewriteTextResponse {
    rewrittenText: string;
}

/**
 * Rewrites text using Google Gemini API based on user instructions
 */
export async function rewriteTextWithGemini(
    options: RewriteTextOptions
): Promise<RewriteTextResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    const { text, instruction } = options;

    // Construct the prompt for Gemini
    const systemPrompt = `You are an AI writing assistant inside the LightSky personal branding website builder.

Context:
- The user is editing a personal branding website.
- The user has selected a TextBlock on the canvas.
- The content of the selected TextBlock is provided below.
- The user wants to modify, refine, or rewrite this content.

Rules:
1. ONLY edit or rewrite the provided TextBlock content.
2. Do NOT add new sections or unrelated information.
3. Keep the meaning aligned with the original intent unless the user explicitly requests a change.
4. The output must be suitable for a personal branding website.
5. Return ONLY the revised text content, no explanations, no markdown, no comments.

Selected TextBlock content:
"""
${text}
"""

User request:
"""
${instruction}
"""

Task:
Rewrite the selected TextBlock content according to the user's request.
Ensure the result is clear, professional, concise, and appropriate for personal branding.`;

    try {
        // Call Google Gemini API
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
                        maxOutputTokens: 1024,
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
        const rewrittenText =
            data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;

        return {
            rewrittenText,
        };
    } catch (error: any) {
        console.error('Gemini API error:', error);
        throw new Error(`Failed to rewrite text: ${error.message}`);
    }
}
