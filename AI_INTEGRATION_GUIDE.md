# Integration Guide: Adding AI Rewrite to BlockEditor

This guide shows how to integrate the AI Text Rewrite feature into the existing `BlockEditor.tsx` component.

## Quick Integration Steps

### Step 1: Import the Component

Add this import at the top of `components/editor/BlockEditor.tsx`:

```typescript
import TextRewritePanel from '@/components/ai/TextRewritePanel';
```

### Step 2: Add State for Panel Visibility

Add state to control when the AI panel is shown:

```typescript
const [showAIRewrite, setShowAIRewrite] = useState(false);
```

### Step 3: Add AI Rewrite Button

Add a button in the text editing section (around where other text controls are):

```tsx
{/* AI Rewrite Button */}
{block.type === 'text' && (
    <button
        onClick={() => setShowAIRewrite(!showAIRewrite)}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
    >
        <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
        </svg>
        AI Rewrite
    </button>
)}
```

### Step 4: Add the Panel Component

Add the TextRewritePanel conditionally below the button:

```tsx
{/* AI Rewrite Panel */}
{showAIRewrite && block.type === 'text' && (
    <div className="mt-4">
        <TextRewritePanel
            currentText={block.content?.text || ''}
            onApply={(rewrittenText) => {
                updateContent({ text: rewrittenText });
                setShowAIRewrite(false);
            }}
            onCancel={() => setShowAIRewrite(false)}
        />
    </div>
)}
```

## Complete Example Code

Here's a minimal example showing the integration:

```tsx
'use client';

import { useState } from 'react';
import { CanvasBlock } from '@/lib/editor/blockFactory';
import TextRewritePanel from '@/components/ai/TextRewritePanel';

interface BlockEditorProps {
    block: CanvasBlock | null;
    onUpdate: (id: string, updates: Partial<CanvasBlock>) => void;
}

export default function BlockEditor({ block, onUpdate }: BlockEditorProps) {
    const [showAIRewrite, setShowAIRewrite] = useState(false);

    if (!block) {
        return <div>Select a block to edit</div>;
    }

    const updateContent = (updates: any) => {
        onUpdate(block.id, {
            content: { ...block.content, ...updates },
        });
    };

    return (
        <div className="p-4">
            <h2>Edit Block</h2>

            {/* Text Content Editor */}
            {block.type === 'text' && (
                <div>
                    <label>Text Content</label>
                    <textarea
                        value={block.content?.text || ''}
                        onChange={(e) => updateContent({ text: e.target.value })}
                        className="w-full p-2 border rounded"
                    />

                    {/* AI Rewrite Button */}
                    <button
                        onClick={() => setShowAIRewrite(!showAIRewrite)}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                    >
                        ✨ AI Rewrite
                    </button>

                    {/* AI Rewrite Panel */}
                    {showAIRewrite && (
                        <div className="mt-4">
                            <TextRewritePanel
                                currentText={block.content?.text || ''}
                                onApply={(rewrittenText) => {
                                    updateContent({ text: rewrittenText });
                                    setShowAIRewrite(false);
                                }}
                                onCancel={() => setShowAIRewrite(false)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
```

## Alternative: Modal/Popup Version

If you prefer a modal/overlay approach instead of inline:

```tsx
{/* Modal Overlay */}
{showAIRewrite && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="max-w-2xl w-full mx-4">
            <TextRewritePanel
                currentText={block.content?.text || ''}
                onApply={(rewrittenText) => {
                    updateContent({ text: rewrittenText });
                    setShowAIRewrite(false);
                }}
                onCancel={() => setShowAIRewrite(false)}
            />
        </div>
    </div>
)}
```

## UI/UX Suggestions

### 1. Keyboard Shortcut
Add a keyboard shortcut for power users:

```typescript
useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
        // Ctrl/Cmd + Shift + A to open AI rewrite
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'a') {
            e.preventDefault();
            if (block?.type === 'text') {
                setShowAIRewrite(true);
            }
        }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
}, [block]);
```

### 2. Tooltip
Add a helpful tooltip:

```tsx
<button 
    title="Rewrite this text using AI (Ctrl+Shift+A)"
    onClick={() => setShowAIRewrite(true)}
>
    ✨ AI Rewrite
</button>
```

### 3. Context Menu
Add to right-click context menu:

```tsx
const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Show context menu with "AI Rewrite" option
};
```

### 4. Smart Placement
Show the button only when text is selected or being edited:

```tsx
{isEditingText && block.type === 'text' && (
    <button onClick={() => setShowAIRewrite(true)}>
        ✨ AI Rewrite
    </button>
)}
```

## Testing the Integration

1. **Local Testing:**
   ```bash
   npm run dev
   # Navigate to your editor page
   # Select a text block
   # Click "AI Rewrite" button
   ```

2. **Test with Mock Data:**
   ```typescript
   const testBlock: CanvasBlock = {
       id: 'test-1',
       type: 'text',
       position: { x: 0, y: 0 },
       size: { width: 200, height: 100 },
       content: { text: 'Hello World' },
       styles: {}
   };
   ```

3. **Verify:**
   - ✅ Button appears for text blocks
   - ✅ Panel opens on click
   - ✅ Rewrite works with API
   - ✅ Apply updates the block
   - ✅ Cancel closes the panel

## Troubleshooting

### Button Not Showing
- Check block.type === 'text' condition
- Verify import path is correct
- Check CSS classes are available

### Panel Not Opening
- Check showAIRewrite state
- Verify conditional rendering
- Check for console errors

### Rewrite Not Working
- Verify GEMINI_API_KEY is set
- Check user is authenticated
- Check network tab for API errors

## Advanced Customization

### Custom Styling
Override default styles:

```tsx
<TextRewritePanel
    currentText={block.content?.text || ''}
    onApply={handleApply}
    onCancel={handleCancel}
    className="custom-panel-style"
/>
```

### Custom Instructions
Pre-fill instructions based on context:

```tsx
const [defaultInstruction, setDefaultInstruction] = useState('');

// Auto-detect if text needs improvement
useEffect(() => {
    if (block.content?.text && block.content.text.length < 20) {
        setDefaultInstruction('Make it longer and more detailed');
    }
}, [block]);
```

### Analytics Tracking
Track usage:

```typescript
const handleApply = (rewrittenText: string) => {
    // Track event
    analytics.track('ai_rewrite_applied', {
        originalLength: block.content?.text.length,
        newLength: rewrittenText.length,
    });
    
    updateContent({ text: rewrittenText });
    setShowAIRewrite(false);
};
```

---

That's it! Your BlockEditor now has AI-powered text rewriting capabilities. 🎉
