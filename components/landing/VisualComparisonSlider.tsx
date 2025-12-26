'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

const Slide = ({ title, description, children, isActive, theme }: { title: string, description: string, children: React.ReactNode, isActive: boolean, theme: 'rigid' | 'free' }) => (
    <div className="flex-[0_0_100%] min-w-0 px-4 md:px-16">
        <div className={cn(
            "relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden border transition-all duration-500",
            theme === 'rigid' ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 grayscale" : "bg-zinc-50 dark:bg-zinc-950 border-purple-500/50 shadow-2xl shadow-purple-500/10"
        )}>
            <div className="absolute inset-0 p-8 flex flex-col md:flex-row items-center gap-8">
                {/* Text Side */}
                <div className="flex-1 w-full z-10">
                    <h3 className={cn("text-2xl font-bold mb-2", theme === 'free' ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500" : "text-zinc-500")}>{title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md">{description}</p>
                </div>

                {/* Visual Side */}
                <div className="flex-[2] w-full h-full relative">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default function VisualComparisonSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        // Auto-play slow
        const interval = setInterval(() => {
            if (emblaApi.canScrollNext()) emblaApi.scrollNext();
            else emblaApi.scrollTo(0);
        }, 5000);
        return () => clearInterval(interval);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-24 w-full bg-white dark:bg-black overflow-hidden">
            <div className="container px-4 md:px-6 mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why fit in a box?</h2>
                <p className="text-zinc-500 max-w-2xl mx-auto">Most platforms treat you like a database entry. LightSky treats you like a creator.</p>
            </div>

            <div className="w-full max-w-6xl mx-auto" ref={emblaRef}>
                <div className="flex touch-pan-y">

                    {/* SLIDE 1: RIGID */}
                    <Slide
                        title="The Old Way"
                        description="Rigid grids. Fixed avatars. Zero creative control. You look like everyone else."
                        isActive={selectedIndex === 0}
                        theme="rigid"
                    >
                        {/* CSS Abstract Rigid UI */}
                        <div className="w-full h-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex gap-4 opacity-50">
                            <div className="w-1/3 h-full flex flex-col gap-4">
                                <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                                <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                                <div className="w-2/3 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                            </div>
                            <div className="w-2/3 h-full flex flex-col gap-4">
                                <div className="w-full h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                                <div className="w-full h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            </div>
                        </div>
                    </Slide>

                    {/* SLIDE 2: FREE FORM */}
                    <Slide
                        title="The LightSky Way"
                        description="Total freedom. Drag, drop, rotate, overlap. AI helps you break the grid."
                        isActive={selectedIndex === 1}
                        theme="free"
                    >
                        {/* CSS Abstract Free UI */}
                        <div className="w-full h-full relative">
                            <motion.div
                                animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl z-10"
                            />
                            <motion.div
                                animate={{ rotate: [0, -3, 0], y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-4 left-32 w-48 h-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg z-20 flex items-center justify-center"
                            >
                                <span className="font-bold text-zinc-900 dark:text-white">Creative Director</span>
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 z-0"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Hand className="w-8 h-8 text-black dark:text-white drop-shadow-xl" />
                            </div>
                        </div>
                    </Slide>

                </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {[0, 1].map((index) => (
                    <button
                        key={index}
                        className={cn("w-2 h-2 rounded-full transition-all", selectedIndex === index ? "bg-purple-600 w-6" : "bg-zinc-300 dark:bg-zinc-700")}
                        onClick={() => emblaApi?.scrollTo(index)}
                    />
                ))}
            </div>
        </section>
    );
}
