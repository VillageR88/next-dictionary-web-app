'use client';
import { DataContext, fontFamilies, FontFamily } from '../_lib/DataContext';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import imageArrow from '@/public/assets/images/icon-arrow-down.svg';

const fontNames = {
  sans_serif: 'Sans Serif',
  serif: 'Serif',
  monospace: 'Mono',
};

export default function ButtonFont() {
  const { setFontFamily, fontFamily } = useContext(DataContext);
  const [showFonts, setShowFonts] = useState<boolean>(false);

  useEffect(() => {
    if (fontFamily === null) {
      const value = localStorage.getItem('fontFamily');
      if (value === FontFamily.sans_serif || value === FontFamily.serif || value === FontFamily.monospace) {
        setFontFamily(value as FontFamily);
      } else {
        setFontFamily(FontFamily.sans_serif);
      }
    }
  }, [fontFamily, setFontFamily]);

  if (!fontFamily) return;

  return (
    <div className="relative flex flex-col pr-[26px]">
      <button
        onClick={() => {
          setShowFonts(!showFonts);
        }}
        className="flex items-center gap-[14px] text-[18px] font-bold leading-[24px] text-[#2D2D2D] transition dark:text-white"
        type="button"
      >
        <span>{fontNames[fontFamily]}</span>
        <Image width={14} height={8} className="size-fit" src={imageArrow as string} alt="arrow" />
      </button>

      <div
        onMouseLeave={() => {
          setShowFonts(false);
        }}
        className={`absolute ${showFonts ? 'opacity-100' : 'pointer-events-none opacity-0'} right-8 pt-12 transition`}
      >
        <div className="flex h-[152px] w-[183px] flex-col gap-[16px] rounded-[16px] p-[24px] text-[18px] font-bold leading-[24px] shadow-[0_8px_35px_-0px_rgba(0,0,0,0.11)] transition dark:bg-[#1F1F1F]">
          {Object.entries(fontNames).map(([key, value]) => (
            <button
              onClick={() => {
                setFontFamily(key as FontFamily);
                setShowFonts(false);
                localStorage.setItem('fontFamily', key);
              }}
              type="button"
              className={`${fontFamilies[key as keyof typeof FontFamily]} text-left text-[#2D2D2D] transition hover:text-[#A445ED] dark:text-white dark:hover:text-[#A445ED]`}
              id={key}
              key={key}
              value={key}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
