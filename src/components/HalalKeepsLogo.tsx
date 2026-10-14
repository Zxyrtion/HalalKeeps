import React from 'react';

interface HalalKeepsLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const HalalKeepsLogo: React.FC<HalalKeepsLogoProps> = ({
  className = '',
  size = 44,
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Circular Halal Keeps Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-[1.02]"
        aria-label="Halal Keeps official logo"
      >
        <defs>
          {/* Metallic Emerald Radial & Linear Gradients matching official asset */}
          <linearGradient id="emeraldMetallic" x1="50" y1="50" x2="450" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="35%" stopColor="#10B981" />
            <stop offset="70%" stopColor="#065F46" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>

          <linearGradient id="emeraldRing" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="25%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="75%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>

          <filter id="subtleShadow" x="-5%" y="-5%" width="110%" height="110%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Outer Metallic Ring */}
        <circle
          cx="250"
          cy="250"
          r="238"
          stroke="url(#emeraldRing)"
          strokeWidth="14"
          fill="#FFFFFF"
          filter="url(#subtleShadow)"
        />

        {/* Inner Subtle Ring */}
        <circle
          cx="250"
          cy="250"
          r="230"
          stroke="#064E3B"
          strokeWidth="2"
          strokeOpacity="0.2"
          fill="none"
        />

        {/* Crescent Moon Wrapping Around Left */}
        <path
          d="M 230,132 
             C 145,132 80,185 80,265 
             C 80,350 150,420 250,420 
             C 285,420 318,408 340,390 
             C 345,386 343,378 337,378 
             C 310,380 270,370 240,345 
             C 170,285 175,200 245,145 
             C 250,141 247,133 241,133 
             C 237,133 234,132 230,132 Z"
          fill="url(#emeraldMetallic)"
        />

        {/* Canopy / Storefront Inside the Crescent */}
        <g id="storefront" transform="translate(138, 160)">
          {/* Scalloped Awning Roof */}
          <path
            d="M 22,50 
               L 118,50 
               C 125,50 132,44 130,36 
               L 122,12 
               C 120,4 114,0 106,0 
               L 34,0 
               C 26,0 20,4 18,12 
               L 10,36 
               C 8,44 15,50 22,50 Z"
            fill="url(#emeraldMetallic)"
          />
          {/* Awning Scallops */}
          <path
            d="M 12,50 
               C 12,60 27,60 27,50
               C 27,60 42,60 42,50
               C 42,60 57,60 57,50
               C 57,60 72,60 72,50
               C 72,60 87,60 87,50
               C 87,60 102,60 102,50
               C 102,60 117,60 117,50
               C 117,60 128,60 128,50"
            fill="url(#emeraldMetallic)"
          />

          {/* Pillars / Building Walls */}
          <path
            d="M 22,55 L 22,145 C 22,150 27,155 33,155 L 40,155 C 46,155 50,150 50,145 L 50,65 C 50,60 45,55 40,55 Z"
            fill="url(#emeraldMetallic)"
          />
          <path
            d="M 90,55 L 90,145 C 90,150 94,155 100,155 L 107,155 C 113,155 118,150 118,145 L 118,55 Z"
            fill="url(#emeraldMetallic)"
          />

          {/* Checkmark inside Entrance Door */}
          <path
            d="M 38,105 
               C 38,92 48,82 60,82 
               C 72,82 82,92 82,105 
               L 82,155 
               L 38,155 Z"
            fill="#FFFFFF"
            stroke="url(#emeraldMetallic)"
            strokeWidth="12"
          />
          {/* Bold Checkmark */}
          <path
            d="M 50,122 
               L 62,135 
               L 110,80"
            stroke="url(#emeraldMetallic)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* "Halal Keeps" Lettering matching the circular badge typography */}
        <text
          x="272"
          y="235"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="56"
          fontWeight="800"
          letterSpacing="-1.5"
          fill="url(#emeraldMetallic)"
        >
          Halal
        </text>
        <text
          x="272"
          y="298"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="56"
          fontWeight="800"
          letterSpacing="-1.5"
          fill="url(#emeraldMetallic)"
        >
          Keeps
        </text>
      </svg>

      {/* Brand title text alongside logo for the header bar */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-extrabold tracking-tight text-neutral-900 group-hover:text-emerald-950">
              Halal Keeps
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              HaCeRa
            </span>
          </div>
          <span className="text-[11px] font-medium text-neutral-500 leading-tight">
            Readiness Assessment
          </span>
        </div>
      )}
    </div>
  );
};
