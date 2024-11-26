'use client';

import { TrendingUp } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import SectionTitle from '../_components/sectionTitle';
import { ClientChart } from "../_components/ui/ClientChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800']
});

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ff4500",
  },
  mobile: {
    label: "Mobile",
    color: "#ff8c00",
  },
};

export default function AboutSitePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-4xl">
        <SectionTitle title="About Site" exponent="05" />
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className={jetBrainsMono.className}>Site Traffic</CardTitle>
              <CardDescription className={jetBrainsMono.className}>
                Showing total visitors for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientChart data={chartData} config={chartConfig} />
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className={`flex items-center gap-2 font-medium leading-none ${jetBrainsMono.className}`}>
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className={`flex items-center gap-2 leading-none text-gray-400 ${jetBrainsMono.className}`}>
                    January - June 2024
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
