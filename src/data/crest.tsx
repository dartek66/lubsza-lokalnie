import React from 'react';

interface HerbProps {
  className?: string;
  size?: number;
}

export const HerbLubsza: React.FC<HerbProps> = ({ className = 'w-16 h-20', size }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={size ? { width: size, height: size * 1.25 } : undefined}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
        role="img"
        aria-label="Herb Gminy Lubsza"
      >
        <defs>
          <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="shieldGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
          <linearGradient id="shieldBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <filter id="herbGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Shield Base Shape */}
        <path
          d="M 20 20 H 180 V 130 C 180 185 100 225 100 225 C 100 225 20 185 20 130 Z"
          fill="url(#shieldGreen)"
          stroke="#B45309"
          strokeWidth="4"
          filter="url(#herbGlow)"
        />

        {/* Golden upper division / sun arc */}
        <path
          d="M 20 20 H 180 V 75 Q 100 110 20 75 Z"
          fill="url(#shieldGold)"
          stroke="#B45309"
          strokeWidth="2"
        />

        {/* River Smortawa / Odra blue wave */}
        <path
          d="M 22 75 Q 60 95 100 75 T 178 75 V 90 Q 140 110 100 90 T 22 90 Z"
          fill="url(#shieldBlue)"
          opacity="0.9"
        />

        {/* Stobrawskie Oak Leaf & Acorns (Symbol of Lasy Lubszańskie) */}
        {/* Central Golden/Green Oak Branch */}
        <g transform="translate(100, 140)">
          {/* Main Leaf */}
          <path
            d="M 0 -45 C 15 -40 25 -30 20 -20 C 30 -15 32 0 22 10 C 28 20 15 32 0 40 C -15 32 -28 20 -22 10 C -32 0 -30 -15 -20 -20 C -25 -30 -15 -40 0 -45 Z"
            fill="#FDE68A"
            stroke="#78350F"
            strokeWidth="2"
          />
          {/* Leaf Vein */}
          <path d="M 0 -40 L 0 35 M -12 -15 L 0 -5 M 12 -15 L 0 -5 M -14 8 L 0 15 M 14 8 L 0 15" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left Acorn */}
          <ellipse cx="-28" cy="22" rx="7" ry="10" fill="#B45309" transform="rotate(-25 -28 22)" stroke="#78350F" strokeWidth="1.5" />
          <path d="M -34 16 Q -28 12 -22 17" stroke="#78350F" strokeWidth="3" fill="none" />

          {/* Right Acorn */}
          <ellipse cx="28" cy="22" rx="7" ry="10" fill="#B45309" transform="rotate(25 28 22)" stroke="#78350F" strokeWidth="1.5" />
          <path d="M 22 17 Q 28 12 34 16" stroke="#78350F" strokeWidth="3" fill="none" />
        </g>

        {/* Golden Grain Ears (Rolnicze tradycje Lubszy) */}
        <g stroke="#92400E" strokeWidth="1.2" fill="#FDE68A">
          <ellipse cx="65" cy="45" rx="3.5" ry="7" transform="rotate(-30 65 45)" />
          <ellipse cx="75" cy="40" rx="3.5" ry="7" transform="rotate(-15 75 40)" />
          <ellipse cx="100" cy="38" rx="4" ry="8" />
          <ellipse cx="125" cy="40" rx="3.5" ry="7" transform="rotate(15 125 40)" />
          <ellipse cx="135" cy="45" rx="3.5" ry="7" transform="rotate(30 135 45)" />
        </g>

        {/* Shield Outer Gold Rim */}
        <path
          d="M 20 20 H 180 V 130 C 180 185 100 225 100 225 C 100 225 20 185 20 130 Z"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3.5"
        />
        {/* Crown/Header Band Accent */}
        <rect x="25" y="16" width="150" height="6" rx="3" fill="#D97706" />
      </svg>
    </div>
  );
};
