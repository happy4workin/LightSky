'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import { Check, CreditCard, Smartphone, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Plan data (duplicated for simplicity, ideally shared)
const PLANS = {
    creator: {
        title: 'Creator Plan',
        price: '$12',
        period: '/month',
        features: ['Full AI writing', 'Remove branding', 'Priority speed'],
    },
    pro: {
        title: 'Pro Plan',
        price: '$29',
        period: '/month',
        features: ['Unlimited usage', 'Team collaboration', 'Priority support'],
    },
};

type PaymentMethod = 'credit_card' | 'debit_card' | 'momo';

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan') as 'creator' | 'pro' | null;
    const { user, upgradePlan, hasHydrated } = useUserStore();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Strict guard: Wait for hydration before deciding to redirect
        if (hasHydrated && !user) {
            const currentPlan = searchParams.get('plan');
            const redirectUrl = currentPlan
                ? `/checkout?plan=${currentPlan}`
                : '/checkout';

            router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
        }
    }, [user, hasHydrated, router, searchParams]);

    // Show loading/nothing until hydrated to prevent flash or premature redirect
    if (!hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
                <div className="animate-spin w-8 h-8 border-4 border-nebula-blue border-t-transparent rounded-full" />
            </div>
        );
    }

    const plan = planId && PLANS[planId] ? PLANS[planId] : null;

    if (!plan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">Invalid plan selected</p>
                    <Link href="/getaccess" className="text-nebula-blue font-semibold hover:underline">
                        Return to Pricing
                    </Link>
                </div>
            </div>
        );
    }

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Success logic
        if (planId) {
            upgradePlan(planId);
        }
        setSuccess(true);
        setLoading(false);

        // Redirect after showing success for a moment
        setTimeout(() => {
            router.push('/portfolio');
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
                    <p className="text-gray-500 mb-6">
                        You have been upgraded to the <span className="font-semibold text-nebula-blue">{plan.title}</span>.
                    </p>
                    <div className="animate-pulse text-sm text-gray-400">
                        Redirecting to your portfolio...
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-[#202124] py-12 px-4 md:px-8 selection:bg-nebula-blue/30">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/getaccess"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Plans
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Payment Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('credit_card')}
                                    className={`relative p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${paymentMethod === 'credit_card'
                                        ? 'border-nebula-blue bg-blue-50/50'
                                        : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${paymentMethod === 'credit_card' ? 'bg-nebula-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-gray-900">Credit Card</p>
                                        <p className="text-xs text-gray-500">Visa, Mastercard</p>
                                    </div>
                                    {paymentMethod === 'credit_card' && (
                                        <div className="absolute top-4 right-4 text-nebula-blue">
                                            <div className="w-4 h-4 bg-nebula-blue rounded-full border-2 border-white ring-2 ring-nebula-blue box-content" />
                                        </div>
                                    )}
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('debit_card')}
                                    className={`relative p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${paymentMethod === 'debit_card'
                                        ? 'border-green-500 bg-green-50/50'
                                        : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${paymentMethod === 'debit_card' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-gray-900">Debit Card</p>
                                        <p className="text-xs text-gray-500">Bank Cards</p>
                                    </div>
                                    {paymentMethod === 'debit_card' && (
                                        <div className="absolute top-4 right-4 text-green-500">
                                            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-500 box-content" />
                                        </div>
                                    )}
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('momo')}
                                    className={`relative p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${paymentMethod === 'momo'
                                        ? 'border-[#A50064] bg-pink-50/50'
                                        : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${paymentMethod === 'momo' ? 'bg-[#A50064] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-gray-900">Momo Wallet</p>
                                        <p className="text-xs text-gray-500">Instant Payment</p>
                                    </div>
                                    {paymentMethod === 'momo' && (
                                        <div className="absolute top-4 right-4 text-[#A50064]">
                                            <div className="w-4 h-4 bg-[#A50064] rounded-full border-2 border-white ring-2 ring-[#A50064] box-content" />
                                        </div>
                                    )}
                                </button>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-5">
                                <AnimatePresence mode="wait">
                                    {paymentMethod === 'credit_card' || paymentMethod === 'debit_card' ? (
                                        <motion.div
                                            key={paymentMethod}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {paymentMethod === 'credit_card' ? 'Credit Card' : 'Debit Card'} Information
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="0000 0000 0000 0000"
                                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'} focus:ring-2 focus:ring-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'}/20 outline-none transition-all`}
                                                        required
                                                    />
                                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'} focus:ring-2 focus:ring-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'}/20 outline-none transition-all`}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                                                    <input
                                                        type="text"
                                                        placeholder="123"
                                                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'} focus:ring-2 focus:ring-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'}/20 outline-none transition-all`}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'} focus:ring-2 focus:ring-${paymentMethod === 'debit_card' ? 'green-500' : 'nebula-blue'}/20 outline-none transition-all`}
                                                    required
                                                />
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="momo"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        placeholder="0912 345 678"
                                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#A50064] focus:ring-2 focus:ring-[#A50064]/20 outline-none transition-all"
                                                        required
                                                    />
                                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2">You will receive an OTP to confirm ownership.</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code (Fake)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter any 6 digits"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A50064] focus:ring-2 focus:ring-[#A50064]/20 outline-none transition-all"
                                                    required
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 mt-6 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${paymentMethod === 'momo' ? 'bg-[#A50064] hover:bg-[#8F0057]' :
                                        paymentMethod === 'debit_card' ? 'bg-green-500 hover:bg-green-600' :
                                            'bg-nebula-blue hover:bg-blue-600'
                                        }`}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Pay {plan.price} Now
                                            <ShieldCheck className="w-5 h-5 opacity-80" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    Secure fully encrypted payment
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-start pb-4 border-b border-gray-50">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{plan.title}</h4>
                                        <p className="text-xs text-gray-500">Monthly billing</p>
                                    </div>
                                    <p className="font-bold text-gray-900">{plan.price}</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{plan.price}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <span className="font-bold text-lg text-gray-900">Total</span>
                                    <span className="font-bold text-2xl text-nebula-blue">{plan.price}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Plan includes:</p>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6 text-xs text-gray-400 text-center">
                                By completing this purchase, you agree to LightSky's fake terms of service.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
