'use client';

import { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { JetBrains_Mono } from "next/font/google";
import Link from 'next/link';  // Add this import

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800']
});

const SortableList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const users = [
    { id: 1, handle: 'user1', numOfFollowers: 10, numOfFollowing: 5 },
    { id: 2, handle: 'user2', numOfFollowers: 20, numOfFollowing: 15 },
    { id: 3, handle: 'user3', numOfFollowers: 30, numOfFollowing: 25 },
    { id: 4, handle: 'user4', numOfFollowers: 40, numOfFollowing: 35 },
    { id: 5, handle: 'user5', numOfFollowers: 50, numOfFollowing: 45 },
    { id: 6, handle: 'user6', numOfFollowers: 60, numOfFollowing: 55 },
    { id: 7, handle: 'user7', numOfFollowers: 70, numOfFollowing: 65 },
    { id: 8, handle: 'user8', numOfFollowers: 80, numOfFollowing: 75 },
    { id: 9, handle: 'user9', numOfFollowers: 90, numOfFollowing: 85 },
    { id: 10, handle: 'user10', numOfFollowers: 100, numOfFollowing: 95 },
    { id: 11, handle: 'user11', numOfFollowers: 110, numOfFollowing: 105 },
    { id: 12, handle: 'user12', numOfFollowers: 120, numOfFollowing: 115 },
    { id: 13, handle: 'user13', numOfFollowers: 130, numOfFollowing: 125 },
  ];
  const isLoading = false;

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

    // Prevent body from scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      // Reset body overflow on component unmount
      document.body.style.overflow = '';
    };
  }, []);

  if (isLoading) return null;

  return (
    <div 
      ref={listRef}
      className="fixed bottom-0 right-0 m-4 max-h-[90vh] overflow-y-auto z-50"
    >
      {users.map((user, index) => (
        <Link
          key={user.id}
          href={`https://bsky.app/profile/${user.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="clickable no-underline"
        >
          <div
            className="sortable-item border-2 border-light-border dark:border-dark-border cursor-pointer hover:bg-white/5 transition-colors flex flex-col items-end justify-center p-4 h-24 bg-[#fcfcfc] dark:bg-[#111]"
          >
            <div className={`${jetbrains.className} text-lg text-[orangered]/80`}>
              [{index}][{String(index).padStart(2, '0')}]
            </div>
            <div className={`${jetbrains.className} font-bold text-light-text dark:text-dark-text text-2xl`}>
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