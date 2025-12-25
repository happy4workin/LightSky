# AI Text Rewriting Feature - LightSky

This feature enables AI-powered text rewriting for TextBlocks in the LightSky personal branding website builder using Google's Gemini API.

## Overview

The AI Text Rewriting feature allows users to:
- Select any TextBlock in the canvas editor
- Provide natural language instructions (e.g., "make it more professional", "add enthusiasm")
- Generate rewritten versions of their text content
- Preview and apply AI-generated content

## Architecture

### Backend Components

#### 1. **Gemini Service** (`lib/ai/geminiService.ts`)
Core service that communicates with Google's Gemini API.

```typescript
import { rewriteTextWithGemini } from '@/lib/ai/geminiService';

const result = await rewriteTextWithGemini({
    text: 'Original text here',
    instruction: 'Make it more professional'
});
```

**Key Features:**
- Structured prompt engineering for personal branding content
- Error handling and API key validation
- Returns only the rewritten text (no explanations or markdown)

#### 2. **API Route** (`app/api/ai/rewrite-text/route.ts`)
RESTful endpoint for text rewriting.

**Endpoint:** `POST /api/ai/rewrite-text`

**Request Body:**
```json
{
    "text": "Your original text",
    "instruction": "How to modify it"
}
```

**Response:**
```json
{
    "success": true,
    "rewrittenText": "The AI-generated text"
}
```

**Authentication:** Requires valid user session (checked via `getAuthUser` middleware)

### Frontend Components

#### 3. **React Hook** (`lib/ai/useTextRewrite.ts`)
Custom hook for client-side text rewriting.

```typescript
import { useTextRewrite } from '@/lib/ai/useTextRewrite';

function MyComponent() {
    const { rewriteText, isLoading, error } = useTextRewrite({
        onSuccess: (text) => console.log('Success:', text),
        onError: (err) => console.error('Error:', err)
    });

    const handleRewrite = async () => {
        const result = await rewriteText(
            'Original text',
            'Make it shorter'
        );
    };
}
```

#### 4. **UI Component** (`components/ai/TextRewritePanel.tsx`)
Complete, ready-to-use UI panel for text rewriting.

**Props:**
- `currentText`: The original text to rewrite
- `onApply`: Callback when user applies rewritten text
- `onCancel`: Optional callback when user cancels

**Features:**
- Shows original text
- Instruction input with quick suggestions
- Live preview of rewritten text
- Loading states and error handling
- Quick suggestion buttons

## Setup

### 1. Environment Configuration

Add your Google Gemini API key to your environment variables:

**`.env.local`:**
```
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** Never commit the `.env.local` file to version control.

### 2. Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env.local` file

### 3. Install Dependencies

The feature uses only built-in Next.js functionality and doesn't require additional dependencies.

## Usage Examples

### Example 1: Basic Integration in BlockEditor

```typescript
'use client';

import { useState } from 'react';
import TextRewritePanel from '@/components/ai/TextRewritePanel';

function MyTextBlockEditor({ block, onUpdate }) {
    const [showAIPanel, setShowAIPanel] = useState(false);

    const handleApplyRewrite = (rewrittenText: string) => {
        // Update the block with new text
        onUpdate(block.id, {
            content: { text: rewrittenText }
        });
        setShowAIPanel(false);
    };

    return (
        <div>
            {/* Your existing editor UI */}
            <textarea value={block.content.text} />
            
            <button onClick={() => setShowAIPanel(true)}>
                ✨ Rewrite with AI
            </button>

            {/* AI Rewrite Panel */}
            {showAIPanel && (
                <TextRewritePanel
                    currentText={block.content.text}
                    onApply={handleApplyRewrite}
                    onCancel={() => setShowAIPanel(false)}
                />
            )}
        </div>
    );
}
```

### Example 2: Using the Hook Directly

```typescript
import { useTextRewrite } from '@/lib/ai/useTextRewrite';

function CustomRewriteButton({ text }) {
    const { rewriteText, isLoading, error } = useTextRewrite();

    const makeProfessional = async () => {
        const result = await rewriteText(
            text,
            'Make this text more professional and polished'
        );
        
        if (result) {
            console.log('Rewritten:', result);
        }
    };

    return (
        <button onClick={makeProfessional} disabled={isLoading}>
            {isLoading ? 'Rewriting...' : 'Make Professional'}
        </button>
    );
}
```

