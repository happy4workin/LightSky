/**
 * Hook for AI-powered text rewriting using Gemini
 */
import { useState } from 'react';

export interface UseTextRewriteOptions {
    onSuccess?: (rewrittenText: string) => void;
    onError?: (error: string) => void;
}

export interface UseTextRewriteResult {
    rewriteText: (text: string, instruction: string) => Promise<string | null>;
    isLoading: boolean;
    error: string | null;
}

export function useTextRewrite(options?: UseTextRewriteOptions): UseTextRewriteResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const rewriteText = async (
        text: string,
        instruction: string
    ): Promise<string | null> => {
        if (!text.trim()) {
            const errorMsg = 'Text cannot be empty';
            setError(errorMsg);
            options?.onError?.(errorMsg);
            return null;
        }

        if (!instruction.trim()) {
            const errorMsg = 'Instruction cannot be empty';
            setError(errorMsg);
            options?.onError?.(errorMsg);
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ai/rewrite-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    instruction,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to rewrite text');
            }

            const rewrittenText = data.rewrittenText;
            options?.onSuccess?.(rewrittenText);
            return rewrittenText;
        } catch (err: any) {
            const errorMsg = err.message || 'An unexpected error occurred';
            setError(errorMsg);
            options?.onError?.(errorMsg);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        rewriteText,
        isLoading,
        error,
    };
}
