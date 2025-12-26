import React from 'react';
import { X, Lock, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: {
        title: string;
        price: string;
        features: string[];
    } | null;
}

export default function CheckoutModal({ isOpen, onClose, plan }: CheckoutModalProps) {
    if (!plan) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto max-w-lg h-fit bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Secure Checkout</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {/* Selected Plan Summary */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-8 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Selected Plan</p>
                                    <h3 className="font-bold text-gray-900">{plan.title}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-nebula-blue">{plan.price}</p>
                                    <p className="text-xs text-gray-400">/month</p>
                                </div>
                            </div>

                            {/* Minimal Form */}
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-nebula-blue focus:ring-2 focus:ring-nebula-blue/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card details</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <CreditCard className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-nebula-blue focus:ring-2 focus:ring-nebula-blue/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="w-full py-4 bg-nebula-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 mt-6"
                                >
                                    Complete Payment
                                </button>
                            </form>

                            {/* Security Note */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                                <Lock className="w-3 h-3" />
                                <span>Payments are secure and encrypted</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
