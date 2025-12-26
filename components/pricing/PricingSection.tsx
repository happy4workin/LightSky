'use client';

import React, { useState } from 'react';
import PricingCard from './PricingCard';
import CheckoutModal from './CheckoutModal';
import { motion } from 'framer-motion';

const PLANS = [
    {
        id: 'free',
        title: 'Free',
        price: 'Free',
        href: '/login',
        description: 'Perfect for trying out LightSky and building your first portfolio.',
        ctaText: 'Get started for free',
        features: [
            'Limited AI generations',
            'Basic portfolio templates',
            'LightSky branding'
        ]
    },
    {
        id: 'creator',
        title: 'Creator',
        price: '$12',
        description: 'For storytellers who want full creative control and professional features.',
        ctaText: 'Upgrade to Creator',
        isPopular: true,
        features: [
            'Full AI writing & storytelling',
            'Custom domains & branding',
            'Remove LightSky branding',
            'Priority generation speed',
            'Premium templates'
        ]
    },
    {
        id: 'pro',
        title: 'Pro',
        price: '$29',
        description: 'Power users needing high volume and advanced customization tools.',
        ctaText: 'Go Pro',
        features: [
            'Unlimited AI usage',
            'Advanced layouts & animations',
            'Early access to new features',
            'Priority support',
            'Team collaboration features'
        ]
    }
];

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
// ... (imports)

export default function PricingSection() {
    const router = useRouter();
    const { isAuthenticated, user, upgradePlan } = useUserStore();
    const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectPlan = (plan: typeof PLANS[0]) => {
        let redirectPath = '';

        if (plan.id === 'free') {
            redirectPath = '/portfolio';
        } else {
            redirectPath = `/checkout?plan=${plan.id}`;
        }

        if (isAuthenticated) {
            router.push(redirectPath);
        } else {
            // Redirect to login with return url
            // For free plan: /login -> /portfolio
            // For paid plan: /login -> /checkout?plan=...
            router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
        }
    };

    return (
        <section className="py-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 items-start">
                {PLANS.map((plan, index) => {
                    const isCurrentPlan = user?.plan === plan.id;
                    const isPaidPlan = plan.id !== 'free'; // Assuming 'free' is the id for free plan

                    const handlePlanAction = () => {
                        if (isCurrentPlan && isPaidPlan) {
                            if (confirm('Are you sure you want to cancel your plan? You will lose access to premium features immediately.')) {
                                upgradePlan('free');
                            }
                        } else {
                            handleSelectPlan(plan);
                        }
                    };

                    // Determine button text
                    let ctaText = plan.ctaText;
                    if (isCurrentPlan) {
                        ctaText = isPaidPlan ? 'Cancel Plan' : 'Current Plan';
                    }

                    return (
                        <PricingCard
                            key={plan.id}
                            {...plan}
                            ctaText={ctaText}
                            onSelect={handlePlanAction}
                            delay={index * 0.1}
                        />
                    );
                })}
            </div>

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={selectedPlan}
            />
        </section>
    );
}
