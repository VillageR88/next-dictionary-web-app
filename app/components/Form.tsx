import Image from 'next/image';
import imageSearch from '@/public/assets/images/icon-search.svg';

export default function Form() {
  return (
    <form className="w-full" action="">
      <label className="relative flex h-fit w-full items-center pt-[51.5px]">
        <input
          defaultValue={'keyboard'}
          aria-label="search"
          className="h-[64px] w-full rounded-[16px] bg-[#F4F4F4] py-[24px] pl-[24px] pr-[58px] text-[20px] font-bold text-[#2D2D2D] outline-none transition dark:bg-[#1F1F1F] dark:text-white"
          type="text"
        />
        <Image alt="" className="absolute right-[24px] size-fit" src={imageSearch as string} />
      </label>
    </form>
  );
}
