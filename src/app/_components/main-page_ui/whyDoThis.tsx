'use client';

import Link from 'next/link';
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800']
});

export function WhyDoThis() {
  return (
    <Link href="/about" className={`${jetbrains.className} text-orangered text-lg underline`} style={{ margin: '10px' }}>
        why do this?
    </Link>
  );
}