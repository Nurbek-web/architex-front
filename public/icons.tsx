export function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export function LogoIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <defs>
        <style>
          {`.cls-1 {
              fill: none;
              stroke: #000;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 2px;
            }`}
        </style>
      </defs>
      <title>ruler</title>
      <polygon
        className="cls-1"
        points="14 34 14 14 4 4 4 44 44 44 34 34 14 34"
      />
      <line className="cls-1" x1="36" y1="43" x2="36" y2="44" />
      <line className="cls-1" x1="8" y1="43" x2="8" y2="44" />
      <line className="cls-1" x1="12" y1="43" x2="12" y2="44" />
      <line className="cls-1" x1="16" y1="43" x2="16" y2="44" />
      <line className="cls-1" x1="20" y1="43" x2="20" y2="44" />
      <line className="cls-1" x1="24" y1="43" x2="24" y2="44" />
      <line className="cls-1" x1="28" y1="43" x2="28" y2="44" />
      <line className="cls-1" x1="32" y1="43" x2="32" y2="44" />
      <line className="cls-1" x1="5" y1="12" x2="4" y2="12" />
      <line className="cls-1" x1="5" y1="40" x2="4" y2="40" />
      <line className="cls-1" x1="5" y1="36" x2="4" y2="36" />
      <line className="cls-1" x1="5" y1="32" x2="4" y2="32" />
      <line className="cls-1" x1="5" y1="28" x2="4" y2="28" />
      <line className="cls-1" x1="5" y1="24" x2="4" y2="24" />
      <line className="cls-1" x1="5" y1="20" x2="4" y2="20" />
      <line className="cls-1" x1="5" y1="16" x2="4" y2="16" />
      <rect className="cls-1" x="-10" y="-10" width="680" height="680" />
    </svg>
  );
}
