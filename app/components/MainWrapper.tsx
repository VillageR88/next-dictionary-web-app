'use client';
import { DataContext, fontFamilies } from '../_lib/DataContext';
import { ReactNode, useContext } from 'react';

export default function MainWrapper({ children }: { children: ReactNode }) {
  const { fontFamily } = useContext(DataContext);
  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-[737px] flex-col ${fontFamilies[fontFamily]}`}>
      {children}
    </div>
  );
}
