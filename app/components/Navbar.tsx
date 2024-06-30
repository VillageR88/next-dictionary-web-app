import Image from 'next/image';
import logo from '@/public/assets/images/logo.svg';
import ButtonTheme from './ButtonTheme';
import ButtonFont from './ButtonFont';

export default function Navbar() {
  return (
    <nav className="flex h-fit w-full justify-between">
      <Image src={logo as string} alt="logo" />
      <div className="flex items-center divide-x divide-[#bbb9b9]">
        <ButtonFont />
        <ButtonTheme />
      </div>
    </nav>
  );
}
