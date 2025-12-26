import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12 bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-800">
            <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm text-zinc-500">
                    © {new Date().getFullYear()} LightSky. All rights reserved.
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
