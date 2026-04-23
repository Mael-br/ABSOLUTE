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

export function UserIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
    </svg>
  );
}

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M8.6 7.5A15 15 0 0 1 12 7c1.2 0 2.4.2 3.4.5m-6.8 0A11.8 11.8 0 0 0 6 17.3c1.7 1.2 3.8 1.7 6 1.7s4.3-.5 6-1.7a11.8 11.8 0 0 0-2.6-9.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 14h.01M14.5 14h.01" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17c1 .7 2 .9 3 .9s2-.2 3-.9" strokeLinecap="round" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m21 4-8.5 16-2.7-6.7L3 10.6 21 4Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m21 4-11.2 9.3" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M16.9 7.2h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 10v7M7 7h.01M12 17v-4.2c0-1.5 1.2-2.8 2.8-2.8s2.2 1.1 2.2 2.6V17" strokeLinecap="round" />
      <path d="M12 10v1" strokeLinecap="round" />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path
        d="M9 18c-3.4 1-3.4-1.9-4.8-2.4M19 18v-2.9a3.6 3.6 0 0 0-1-2.6c3.3-.4 5-1.8 5-5.3a4.1 4.1 0 0 0-1.1-2.8 3.8 3.8 0 0 0-.1-2.8s-1-.3-3.1 1.1a10.9 10.9 0 0 0-5.7 0C10.9 1.3 10 1.6 10 1.6a3.8 3.8 0 0 0-.1 2.8 4.1 4.1 0 0 0-1.1 2.8c0 3.5 1.7 4.9 5 5.3a3.2 3.2 0 0 0-.9 2.5V18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M6.8 4h2.4l1.4 4-1.8 1.8a15.4 15.4 0 0 0 5.4 5.4L16 13.4l4 1.4v2.4a1.9 1.9 0 0 1-2.1 1.9A16.8 16.8 0 0 1 5 6.1 1.9 1.9 0 0 1 6.8 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

