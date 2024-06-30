'use client';
import Image from 'next/image';
import Loader from './Loader';
import imageSearch from '@/public/assets/images/icon-search.svg';
import ButtonPlay from './ButtonPlay';
import { useFormState } from 'react-dom';
import { CreateInvoice } from '../_lib/functionsServer';
import { Word, ErrorWord } from '../_lib/interfaces';
import keyboardJson from '@/public/assets/keyboard.json';
import Link from 'next/link';
import { DataContext } from '../_lib/DataContext';
import { useRef, useContext, useState, useEffect } from 'react';
const sadSmiley = '😕';
const errorLine1 = 'No Definitions Found';
const errorLine2 =
  "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.";
const placeholder = 'Search for any word…';

const LineBreak = () => <div className="w-full border-t border-[#dbdada] transition dark:border-[#3A3A3A]"></div>;

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);
  const { showFonts, setShowFonts } = useContext(DataContext);
  const titleMeaning = 'Meaning';
  const titleSynonyms = 'Synonyms';
  const tittleError = 'Whoops, can’t be empty…';
  const [trackedNumber, setTrackedNumber] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorEffects, setErrorEffects] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [state, action] = useFormState<
    {
      number: number;
      search: string;
      jsonData: Word[] | ErrorWord;
    },
    FormData
  >((state, payload) => CreateInvoice(state, payload), {
    number: 0,
    search: 'keyboard',
    jsonData: keyboardJson as Word[] | ErrorWord,
  });
  let data;
  if ('message' in state.jsonData) {
    data = state.jsonData;
  } else {
    data = state.jsonData[0 as keyof typeof state.jsonData] as Word;
  }

  useEffect(() => {
    if ('phonetics' in data && data.phonetics) {
      let audioSource;
      for (const phonetic of data.phonetics) {
        if (phonetic.audio) {
          audioSource = new Audio(phonetic.audio);
        }
      }
      if (!audioSource) {
        setAudio(null);
        return;
      }
      setAudio(audioSource);
    }
  }, [data]);

  useEffect(() => {
    if (trackedNumber !== state.number) {
      setError(false);
      setTrackedNumber(state.number);
      setPending(false);
    }
  }, [state.number, trackedNumber]);

  return (
    <form
      onMouseEnter={() => {
        setShowFonts(false);
      }}
      ref={formRef}
      className="size-full"
      action={action}
      onSubmit={(e) => {
        e.preventDefault();

        if (!inputRef.current?.value) {
          setError(true);
          setErrorEffects(true);
          return;
        }
        if (!formRef.current) return;
        setPending(true);
        setErrorEffects(false);
        action(new FormData(formRef.current));
      }}
    >
      <label className="relative mt-[24px] flex h-fit w-full items-center md:mt-[51.5px]">
        <input
          onChange={() => {
            setErrorEffects(false);
          }}
          placeholder={placeholder}
          ref={inputRef}
          name="search"
          defaultValue={'keyboard'}
          aria-label="search"
          // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
          className={`${showFonts ? '-z-10' : ''} ${errorEffects ? 'outline outline-2 outline-[#FF5252]' : 'outline-none focus:outline-[#A445ED]'} relative h-[48px] w-full rounded-[16px] bg-[#F4F4F4] py-[24px] pl-[24px] pr-[58px] text-[16px] font-bold text-[#2D2D2D] placeholder-[#2D2D2D]/25 caret-[#A445ED] transition dark:bg-[#1F1F1F] dark:text-white dark:placeholder:text-white/25 md:h-[64px] md:text-[20px]`}
          type="text"
        />
        {pending ? (
          <div className="absolute right-[23px]">
            <Loader />
          </div>
        ) : (
          <Image alt="" className="pointer-events-none absolute right-[24px] size-fit" src={imageSearch as string} />
        )}
      </label>

      {'word' in data && !error ? (
        <div ref={bottomDivRef} className="mt-[23px] flex flex-col gap-[32px] md:mt-[45px] md:gap-[41px]">
          <div className="flex h-fit w-full items-center justify-between">
            <div className="flex size-fit flex-col justify-center">
              <h1>{data.word}</h1>
              <p className="mt-[4px] text-[18px] text-[#A445ED] dark:text-[#A445ED] md:text-[24px]">{data.phonetic}</p>
            </div>
            {audio && (
              <ButtonPlay
                play={() => {
                  void audio.play();
                }}
              />
            )}
          </div>
          <ul className="flex flex-col gap-[32px] md:gap-[40px]">
            {data.meanings?.map((meaning, index) => (
              <li key={index} className="flex flex-col gap-[30px] md:gap-[40px]">
                <div className="flex items-center gap-[25px] md:gap-[32px]">
                  <h2>{meaning.partOfSpeech}</h2>
                  <LineBreak />
                </div>
                <div className="flex flex-col gap-[17px] md:gap-[25px]">
                  <h3>{titleMeaning}</h3>
                  <ul className="flex flex-col gap-[13px]">
                    {meaning.definitions?.map((definition, index) => (
                      <li className="dotted" key={index}>
                        <p>{definition.definition}</p>
                        {definition.example && (
                          <p className="mt-[13px] text-[#757575] dark:text-[#757575]">“{definition.example}”</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <div className="flex items-baseline gap-[22px]">
                    <h3>{titleSynonyms}</h3>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {meaning.synonyms.map((synonym, index) => (
                        <li key={index} className="flex items-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (!inputRef.current) return;
                              inputRef.current.value = synonym;
                              if (!formRef.current) return;
                              action(new FormData(formRef.current));
                              setPending(true);
                            }}
                          >
                            <p className="synonym">{synonym}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-[19px]">
            <LineBreak />
            <div className="flex flex-col items-baseline gap-[2px] md:flex-row md:gap-[20px]">
              <h4>Source</h4>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                {data.sourceUrls?.map((link) => (
                  <li key={link}>
                    <Link
                      className="flex items-center gap-[9px] text-[14px] text-[#2D2D2D] underline transition dark:text-white"
                      prefetch
                      href={link}
                    >
                      <span>{link}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                        <path
                          fill="none"
                          stroke="#838383"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        !error && (
          <div className="mt-[132px] flex w-full flex-col items-center text-center">
            <span className="font-roboto text-[64px]">{sadSmiley}</span>
            <span className="mt-[40px] text-[20px] font-bold text-[#2D2D2D] transition dark:text-white">
              {errorLine1}
            </span>
            <span className="mt-[24px] text-[18px] leading-[24px] text-[#757575]">{errorLine2}</span>
          </div>
        )
      )}
      {error && errorEffects && (
        <div className="mt-[8px] w-full">
          <span className="text-[20px] text-[#FF5252]">{tittleError}</span>
        </div>
      )}
    </form>
  );
}
