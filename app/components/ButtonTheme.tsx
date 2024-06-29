'use client';

import { useEffect, useState, useRef } from 'react';

enum Theme {
  dark = 'dark',
  light = 'light',
}

export default function ButtonTheme() {
  const ref = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (theme === null) {
      const value = localStorage.getItem('theme');
      if (value === Theme.dark || value === Theme.light) setTheme(value as Theme);
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        setTheme(Theme.dark);
      } else {
        setTheme(Theme.light);
      }
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== null) {
      if (theme === Theme.dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', Theme.dark);
        setTheme(Theme.dark);
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', Theme.light);
        setTheme(Theme.light);
      }
    }
  }, [theme]);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('hidden');
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <div className="flex h-[32px] items-center gap-[20px] pl-[26px]">
      <button
        type="button"
        title="Toggle Theme"
        ref={ref}
        onClick={() => {
          theme === Theme.dark ? setTheme(Theme.light) : setTheme(Theme.dark);
        }}
        className="group/buttonTheme flex h-[20px] items-center gap-[16px] fill-white transition"
      >
        <div className="flex h-[20px] w-[40px] items-center justify-center rounded-[10px] bg-[#757575] transition group-hover/buttonTheme:bg-[#A445ED] dark:bg-[#A445ED]">
          <div className="size-[14px] -translate-x-2.5 rounded-full bg-white transition dark:translate-x-2.5"></div>
        </div>
      </button>
      <svg
        className="size-[20px] stroke-[#757575] transition dark:stroke-[#A445ED] md:size-[24px]"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <path
          className=""
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
        />
      </svg>
    </div>
  );
}
