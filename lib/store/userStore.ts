import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name: string;
    plan: 'free' | 'creator' | 'pro';
    paymentStatus: 'none' | 'active';
    updatedAt: number;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    hasHydrated: boolean;
    login: (email: string) => void;
    logout: () => void;
    upgradePlan: (plan: 'free' | 'creator' | 'pro') => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            hasHydrated: false,
            login: (email: string) =>
                set({
                    user: {
                        id: `user_${Math.random().toString(36).substr(2, 9)}`,
                        email,
                        name: email.split('@')[0],
                        plan: 'free',
                        paymentStatus: 'none',
                        updatedAt: Date.now(),
                    },
                    isAuthenticated: true,
                }),
            logout: () => set({ user: null, isAuthenticated: false }),
            upgradePlan: (plan: 'free' | 'creator' | 'pro') =>
                set((state) => ({
                    user: state.user
                        ? {
                            ...state.user,
                            plan,
                            paymentStatus: 'active',
                            updatedAt: Date.now(),
                        }
                        : null,
                })),
        }),
        {
            name: 'lightsky-user-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.hasHydrated = true;
                }
            },
        }
    )
);
