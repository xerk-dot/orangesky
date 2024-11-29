'use client';

import { api } from "~/trpc/react";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800']
});

export function HeaderStats() {
  const { data: count, isLoading } = api.user.count.useQuery();

  return (
    <span className={jetbrains.className}>
      {isLoading ? "Loading..." : `${count?.toLocaleString() ?? 0} profiles`}
    </span>
  );
} 