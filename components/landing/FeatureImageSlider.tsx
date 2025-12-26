'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, Wand2, MousePointer2, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        icon: <Wand2 className="w-8 h-8 text-purple-500" />,
        title: "Prompt to Vibe",
        text: "Tell AI what you need. It writes the code and lays out the blocks.",
        color: "bg-purple-500/10 border-purple-500/20"
    },
    {
        icon: <MousePointer2 className="w-8 h-8 text-blue-500" />,
        title: "Drag & Perfection",
        text: "Move anything anywhere. No constraints, no fighting the DOM.",
        color: "bg-blue-500/10 border-blue-500/20"
    },
    {
        icon: <Smartphone className="w-8 h-8 text-green-500" />,
        title: "Mobile Native",
        text: "Your site looks stunning on phones automatically.",
        color: "bg-green-500/10 border-green-500/20"
    }
];

export default function FeatureImageSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Power Features</h2>
                        <p className="text-zinc-500">Everything you need to look professional.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => emblaApi?.scrollPrev()} className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </button>
                        <button onClick={() => emblaApi?.scrollNext()} className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="flex-[0_0_85%] md:flex-[0_0_40%] min-w-0">
                                <div className={cn("h-[400px] rounded-3xl p-8 border hover:border-zinc-300 transition-colors flex flex-col justify-between", feature.color, "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800")}>
                                    <div className="p-4 rounded-full bg-white dark:bg-zinc-800 w-fit shadow-sm">
                                        {feature.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400">{feature.text}</p>
                                    </div>

                                    {/* Visual Abstract for Feature */}
                                    <div className="w-full h-32 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                                        {/* Simple abstract shapes */}
                                        <div className="absolute top-4 left-4 w-12 h-12 rounded bg-zinc-300 dark:bg-zinc-700 opacity-50" />
                                        <div className="absolute bottom-4 right-4 w-24 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
