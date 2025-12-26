"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

const features = [
    {
        title: "AI Storytelling Assistant",
        description: "Tell your story naturally. Let the AI help craft the words while you focus on sharing your journey and creative vision.",
        colSpan: "col-span-12 md:col-span-8",
    },
    {
        title: "Infinite Canvas",
        description: "Drag, drop, and connect logic blocks in a free-form spatial environment.",
        colSpan: "col-span-12 md:col-span-4",
    },
    {
        title: "Public Pages",
        description: "Deploy instant personal sites directly from your canvas.",
        colSpan: "col-span-12 md:col-span-4",
    },
    {
        title: "Live Connect",
        description: "Receive updates and contact information instantly, keeping everything current in real-time.",
        colSpan: "col-span-12 md:col-span-8",
    },
];

export function ShowcaseSection() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center tracking-tight"
                >
                    Tools for the <span className="text-nebula-blue">Light</span> Age
                </motion.h2>

                <div className="grid grid-cols-12 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className={feature.colSpan}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="h-[300px] p-8 flex flex-col justify-end group hover:border-nebula-blue/30 transition-colors duration-500">
                                <div className="mt-auto">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-nebula-blue transition-colors">{feature.title}</h3>
                                    <p className="text-[#666666] leading-relaxed">{feature.description}</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
