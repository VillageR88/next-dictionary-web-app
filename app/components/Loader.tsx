'use client';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <RotatingLines
      visible={true}
      width="20"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      strokeColor="#A445ED"
    />
  );
}
