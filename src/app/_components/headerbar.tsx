'use client';
import { useState, useEffect } from "react";
import { JetBrains_Mono } from "next/font/google";
import { HeaderStats } from "./HeaderStats";
import { TRPCReactProvider } from "~/trpc/react";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800']
});

export function HeaderBar() {
  const [color, setColor] = useState("text-orangered");
  const [formattedDate, setFormattedDate] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    const colors = ["text-orangered", "text-orange"] as const;
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setColor(colors[index] as string);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Format date on client side only
    const formatDate = () => {
      const date = new Date();
      const formattedDateParts = [
        date.getDate(),
        date.toLocaleString('en-GB', { month: 'long' }),
        date.getFullYear(),
        date.toLocaleString('en-GB', { weekday: 'short' }).toUpperCase()
      ];
      setFormattedDate(formattedDateParts.join(' '));
    };

    formatDate(); // Initial format
    const interval = setInterval(formatDate, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  // Initial empty state to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <TRPCReactProvider>
      <header className={`${jetbrains.className} flex flex-col mb-5 md:mb-10 w-full border-t border-b border-white`}>
        <div className="flex gap-2 items-center m-3 text-sm">
          <button 
            onClick={() => setIsMenuVisible(!isMenuVisible)}
            className={`transition-colors duration-500 ${color} text-sm`}
          >[=]</button>
          <span className="ml-2 text-sm w-full flex justify-between items-center">
            <span>{formattedDate}</span>
            <span className="text-right"><span className="text-orangered">v0.0.0.4</span> • 41.8781° N, 87.6298° W • BTC ↑5.76%</span>
          </span>
        </div>
        <nav className={`text-sm px-3 pb-3 ${isMenuVisible ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col mb-4 md:mb-0">
              <span>Pages</span>
              <a href="/archive" className="text-orangered hover:underline">Archive</a>
              <a href="/changelog" className="text-orangered hover:underline">Changelog</a>
              <a href="/resources" className="text-orangered hover:underline">Resources</a>
              <a href="/about-site" className="text-orangered hover:underline">About Site</a>
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
              <span>Featured</span>
              <a href="/calendar" className="text-orangered hover:underline">Calendar</a>
              <a href="/messages" className="text-orangered hover:underline">Community Messages</a>
              <a href="/guides" className="text-orangered hover:underline">Guides</a>
              <a href="/favorites" className="text-orangered hover:underline">Favorites</a>
              <a href="/tags" className="text-orangered hover:underline">All Tags</a>
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
              <span>Photos</span>
              <a href="/random-photo" className="text-orangered hover:underline">Random Photo</a>
              <a href="/photos" className="text-orangered hover:underline">All Photos</a>
              <span className="mt-2">Interactions</span>
              <a href="/likes" className="text-orangered hover:underline">My Likes</a>
              <a href="/comments" className="text-orangered hover:underline">My Comments</a>
            </div>
            <div className="flex flex-col text-right text-white">
              <span>Stats</span>
              <HeaderStats />
              <span>News Daily: ~142.8</span>
              <span>News Total: 857</span>
              <span>Readers Qtly: 12.4K</span>
              <span className="mt-2 text-orangered hover:underline">Acknowledgements</span>
            </div>
          </div>
        </nav>
      </header>
    </TRPCReactProvider>
  );
}