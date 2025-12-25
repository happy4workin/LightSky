# 🚀 AI Text Rewrite - Quick Reference

## 🔑 Environment Setup
```bash
# .env.local
GEMINI_API_KEY=your_key_here
```
Get key: https://makersuite.google.com/app/apikey

---

## 📦 What Was Created

| File | Purpose |
|------|---------|
| `lib/ai/geminiService.ts` | Gemini API integration |
| `app/api/ai/rewrite-text/route.ts` | API endpoint |
| `lib/ai/useTextRewrite.ts` | React hook |
| `components/ai/TextRewritePanel.tsx` | UI component |
| `app/test/ai-rewrite/page.tsx` | Test page |

---

## 🎯 Quick Usage

### Use the Component
```tsx
import TextRewritePanel from '@/components/ai/TextRewritePanel';

<TextRewritePanel
    currentText="Hello world"
    onApply={(text) => console.log(text)}
    onCancel={() => {}}
/>
```

### Use the Hook
```tsx
import { useTextRewrite } from '@/lib/ai/useTextRewrite';

const { rewriteText, isLoading } = useTextRewrite();
const result = await rewriteText('text', 'make professional');
```

### Call API Directly
```typescript
fetch('/api/ai/rewrite-text', {
    method: 'POST',
    body: JSON.stringify({
        text: 'Your text',
        instruction: 'Make it better'
    })
})
```

---

## 🧪 Test It

Navigate to: **http://localhost:3000/test/ai-rewrite**

---

## 📖 Example Instructions

- "Make it more professional"
- "Add enthusiasm"
- "Make it shorter"
- "Make it longer and detailed"
- "Simplify the language"
- "Make it sound more confident"

---

## ⚡ Integration with BlockEditor

```tsx
// 1. Import
import TextRewritePanel from '@/components/ai/TextRewritePanel';
import { useState } from 'react';

// 2. Add state
const [showAI, setShowAI] = useState(false);

// 3. Add button
<button onClick={() => setShowAI(true)}>
    ✨ AI Rewrite
</button>

// 4. Add panel
{showAI && (
    <TextRewritePanel
        currentText={block.content.text}
        onApply={(text) => {
            updateContent({ text });
            setShowAI(false);
        }}
        onCancel={() => setShowAI(false)}
    />
)}
```

---

## 🔍 API Reference

### POST `/api/ai/rewrite-text`

**Request:**
```json
{
    "text": "string",
    "instruction": "string"
}
```

**Response:**
```json
{
    "success": true,
    "rewrittenText": "string"
}
```

**Auth:** Required (user must be logged in)

---

## 🛠️ Troubleshooting

| Error | Solution |
|-------|----------|
| "GEMINI_API_KEY not configured" | Add to `.env.local` & restart |
| "Unauthorized" | User must be logged in |
| Slow response | Normal (1-3s), show loading state |

---

## 📚 Full Documentation

- **Complete Guide:** `AI_TEXT_REWRITE_README.md`
- **Integration Steps:** `AI_INTEGRATION_GUIDE.md`
- **Overview:** `AI_IMPLEMENTATION_SUMMARY.md`

---

## ✅ Deployment Checklist

- [ ] Set `GEMINI_API_KEY` in production
- [ ] Test authentication flows
- [ ] Monitor API usage
- [ ] Set up error logging
- [ ] Test on different devices

---

**Quick Start:** http://localhost:3000/test/ai-rewrite
