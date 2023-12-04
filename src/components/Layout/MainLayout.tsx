import { ReactNode, useEffect, useRef } from 'react';

import popSound from '@/assets/pop.ogg';
import { useScore } from '@/context';

type MainLayoutProps = {
  children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const { increase, setIsPressed } = useScore();
  const isFired = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pop = useRef(new Audio(popSound));

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
      pop.current.currentTime = 0;
      pop.current.play();
      increase();
      onPressDown();
    }
  };

  const onLayoutDown = (event: MouseEvent) => {
    if (event.target === containerRef.current) onPop();
  };

  const onLayoutUp = (event: MouseEvent) => {
    if (event.target === containerRef.current) onPressUp();
  };

  useEffect(() => {
    document.addEventListener('pointerdown', onLayoutDown);
    document.addEventListener('keydown', onPop);
    document.addEventListener('keyup', onPressUp);
    document.addEventListener('pointerup', onLayoutUp);

    return () => {
      document.removeEventListener('mousedown', onLayoutDown);
      document.removeEventListener('keydown', onPop);
      document.removeEventListener('keyup', onPressUp);
      document.removeEventListener('mouseup', onLayoutUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-between items-center h-screen"
    >
      {children}
    </div>
  );
}
