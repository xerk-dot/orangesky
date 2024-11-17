'use client';

import { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

const SortableList = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      new Sortable(listRef.current, {
        animation: 150,
        direction: 'vertical',
        draggable: '.sortable-item',
      });
    }
  }, []);

  return (
    <div 
      ref={listRef}
      className="flex flex-col gap-4 p-4 pr-0 fixed right-0 top-32 w-1/3 min-w-[300px] max-w-xl"
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="sortable-item bg-gray-600/5 rounded-lg shadow-md cursor-move flex flex-col items-end justify-center p-4 h-24"
        >
          <div className="font-jetbrains text-lg text-[orangered]/80">[0][01]</div>
          <div className="font-jetbrains font-bold text-[orangered] text-2xl">
            Item {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SortableList;