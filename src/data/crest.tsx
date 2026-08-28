import React from 'react';
import herbImage from '../assets/images/herb_lubszy_1787913443425.jpg';

interface HerbProps {
  className?: string;
  size?: number;
  alt?: string;
  withBorder?: boolean;
}

export const HerbLubsza: React.FC<HerbProps> = ({ 
  className = 'w-16 h-16', 
  size,
  alt = 'Herb',
  withBorder = true
}) => {
  return (
    <div 
      className={`relative inline-block select-none shrink-0 overflow-hidden leading-none ${
        withBorder ? 'border border-amber-500/40 rounded-2xl shadow-lg hover:border-amber-400/80 transition-all duration-300' : 'rounded-2xl'
      } ${className}`} 
      style={size ? { width: size, height: size } : undefined}
      title="Herb"
    >
      <img
        src={herbImage}
        alt={alt}
        className="w-full h-full object-cover block"
        loading="eager"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
