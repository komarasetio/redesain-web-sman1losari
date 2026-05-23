import React from 'react';

interface Sman1LosariLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  primaryColor?: string;
  accentColor?: string;
}

export default function Sman1LosariLogo({ 
  className = '', 
  size = 'md',
  primaryColor = '#0F172A',
  accentColor = '#F59E0B'
}: Sman1LosariLogoProps) {
  // Determine pixel sizes based on prop
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24'
  };

  const selectedSize = sizeMap[size];

  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 ${selectedSize} ${className}`} id="sman-losari-logo-container">
      {/* Intricately detailed SVG representing the SMAN 1 Losari school crest */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-md hover:scale-105 hover:rotate-6 transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Pentagon (Segi Lima) with subtle rounded joints representing Indonesian national education foundation */}
        <polygon 
          points="50,4 95,36 78,92 22,92 5,36" 
          fill={primaryColor} 
          stroke={accentColor} 
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner thin accent outline */}
        <polygon 
          points="50,9 90,39 74,87 26,87 10,39" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Golden Laurel Wreath (Rice and Cotton / Daung Padi & Kapas) flanking the left and right sides */}
        {/* Left branch */}
        <path 
          d="M 22,75 C 16,60 16,45 25,35 M 20,68 C 17,62 17,54 22,48 M 20,53 C 18,48 20,43 23,39" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          opacity="0.8"
        />
        {/* Right branch */}
        <path 
          d="M 78,75 C 84,60 84,45 75,35 M 80,68 C 83,62 83,54 78,48 M 80,53 C 82,48 80,43 77,39" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          opacity="0.8"
        />

        {/* 5-Pointed Star (Bintang) at the top of the pentagon */}
        <polygon 
          points="50,14 53,22 61,22 55,27 57,35 50,30 43,35 45,27 39,22 47,22" 
          fill={accentColor} 
        />

        {/* Waves representing Losari's geography, situated on the border of West Java & Central Java along the Cisanggarung Coast */}
        <path 
          d="M 32,80 Q 41,77 50,80 T 68,80" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          opacity="0.70"
        />
        <path 
          d="M 35,84 Q 42.5,82 50,84 T 65,84" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          opacity="0.55"
        />

        {/* Open Book (Buku Terbuka) at the bottom portion, representing endless Knowledge */}
        <path 
          d="M 28,68 C 36,65 44,68 50,71 C 56,68 64,65 72,68 C 72,55 72,53 72,53 C 64,50 56,53 50,56 C 44,53 36,50 28,53 Z" 
          fill="#FFFFFF" 
          stroke={accentColor} 
          strokeWidth="1.2" 
          strokeLinejoin="round"
        />
        <line x1="50" y1="56" x2="50" y2="71" stroke={accentColor} strokeWidth="1.2" />

        {/* The Torch of Education (Obor) rising from the book */}
        {/* Torch Handle & Base */}
        <path 
          d="M 47,60 L 53,60 L 52,51 L 48,51 Z" 
          fill="#D1D5DB" 
          stroke={accentColor} 
          strokeWidth="1"
        />
        <path 
          d="M 45,51 C 45,49 55,49 55,51 Z" 
          fill={accentColor}
        />
        {/* Flame (Gradient of wisdom flame) */}
        <path 
          d="M 50,33 C 55,39 56,47 52,49 C 48,50 49,43 47,44 C 45,45 44,48 45,49 C 43,47 44,41 46,38 C 48,34 50,33 50,33 Z"
          fill="#EF4444" 
          className="animate-pulse"
        />
        <path 
          d="M 50,39 C 52,42 53,46 51,47 C 49,48 49.5,44 48.5,45 C 47.5,46 47,47 47.5,48 C 46.5,47 47,43 48,41 C 49,39 50,39 50,39 Z"
          fill="#F59E0B"
        />
        
        {/* Mini crest brand accent initials */}
        <text 
          x="50" 
          y="77" 
          fill="#FFFFFF" 
          fontSize="5" 
          fontWeight="black" 
          fontFamily="monospace" 
          textAnchor="middle" 
          opacity="0.8"
        >
          S1L
        </text>
      </svg>
    </div>
  );
}
