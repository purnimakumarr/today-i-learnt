import { useId } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/** Speech bubble with a bite taken out of it ("tidbit") and a spark for the "did you know?" moment. */
function Logo({ className, size = 44 }: LogoProps) {
  const maskId = useId();

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <mask id={maskId}>
          <rect width="64" height="64" fill="#fff" />
          <circle cx="55" cy="8" r="9.5" fill="#000" />
          <circle cx="45" cy="5" r="5" fill="#000" />
          <circle cx="59" cy="18.5" r="5" fill="#000" />
          <path
            fill="#000"
            d="M30 16.5c.9 6.9 3.6 9.6 10.5 10.5-6.9.9-9.6 3.6-10.5 10.5-.9-6.9-3.6-9.6-10.5-10.5 6.9-.9 9.6-3.6 10.5-10.5z"
          />
          <circle cx="41.5" cy="37" r="2.2" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`} fill="currentColor">
        <rect x="5" y="8" width="52" height="41" rx="15" />
        <path d="M15 40 L10.5 57.5 L29 46 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default Logo;
