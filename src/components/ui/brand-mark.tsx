export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-mark">
      <svg
        aria-hidden="true"
        className="brand-mark__icon"
        viewBox="0 0 140 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="absolute-gradient" x1="10" y1="20" x2="120" y2="80">
            <stop stopColor="#9EA8FF" />
            <stop offset="0.4" stopColor="#6A63FF" />
            <stop offset="1" stopColor="#44D0FF" />
          </linearGradient>
        </defs>
        <path
          d="M23.5 48c8.9-14.2 18.4-21.3 28.5-21.3 11.3 0 20.8 8.4 28.6 25.3 7.7 16.8 17 25.2 27.9 25.2 8.1 0 14.5-3.9 19.3-11.8"
          stroke="url(#absolute-gradient)"
          strokeLinecap="round"
          strokeWidth="14"
        />
        <path
          d="M116.5 48c-8.9 14.2-18.4 21.3-28.5 21.3-11.3 0-20.8-8.4-28.6-25.3C51.7 27.2 42.4 18.8 31.5 18.8c-8.1 0-14.5 3.9-19.3 11.8"
          stroke="url(#absolute-gradient)"
          strokeLinecap="round"
          strokeWidth="14"
        />
        <path
          d="m86 32 4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z"
          fill="#F2F5FF"
          opacity="0.95"
        />
      </svg>
      {!compact ? <span className="brand-mark__text">ABSOLUTE</span> : null}
    </div>
  );
}

