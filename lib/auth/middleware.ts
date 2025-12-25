import { NextRequest } from 'next/server';
import { verifyToken, TokenPayload } from './jwt';

export async function getAuthUser(request: NextRequest): Promise<TokenPayload | null> {
    try {
        const token = request.cookies.get('auth_token')?.value;

        if (!token) {
            return null;
        }

        const payload = verifyToken(token);
        return payload;
    } catch (error) {
        return null;
    }
}

export function requireAuth(request: NextRequest): TokenPayload {
    const user = getAuthUser(request);

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user as any;
}
