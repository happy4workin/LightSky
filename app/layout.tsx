import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const dreamAvenue = localFont({
  src: "../public/fonts/FontsFree-Net-Dream-Avenue.ttf",
  variable: "--font-dream",
});

export const metadata: Metadata = {
  title: "LightSky - The Infinite Canvas",
  description: "Vibe coding on an infinite canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} ${dreamAvenue.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
