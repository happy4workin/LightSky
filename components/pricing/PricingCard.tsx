import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingCardProps {
    title: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    ctaText: string;
    onSelect: () => void;
    delay?: number;
}

export default function PricingCard({
    title,
    price,
    period = '/month',
    description,
    features,
    isPopular = false,
    ctaText,
    onSelect,
    delay = 0,
}: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`relative flex flex-col p-8 rounded-3xl bg-white border transition-all duration-300 ${isPopular
                    ? 'border-nebula-blue shadow-xl scale-105 z-10'
                    : 'border-gray-200 shadow-sm hover:shadow-md'
                }`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-nebula-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Best Value
                    </span>
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm min-h-[40px]">{description}</p>
            </div>

            <div className="mb-8">
                <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{price}</span>
                    {price !== 'Free' && <span className="text-gray-500 ml-1">{period}</span>}
                </div>
            </div>

            <button
                onClick={onSelect}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 mb-8 ${isPopular
                        ? 'bg-nebula-blue text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
            >
                {ctaText}
            </button>

            <div className="space-y-4 flex-grow">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 ${isPopular ? 'text-nebula-blue' : 'text-gray-400'}`} />
                        <span className="text-gray-600 text-sm leading-tight">{feature}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
