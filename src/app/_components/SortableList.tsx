'use client';

import { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { api } from "~/trpc/react";
import { JetBrains_Mono } from "next/font/google";
import Link from 'next/link';  // Add this import

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800']
});

const SortableList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { data: users, isLoading } = api.user.getAll.useQuery();

  useEffect(() => {
    if (listRef.current) {
      new Sortable(listRef.current, {
        animation: 150,
        direction: 'vertical',
        draggable: '.sortable-item',
        filter: '.clickable',
        preventOnFilter: false
      });
    }
  }, []);

  if (isLoading) return (
    <div className="flex flex-col gap-4 p-4 pr-0 w-1/3 min-w-[300px] max-w-xl absolute right-0">
      <div className="sortable-item border border-white cursor-move flex flex-col items-end justify-center p-4 h-24">
        <div className={`${jetbrains.className} text-lg text-[orangered]/80`}>[0][01]</div>
        <div className={`${jetbrains.className} font-bold text-white text-2xl`}>Loading...</div>
      </div>
    </div>
  );

  return (
    <div 
      ref={listRef}
      className="flex flex-col gap-4 p-4 pr-0 w-1/3 min-w-[300px] max-w-xl absolute right-0"
    >
      {users?.map((user, index) => (
        <Link
          key={user.id}
          href={`https://bsky.app/profile/${user.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="clickable no-underline"
        >
          <div
            className="sortable-item border border-white cursor-pointer hover:bg-white/5 transition-colors flex flex-col items-end justify-center p-4 h-24"
          >
            <div className={`${jetbrains.className} text-lg text-[orangered]/80`}>
              [{index}][{String(index).padStart(2, '0')}]
            </div>
            <div className={`${jetbrains.className} font-bold text-white text-2xl`}>
              {user.handle}
            </div>
            <div className={`${jetbrains.className} text-sm text-gray-400`}>
              {user.numOfFollowers} followers • {user.numOfFollowing} following
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SortableList;