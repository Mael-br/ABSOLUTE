type IconProps = {
  className?: string;
};

export function BoltIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BotIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="8" width="16" height="10" rx="4" />
      <path d="M12 4v4M8 13h.01M16 13h.01M7 18v2M17 18v2M4 12H2M22 12h-2" strokeLinecap="round" />
    </svg>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DatabaseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 5 6v6c0 4.2 2.6 8 7 9 4.4-1 7-4.8 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.4-3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SupportIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 14H4a2 2 0 0 1-2-2v-1a10 10 0 0 1 20 0v1a2 2 0 0 1-2 2h-2" />
      <path d="M8 18c1.2.8 2.5 1.2 4 1.2S14.8 18.8 16 18" strokeLinecap="round" />
      <rect x="5" y="13" width="4" height="6" rx="2" />
      <rect x="15" y="13" width="4" height="6" rx="2" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

