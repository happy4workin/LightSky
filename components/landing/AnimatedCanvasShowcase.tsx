'use client';

import { motion } from 'framer-motion';
import { Type, Image as ImageIcon, Link2, GripHorizontal } from 'lucide-react';

const blocks = [
    { id: 1, type: 'text', content: 'Hi, I\'m Sarah', x: '10%', y: '10%', rotate: -2, width: '200px', height: '60px', delay: 0.2 },
    { id: 2, type: 'image', content: '', x: '50%', y: '15%', rotate: 3, width: '150px', height: '150px', delay: 0.5 },
    { id: 3, type: 'link', content: 'My Portfolio', x: '20%', y: '50%', rotate: 1, width: '240px', height: '50px', delay: 0.8 },
    { id: 4, type: 'text', content: 'Creative Developer', x: '60%', y: '45%', rotate: -1, width: '180px', height: '40px', delay: 1.1 },
    { id: 5, type: 'image', content: '', x: '15%', y: '70%', rotate: 4, width: '120px', height: '120px', delay: 1.4 },
];

export default function AnimatedCanvasShowcase() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            <div className="container px-4 text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">Watch it assemble</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Elements land where you want them. No force-fields.</p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto h-[500px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black rounded-xl shadow-2xl overflow-hidden">

                {/* Simulate Dot Grid Background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                {/* Animated Blocks */}
                {blocks.map((block) => (
                    <motion.div
                        key={block.id}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.6,
                            delay: block.delay,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="absolute bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg rounded-lg flex items-center justify-center p-4 cursor-grab active:cursor-grabbing hover:shadow-xl hover:border-purple-500/50 transition-colors"
                        style={{
                            left: block.x,
                            top: block.y,
                            width: block.width,
                            height: block.height,
                            rotate: block.rotate
                        }}
                    >
                        {/* Drag Handle simulation */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-20">
                            <GripHorizontal size={14} />
                        </div>

                        {/* Content Simulation */}
                        {block.type === 'text' && (
                            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
                                <Type size={16} className="text-purple-500" />
                                {block.content}
                            </div>
                        )}

                        {block.type === 'image' && (
                            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center">
                                <ImageIcon size={24} className="text-zinc-400" />
                            </div>
                        )}

                        {block.type === 'link' && (
                            <div className="flex items-center gap-2 w-full h-full bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded px-4 font-medium text-sm">
                                <Link2 size={16} />
                                {block.content}
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Simulate Mouse Cursor Interaction */}
                <motion.div
                    animate={{
                        x: ['10%', '50%', '20%', '60%', '15%'],
                        y: ['10%', '15%', '50%', '45%', '70%'],
                        opacity: [0, 1, 1, 1, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute pointer-events-none z-50 text-black dark:text-white drop-shadow-md"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" /></svg>
                </motion.div>

            </div>
        </section>
    );
}
