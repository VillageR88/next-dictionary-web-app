export default function ButtonPlay({ play }: { play: () => void }) {
  return (
    <button onClick={play} className="group/buttonPlay fill-[#A445ED]" type="button" title="play" aria-label="play">
      <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
        <g fillRule="evenodd">
          <circle className="opacity-25 transition group-hover/buttonPlay:opacity-100" cx="37.5" cy="37.5" r="37.5" />
          <path className="fill-[#A445ED] transition group-hover/buttonPlay:fill-white" d="M29 27v21l21-10.5z" />
        </g>
      </svg>
    </button>
  );
}