### Example 3: Batch Rewriting

```typescript
async function rewriteMultipleBlocks(blocks: CanvasBlock[]) {
    const { rewriteText } = useTextRewrite();
    
    const results = await Promise.all(
        blocks.map(block => 
            rewriteText(
                block.content.text,
                'Make it concise and impactful'
            )
        )
    );
    
    return results;
}
```

## API Reference

### `rewriteTextWithGemini(options)`

Server-side function to rewrite text using Gemini API.

**Parameters:**
- `options.text` (string): Original text to rewrite
- `options.instruction` (string): How to modify the text

**Returns:** `Promise<{ rewrittenText: string }>`

**Throws:** Error if API key is missing or API call fails

---

### `useTextRewrite(options?)`

Client-side React hook for text rewriting.

**Parameters:**
- `options.onSuccess` (optional): Callback with rewritten text
- `options.onError` (optional): Callback with error message

**Returns:**
```typescript
{
    rewriteText: (text: string, instruction: string) => Promise<string | null>,
    isLoading: boolean,
    error: string | null
}
```

---

### `TextRewritePanel` Component

**Props:**
```typescript
{
    currentText: string;           // Original text
    onApply: (text: string) => void;  // Apply callback
    onCancel?: () => void;         // Cancel callback (optional)
}
```

## Prompt Engineering

The system uses a carefully crafted prompt that:

1. **Sets Context:** Identifies as an AI writing assistant for personal branding
2. **Defines Rules:** 
   - Only rewrites provided content
   - Doesn't add unrelated information
   - Maintains original intent unless explicitly changed
   - Ensures output is suitable for personal branding
   - Returns only the revised text (no markdown, explanations, or comments)
3. **Provides Structure:** Shows the original text and user instruction clearly

This ensures consistent, high-quality rewrites appropriate for personal branding websites.

## Error Handling

The system handles various error scenarios:

1. **Missing API Key:**
   ```
   "AI service not configured. Please contact support."
   ```

2. **Empty Input:**
   ```
   "Text cannot be empty"
   "Instruction cannot be empty"
   ```

3. **API Errors:**
   ```
   "Gemini API error: [status code] - [error message]"
   ```

4. **Network Issues:**
   ```
   "Failed to rewrite text: [error details]"
   ```

## Best Practices

### For Users
- Be specific with instructions (e.g., "make it sound more confident" vs just "improve")
- Review AI output before applying
- Use quick suggestions as starting points

### For Developers
- Always validate API key existence before deployment
- Implement rate limiting if needed
- Cache common rewrites to reduce API calls
- Monitor API usage and costs
- Add user feedback mechanism

## Security Considerations

1. **API Key Protection:**
   - Store in environment variables only
   - Never expose in client-side code
   - Use `.env.local` for local development
   - Use secure environment variables in production

2. **Authentication:**
   - All API endpoints require authentication
   - User session validated before processing

3. **Input Validation:**
   - Text and instruction validated on both client and server
   - Prevents empty or malicious inputs

## Troubleshooting

### "GEMINI_API_KEY is not configured"
- Verify `.env.local` file exists
- Check that `GEMINI_API_KEY=your_key` is set
- Restart the development server

### "Unauthorized" Error
- User must be logged in
- Check authentication middleware is working

### Slow Response Times
- Gemini API typically responds in 1-3 seconds
- Consider adding timeout handling
- Show loading state to user

### Rate Limiting
- Free tier: 60 requests per minute
- Consider implementing request queuing or caching

## Future Enhancements

Potential improvements for this feature:

1. **Multiple Variations:** Generate 2-3 rewrite options
2. **Tone Selector:** Predefined tone options (professional, casual, enthusiastic)
3. **History:** Save rewrite history for undo/redo
4. **Batch Operations:** Rewrite multiple blocks at once
5. **Custom Templates:** User-defined rewrite templates
6. **A/B Testing:** Compare original vs rewritten versions
7. **Analytics:** Track which instructions work best

## API Costs

Google Gemini API Pricing (as of 2024):
- **Free Tier:** 60 requests/minute
- **Pro Tier:** Pay as you go

Monitor usage via [Google AI Studio](https://makersuite.google.com/).

## Support

For issues or questions:
1. Check this documentation
2. Review error messages in browser console
3. Check server logs for API errors
4. Verify API key is valid and active

---

**Built with ❤️ for LightSky Personal Branding Platform**
