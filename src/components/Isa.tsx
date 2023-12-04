import { useEffect, useRef } from 'react';

import { useScore } from '@/context';

export function Isa() {
  const isaRef = useRef<HTMLDivElement>(null);
  const timeout = useRef<number | null>(null);
  const { isPressed } = useScore();

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    if (isPressed) {
      isaRef.current?.classList.remove('isa-close');
      isaRef.current?.classList.add('isa-open');
    } else {
      timeout.current = setTimeout(() => {
        isaRef.current?.classList.remove('isa-open');
        isaRef.current?.classList.add('isa-close');
      }, 10);
    }
  }, [isPressed]);

  return (
    <div
      ref={isaRef}
      className="grow w-full max-w-[800px] bg-bottom bg-contain bg-no-repeat pointer-events-none select-none isa-close"
    />
  );
}
