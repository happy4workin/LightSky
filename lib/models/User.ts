import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9-_]+$/, 'Username can only contain lowercase letters, numbers, hyphens, and underscores'],
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [30, 'Username cannot exceed 30 characters'],
        },
        displayName: {
            type: String,
            required: [true, 'Display name is required'],
            trim: true,
            maxlength: [50, 'Display name cannot exceed 50 characters'],
        },
        bio: {
            type: String,
            maxlength: [500, 'Bio cannot exceed 500 characters'],
        },
        avatarUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
