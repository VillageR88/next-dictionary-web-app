'use client';
import Image from 'next/image';
import Loader from './Loader';
import imageSearch from '@/public/assets/images/icon-search.svg';
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
      <label className="relative mt-[51.5px] flex h-fit w-full items-center">
        <input
          onChange={() => {
            setErrorEffects(false);
          }}
          placeholder={placeholder}
          ref={inputRef}
          name="search"
          defaultValue={'keyboard'}
          aria-label="search"
          className={`${showFonts ? '-z-10' : ''} ${errorEffects ? 'outline outline-2 outline-[#FF5252]' : 'outline-none focus:outline-[#A445ED]'} relative h-[64px] w-full rounded-[16px] bg-[#F4F4F4] py-[24px] pl-[24px] pr-[58px] text-[20px] font-bold text-[#2D2D2D] caret-[#A445ED] transition dark:bg-[#1F1F1F] dark:text-white`}
          type="text"
        />
        {pending ? (
          <div className="absolute right-[23px]">
            <Loader />
          </div>
        ) : (
          <Image alt="" className="absolute right-[24px] size-fit" src={imageSearch as string} />
        )}
      </label>

      {'word' in data && !error ? (
        <div ref={bottomDivRef} className="flex flex-col gap-[40px]">
          <div className="mt-[45px] flex size-full flex-col">
            <h1>{data.word}</h1>
            <p className="text-[24px] text-[#A445ED] dark:text-[#A445ED]">{data.phonetic}</p>
          </div>
          <ul className="flex flex-col gap-[40px]">
            {data.meanings?.map((meaning, index) => (
              <li key={index} className="flex flex-col gap-[40px]">
                <h2>{meaning.partOfSpeech}</h2>
                <div className="flex flex-col gap-[25px]">
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
            <div className="w-full border-t border-[#dbdada] transition dark:border-[#3A3A3A]"></div>
            <div className="flex items-baseline gap-[20px]">
              <h4>Source</h4>
              <ul>
                {data.sourceUrls?.map((link) => (
                  <li key={link}>
                    <Link
                      className="text-[14px] text-[#2D2D2D] underline transition dark:text-white"
                      prefetch
                      href={link}
                    >
                      {link}
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
