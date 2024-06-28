'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { Selection } from '@/app/_lib/interfaces';

export const bgColors = {
  HTML: 'bg-[#FFF1E9]',
  CSS: 'bg-[#E0FDEF]',
  JavaScript: 'bg-[#EBF0FF]',
  Accessibility: 'bg-[#F6E7FF]',
};

export const DataContext = createContext(
  {} as {
    selectionQuiz: Selection | null;
    setSelectionQuiz: Dispatch<SetStateAction<Selection | null>>;
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
    selectionOption: number | null;
    setSelectionOption: Dispatch<SetStateAction<number | null>>;
    showCorrect: boolean;
    setShowCorrect: Dispatch<SetStateAction<boolean>>;
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [selectionQuiz, setSelectionQuiz] = useState<Selection | null>(null);
  const [selectionOption, setSelectionOption] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  return (
    <DataContext.Provider
      value={{
        selectionQuiz,
        setSelectionQuiz,
        progress,
        setProgress,
        selectionOption,
        setSelectionOption,
        showCorrect,
        setShowCorrect,
        score,
        setScore,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
