'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export enum FontFamily {
  sans_serif = 'sans_serif',
  serif = 'serif',
  monospace = 'monospace',
}

export const fontFamilies = {
  sans_serif: 'font-inter',
  serif: 'font-lora',
  monospace: 'font-inconsolata',
};

export const DataContext = createContext(
  {} as {
    fontFamily: FontFamily | null;
    setFontFamily: Dispatch<SetStateAction<FontFamily | null>>;
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [fontFamily, setFontFamily] = useState<FontFamily | null>(null);

  return (
    <DataContext.Provider
      value={{
        fontFamily,
        setFontFamily,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
