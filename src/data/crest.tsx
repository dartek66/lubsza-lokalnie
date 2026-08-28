import React from 'react';
import herbImage from '../assets/images/herb_lubszy_1787913443425.jpg';

interface HerbProps {
  className?: string;
  size?: number;
  alt?: string;
}

export const HerbLubsza: React.FC<HerbProps> = ({ 
  className = 'w-16 h-16', 
  size,
  alt = 'Herb Gminy Lubsza'
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`} 
      style={size ? { width: size, height: size } : undefined}
      title="Herb Gminy Lubsza"
    >
      <img
        src={herbImage}
        alt={alt}
        className="w-full h-full object-contain rounded-2xl drop-shadow-md hover:scale-105 transition-transform duration-300"
        loading="eager"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
