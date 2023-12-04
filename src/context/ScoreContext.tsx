import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ScoreContextType = {
  score: number;
  increase: () => void;
  isPressed: boolean;
  setIsPressed: (isPressed: boolean) => void;
};

const ScoreContext = createContext({} as ScoreContextType);

export function useScore() {
  return useContext(ScoreContext);
}

type ScoreProviderProps = {
  children?: ReactNode;
};

export function ScoreProvider({ children }: ScoreProviderProps) {
  const [score, setScore] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const increase = useCallback(() => {
    setScore((s) => s + 1);
  }, []);

  const value = useMemo(
    () => ({ score, increase, isPressed, setIsPressed }),
    [score, increase, isPressed, setIsPressed],
  );

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}
