import { PointerEvent, ReactNode, useRef } from 'react';

import pop1Sound from '@/assets/pop1.ogg';
import pop2Sound from '@/assets/pop2.ogg';
import pop3Sound from '@/assets/pop3.ogg';
import pop4Sound from '@/assets/pop4.ogg';
import { useScore } from '@/context';

type MainLayoutProps = {
  children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const { increase, setIsPressed } = useScore();
  const isFired = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pops = [pop1Sound, pop2Sound, pop3Sound, pop4Sound];
  const popIndex = Math.floor(Math.random() * 4);
  const pop = new Audio(pops[popIndex]);

  const onPressDown = () => {
    setIsPressed(true);
    isFired.current = true;
  };

  const onPressUp = () => {
    setIsPressed(false);
    isFired.current = false;
  };

  const onPop = () => {
    if (!isFired.current) {
      pop.currentTime = 0;
      pop.play();
      increase();
      onPressDown();
    }
  };

  const onLayoutDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current) onPop();
  };

  const onLayoutUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current) onPressUp();
  };

  return (
    <div
      ref={containerRef}
      role="button"
      className="flex flex-col justify-between items-center h-screen"
      tabIndex={-1}
      onPointerDown={onLayoutDown}
      onPointerUp={onLayoutUp}
      onKeyDown={onPop}
      onKeyUp={onPressUp}
    >
      {children}
    </div>
  );
}
