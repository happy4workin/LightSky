import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { hashPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { email, username, password, displayName } = body;

        // Validation
        if (!email || !username || !password || !displayName) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            const field = existingUser.email === email ? 'email' : 'username';
            return NextResponse.json(
                { error: `User with this ${field} already exists` },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            displayName,
        });

        // Generate token
        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            username: user.username,
        });

        // Create response with cookie
        const response = NextResponse.json(
            {
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    displayName: user.displayName,
                },
            },
            { status: 201 }
        );

        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
