"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin, Disc } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 py-20 px-6 bg-black z-10 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">

                {/* Brand & Copyright */}
                <div className="col-span-12 md:col-span-5 flex flex-col justify-between h-full">
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tight text-white mb-6 block">
                            Light<span className="text-nebula-blue">Sky</span>
                        </Link>
                        <p className="text-[#666666] max-w-sm leading-relaxed mb-6">
                            Let the AI help craft the words while you focus on sharing your journey and creative vision.
                        </p>
                    </div>
                    <p className="text-[#444444] text-sm">
                        &copy; {new Date().getFullYear()} LightSky Inc. All rights reserved.
                    </p>
                </div>

                {/* Navigation */}
                <div className="col-span-6 md:col-span-3 lg:col-span-2 lg:col-start-8">
                    <h4 className="text-white font-medium mb-6">Product</h4>
                    <ul className="space-y-4 text-[#888888]">
                        <li>
                            <Link href="#" className="hover:text-white transition-colors duration-200">Manifesto</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors duration-200">Showcase</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors duration-200">Pricing</Link>
                        </li>
                        <li>
                            <Link href="/login" className="hover:text-white transition-colors duration-200">Log In</Link>
                        </li>
                    </ul>
                </div>

                {/* Socials */}
                <div className="col-span-6 md:col-span-4 lg:col-span-3 pl-0 md:pl-12">
                    <h4 className="text-white font-medium mb-6">Connect</h4>
                    <div className="flex gap-4">
                        <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#888888] hover:text-white transition-all duration-200 border border-white/5 hover:border-white/20">
                            <Twitter size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#888888] hover:text-white transition-all duration-200 border border-white/5 hover:border-white/20">
                            <Github size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#888888] hover:text-white transition-all duration-200 border border-white/5 hover:border-white/20">
                            <Linkedin size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#888888] hover:text-white transition-all duration-200 border border-white/5 hover:border-white/20">
                            <Disc size={18} />
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
