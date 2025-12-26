"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const text = "LightSky breaks the rigid grid. We are the infinite canvas. Portfolio is not about contents. It's about flow.";
const words = text.split(" ");

export function ManifestoSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.5", "end 0.2"], // Converted to delayed start
    });

    return (
        <section ref={containerRef} className="py-32 px-6 min-h-[80vh] flex items-center justify-center">
            <div className="max-w-4xl text-center">
                <p className="text-[3rem] md:text-[5rem] font-bold leading-[1.1] tracking-tight flex flex-wrap justify-center gap-x-4">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]); // Grey to White

                        return (
                            <motion.span key={i} style={{ opacity }} className="transition-colors duration-200">
                                {word}
                            </motion.span>
                        );
                    })}
                </p>
            </div>
        </section>
    );
}
