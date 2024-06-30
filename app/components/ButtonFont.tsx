'use client';
import { DataContext, fontFamilies, FontFamily } from '../_lib/DataContext';
import { useContext, useEffect, useState } from 'react';

const fontNames = {
  sans_serif: 'Sans Serif',
  serif: 'Serif',
  monospace: 'Mono',
};

export default function ButtonFont() {
  const { setFontFamily, fontFamily, showFonts, setShowFonts } = useContext(DataContext);
  const [temporalPincerFont, setTemporalPincerFont] = useState<FontFamily | null>(fontFamily);

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
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8">
          <path fill="none" stroke="#A445ED" strokeWidth="1.5" d="m1 1 6 6 6-6" />
        </svg>
      </button>

      <div
        onMouseLeave={() => {
          setShowFonts(false);
        }}
        className={`absolute ${showFonts ? 'opacity-100' : 'pointer-events-none opacity-0 duration-0'} right-8 pt-12 transition`}
      >
        <ul
          onMouseLeave={() => {
            setShowFonts(false);
          }}
          className="relative z-10 flex h-[152px] w-[183px] flex-col gap-[16px] rounded-[16px] bg-white p-[24px] text-[18px] font-bold leading-[24px] shadow-[0_4px_35px_2px_rgba(0,0,0,0.16)] transition dark:bg-[#1F1F1F] dark:shadow-[0_4px_30px_0px_rgba(164,69,237,1)]"
        >
          {Object.entries(fontNames).map(([key, value]) => (
            <li key={key}>
              <button
                onMouseEnter={() => {
                  setFontFamily(key as FontFamily);
                }}
                onMouseLeave={() => {
                  setFontFamily(temporalPincerFont);
                }}
                onClick={() => {
                  setFontFamily(key as FontFamily);
                  setTemporalPincerFont(key as FontFamily);
                  setShowFonts(false);
                  localStorage.setItem('fontFamily', key);
                }}
                type="button"
                className={`${fontFamilies[key as keyof typeof FontFamily]} text-left text-[#2D2D2D] transition hover:text-[#A445ED] dark:text-white dark:hover:text-[#A445ED]`}
                id={key}
                value={key}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
