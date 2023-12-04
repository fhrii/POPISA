import { useEffect, useRef } from 'react';

import formatter from 'format-number';

import { useScore } from '@/context';

const format = formatter();

const rotateList = [
  'rotate-3',
  'rotate-6',
  'rotate-12',
  '-rotate-3',
  '-rotate-6',
  '-rotate-12',
];

export function Header() {
  const timeout = useRef<number | null>(null);
  const rotate = useRef('rotate-0');
  const scoreRef = useRef<HTMLDivElement>(null);
  const { score } = useScore();

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    rotate.current = rotateList[Math.floor(Math.random() * 6)];
    scoreRef.current?.classList.add('scale-125');

    if (score >= 1) scoreRef.current?.classList.add(rotate.current);

    timeout.current = setTimeout(() => {
      scoreRef.current?.classList.remove('scale-125');

      if (score >= 1) scoreRef.current?.classList.remove(...rotateList);
    }, 50);
  }, [score]);

  return (
    <header className="flex justify-center py-5 px-4 pointer-events-none select-none">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-stroke-3 text-8xl font-bold">POPISA</h1>
        <div
          ref={scoreRef}
          className="text-white text-stroke text-4xl font-bold leading-none  transition-all duration-[50] scale-100"
        >
          {format(score)}
        </div>
      </div>
    </header>
  );
}
