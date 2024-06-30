import Image from 'next/image';
import logo from '@/public/assets/images/logo.svg';
import ButtonTheme from './ButtonTheme';
import ButtonFont from './ButtonFont';

export default function Navbar() {
  return (
    <nav className="flex h-fit w-full justify-between">
      <Image
        className="h-[32px] w-[28.05px] md:h-[36.5px] md:w-[32px]"
        width={34}
        height={38}
        src={logo as string}
        alt="logo"
      />
      <div className="flex items-center divide-x divide-[#bbb9b9]">
        <ButtonFont />
        <ButtonTheme />
      </div>
    </nav>
  );
}
