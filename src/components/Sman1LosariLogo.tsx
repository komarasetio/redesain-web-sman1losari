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
  const [customLogo, setCustomLogo] = React.useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('sman1losari_custom_logo');
  });

  React.useEffect(() => {
    const handleCheck = () => {
      setCustomLogo(localStorage.getItem('sman1losari_custom_logo'));
    };
    
    window.addEventListener('sman1losari_logo_changed', handleCheck);
    window.addEventListener('storage', handleCheck);
    
    return () => {
      window.removeEventListener('sman1losari_logo_changed', handleCheck);
      window.removeEventListener('storage', handleCheck);
    };
  }, []);

  // Determine pixel sizes based on prop
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24'
  };

  const selectedSize = sizeMap[size];

  if (customLogo) {
    return (
      <div 
        className={`relative flex items-center justify-center shrink-0 select-none ${selectedSize} ${className}`} 
        id="sman-losari-logo-container"
      >
        <img 
          src={customLogo} 
          alt="SMAN 1 Losari Logo" 
          className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 rounded-full bg-white border border-slate-200 p-0.5" 
        />
      </div>
    );
  }

  // Helper code to generate the 16-sided polygon points
  const getPolyPoints = (center: number, radius: number, sides: number) => {
    return Array.from({ length: sides }, (_, i) => {
      // Offset by Math.PI / 2 to place a sharp pointed vertex exactly at 12 o'clock top, 3 o'clock, 6 o'clock, 9 o'clock
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const polygonPoints = getPolyPoints(250, 250, 16);

  // Generate left brick masonry patterns inside the left Candi Bentar gate
  const leftBricks = [];
  for (let r = 0; r < 26; r++) {
    const lineY = 130 + r * 7.2;
    leftBricks.push(
      <line 
        key={`lh-${r}`} 
        x1="70" 
        y1={lineY} 
        x2="225" 
        y2={lineY} 
        stroke="#1A0F0D" 
        strokeWidth="0.8" 
      />
    );
    const isEven = r % 2 === 0;
    const startX = isEven ? 75 : 82;
    for (let x = startX; x < 215; x += 14) {
      leftBricks.push(
        <line 
          key={`lv-${r}-${x}`} 
          x1={x} 
          y1={lineY} 
          x2={x} 
          y2={lineY + 7.2} 
          stroke="#1A0F0D" 
          strokeWidth="0.8" 
        />
      );
    }
  }

  // Generate right brick masonry patterns inside the right Candi Bentar gate
  const rightBricks = [];
  for (let r = 0; r < 26; r++) {
    const lineY = 130 + r * 7.2;
    rightBricks.push(
      <line 
        key={`rh-${r}`} 
        x1="275" 
        y1={lineY} 
        x2="430" 
        y2={lineY} 
        stroke="#1A0F0D" 
        strokeWidth="0.8" 
      />
    );
    const isEven = r % 2 === 0;
    const startX = isEven ? 285 : 292;
    for (let x = startX; x < 425; x += 14) {
      rightBricks.push(
        <line 
          key={`rv-${r}-${x}`} 
          x1={x} 
          y1={lineY} 
          x2={x} 
          y2={lineY + 7.2} 
          stroke="#1A0F0D" 
          strokeWidth="0.8" 
        />
      );
    }
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${selectedSize} ${className}`} id="sman-losari-logo-container">
      {/* Exquisitely complete, high-precision official SVG of SMA Negeri 1 Losari crest */}
      <svg 
        id="sman-1-losari-logo-svg"
        viewBox="0 0 500 500" 
        className="w-full h-full drop-shadow-md hover:scale-105 hover:rotate-3 transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#D8DBE0" />
            <stop offset="100%" stopColor="#7E8B9B" />
          </linearGradient>
          
          {/* Inner circle mask clip to ensure gates, sea, star don't leak out */}
          <clipPath id="innerOuterCircleClip">
            <circle cx="250" cy="250" r="168" />
          </clipPath>
          
          <clipPath id="leftGateClip">
            <path d="M 80,315 L 216,315 L 216,130 L 196,130 L 196,155 L 180,155 L 180,185 L 160,185 L 160,215 L 140,215 L 140,245 L 120,245 L 120,275 L 100,275 L 100,305 L 80,305 Z" />
          </clipPath>
          
          <clipPath id="rightGateClip">
            <path d="M 420,315 L 284,315 L 284,130 L 304,130 L 304,155 L 320,155 L 320,185 L 340,185 L 340,215 L 360,215 L 360,245 L 380,245 L 380,275 L 400,275 L 400,305 L 420,305 Z" />
          </clipPath>
          
          {/* Symmetrical left-to-right clockwise arc representing the upper school branding ring */}
          <path id="curveTop" d="M 72,250 A 178,178 0 0,1 428,250" fill="none" />
          {/* Symmetrical right-to-left clockwise arc representing the lower school location ring */}
          <path id="curveBottom" d="M 428,250 A 178,178 0 0,1 72,250" fill="none" />
        </defs>
        
        {/* Outer 16-sided polygon boundary with crisp outline */}
        <polygon 
          points={polygonPoints} 
          fill="#FFFFFF" 
          stroke="#1A0F0D" 
          strokeWidth="3.2" 
          strokeLinejoin="round" 
        />
        
        {/* Outer concentric details */}
        <circle cx="250" cy="250" r="236" fill="none" stroke="#1A0F0D" strokeWidth="1" />
        <circle cx="250" cy="250" r="231" fill="none" stroke="#1A0F0D" strokeWidth="2.2" />
        
        {/* Inner concentric core rings */}
        <circle cx="250" cy="250" r="172" fill="none" stroke="#1A0F0D" strokeWidth="2.2" />
        <circle cx="250" cy="250" r="168" fill="none" stroke="#1A0F0D" strokeWidth="0.8" />
        
        {/* Curved Bold Academic Typography - Upper Circle: SMA NEGERI 1 LOSARI */}
        <text 
          className="select-none fill-neutral-900" 
          style={{ 
            fontSize: '22px', 
            fontFamily: '"Times New Roman", Times, Georgia, "PT Serif", serif', 
            fontWeight: '900',
            letterSpacing: '1.8px'
          }}
        >
          <textPath href="#curveTop" startOffset="50%" textAnchor="middle">
            SMA NEGERI 1 LOSARI
          </textPath>
        </text>
        
        {/* Curved Bold Academic Typography - Lower Circle: KABUPATEN CIREBON */}
        <text 
          className="select-none fill-neutral-900" 
          style={{ 
            fontSize: '22px', 
            fontFamily: '"Times New Roman", Times, Georgia, "PT Serif", serif', 
            fontWeight: '900',
            letterSpacing: '1.2px'
          }}
        >
          <textPath href="#curveBottom" startOffset="50%" textAnchor="middle">
            KABUPATEN CIREBON
          </textPath>
        </text>
        
        {/* Outer separator decorative blue circular beads flanked left and right */}
        <circle cx="53" cy="250" r="10" fill="#0072CE" stroke="#1A0F0D" strokeWidth="2" />
        <circle cx="447" cy="250" r="10" fill="#0072CE" stroke="#1A0F0D" strokeWidth="2" />
  
        {/* Heraldic school crest core masked perfectly to client view limits */}
        <g clipPath="url(#innerOuterCircleClip)">
          {/* Inner Crest White Shield */}
          <rect x="0" y="0" width="500" height="500" fill="#FFFFFF" />
          
          {/* Blue Sea of Java (representing coastal boundary of Losari, Cirebon) */}
          <rect x="0" y="300" width="500" height="200" fill="#0072CE" />
          <line x1="82" y1="300" x2="418" y2="300" stroke="#1A0F0D" strokeWidth="2" />
          
          {/* Left Terracotta Candi Bentar Gate */}
          <g clipPath="url(#leftGateClip)">
            <rect x="50" y="110" width="200" height="240" fill="#D24C38" />
            {leftBricks}
          </g>
          {/* Outline Left Gate */}
          <path 
            d="M 80,315 L 216,315 L 216,130 L 196,130 L 196,155 L 180,155 L 180,185 L 160,185 L 160,215 L 140,215 L 140,245 L 120,245 L 120,275 L 100,275 L 100,305 L 80,305 Z" 
            fill="none" 
            stroke="#1A0F0D" 
            strokeWidth="1.8" 
          />
  
          {/* Right Terracotta Candi Bentar Gate */}
          <g clipPath="url(#rightGateClip)">
            <rect x="250" y="110" width="200" height="240" fill="#D24C38" />
            {rightBricks}
          </g>
          {/* Outline Right Gate */}
          <path 
            d="M 420,315 L 284,315 L 284,130 L 304,130 L 304,155 L 320,155 L 320,185 L 340,185 L 340,215 L 360,215 L 360,245 L 380,245 L 380,275 L 400,275 L 400,305 L 420,305 Z" 
            fill="none" 
            stroke="#1A0F0D" 
            strokeWidth="1.8" 
          />
  
          {/* Central Stacked Stem of Onion Bulb */}
          <path 
            d="M 248,220 
               C 241,215 241,202 248,195 
               C 243,190 243,180 248,175 
               L 250,140 
               L 252,175 
               C 257,180 257,190 252,195 
               C 259,202 259,215 252,220 Z" 
            fill="#9B1D21" 
            stroke="#1A0F0D" 
            strokeWidth="1.5" 
          />
          {/* Stem white vertical inner stripes */}
          <path d="M 250,220 L 250,140" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
          <path d="M 249,195 C 246,192 246,183 249,178" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M 251,195 C 254,192 254,183 251,178" fill="none" stroke="#FFFFFF" strokeWidth="1" />
  
          {/* Iconic Red Onion (Bawang Merah) bulb structure - Losari Cirebon pride agriculture */}
          <path 
            d="M 250,312 C 218,312 208,285 215,263 C 222,241 245,225 248,212 L 252,212 C 255,225 278,241 285,263 C 292,285 282,312 250,312 Z" 
            fill="#9B1D21" 
            stroke="#1A0F0D" 
            strokeWidth="1.8" 
          />
          {/* Light white & red skin layering stripes inside the bulb to match logo exactly */}
          <path d="M 250,312 C 226,312 216,288 221,267 C 228,246 246,230 248,212" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          <path d="M 250,312 C 274,312 284,288 279,267 C 272,246 254,230 252,212" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          
          <path d="M 250,312 C 235,312 227,292 232,273 C 238,252 247,236 249,212" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M 250,312 C 265,312 273,292 268,273 C 262,252 253,236 251,212" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          
          <path d="M 249,312 L 249,212" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
          <path d="M 251,312 L 251,212" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
  
          {/* Roots or hair of the bulb at the bottom meeting the open book */}
          <path d="M 245,312 C 245,317 248,321 250,321 C 252,321 255,317 255,312 Z" fill="#222222" stroke="#1A0F0D" strokeWidth="0.8" />
  
          {/* Flanking silver Fish (Left: Ikan Bandeng) */}
          <path d="M 160,246 L 145,233 C 144,239 145,246 153,252 L 146,261 Z" fill="#64748B" stroke="#1A0F0D" strokeWidth="1" />
          <path 
            d="M 158,248 C 150,266 165,288 188,295 C 199,299 210,301 221,301 C 217,296 206,290 200,283 C 187,266 173,254 158,248 Z" 
            fill="url(#silverGradient)" 
            stroke="#1A0F0D" 
            strokeWidth="1.5" 
          />
          <path d="M 172,255 C 170,248 178,251 183,257" fill="#475569" stroke="#1A0F0D" strokeWidth="0.8" />
          <path d="M 194,293 C 192,300 197,298 201,295" fill="#475569" stroke="#1A0F0D" strokeWidth="0.8" />
          <circle cx="213" cy="296" r="2.2" fill="#FFFFFF" stroke="#1A0F0D" strokeWidth="0.8" />
          <circle cx="214" cy="296" r="1" fill="#000000" />
          <path d="M 207,291 C 204,293 202,296 203,299" fill="none" stroke="#475569" strokeWidth="1" />
  
          {/* Flanking silver Fish (Right: Ikan Bandeng) */}
          <path d="M 340,246 L 355,233 C 356,239 355,246 347,252 L 354,261 Z" fill="#64748B" stroke="#1A0F0D" strokeWidth="1" />
          <path 
            d="M 342,248 C 350,266 335,288 312,295 C 301,299 290,301 279,301 C 283,296 294,290 300,283 C 313,266 327,254 342,248 Z" 
            fill="url(#silverGradient)" 
            stroke="#1A0F0D" 
            strokeWidth="1.5" 
          />
          <path d="M 328,255 C 330,248 322,251 317,257" fill="#475569" stroke="#1A0F0D" strokeWidth="0.8" />
          <path d="M 306,293 C 308,300 303,298 299,295" fill="#475569" stroke="#1A0F0D" strokeWidth="0.8" />
          <circle cx="287" cy="296" r="2.2" fill="#FFFFFF" stroke="#1A0F0D" strokeWidth="0.8" />
          <circle cx="286" cy="296" r="1" fill="#000000" />
          <path d="M 293,291 C 296,293 298,296 297,299" fill="none" stroke="#475569" strokeWidth="1" />
  
          {/* Open Book laying on the water surface */}
          <g>
            {/* Book spine & outer leather binding */}
            <path 
              d="M 172,308 C 210,297 235,299 250,310 C 265,299 290,297 328,308 L 328,336 C 290,325 265,327 250,338 C 235,327 210,325 172,336 Z" 
              fill="#1A0F0D" 
              stroke="#1A0F0D" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
            {/* Inner layered book blocks for thickness */}
            <path 
              d="M 174,306 C 210,295 235,297 250,308 C 265,297 290,295 326,306 L 326,332 C 290,321 265,323 250,334 C 235,323 210,321 174,332 Z" 
              fill="#F8FAFC" 
              stroke="#1A0F0D" 
              strokeWidth="1.2" 
              strokeLinejoin="round" 
            />
            {/* White top pages layer */}
            <path 
              d="M 176,304 C 210,293 235,295 250,306 C 265,295 290,293 324,304 L 324,328 C 290,317 265,319 250,330 C 235,319 210,317 176,328 Z" 
              fill="#FFFFFF" 
              stroke="#1A0F0D" 
              strokeWidth="1.2" 
              strokeLinejoin="round" 
            />
            <line x1="250" y1="306" x2="250" y2="330" stroke="#1A0F0D" strokeWidth="1.5" />
            
            {/* Simulated scriptures/learnings on both left & right fanned pages */}
            <path d="M 188,310 Q 212,303 236,308" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
            <path d="M 188,315 Q 212,308 236,313" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
            <path d="M 188,320 Q 212,313 236,318" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
            
            <path d="M 264,308 Q 288,303 312,310" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
            <path d="M 264,313 Q 288,308 312,315" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
            <path d="M 264,318 Q 288,313 312,320" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
          </g>
  
          {/* Crowning blue 5-pointed education star (Bintang) on top of central pillar stem */}
          <polygon 
            points="250,118 255,128 266,129 258,136 261,147 250,141 239,147 242,136 234,129 245,128" 
            fill="#009BF5" 
            stroke="#1A0F0D" 
            strokeWidth="1.5" 
          />
        </g>
      </svg>
    </div>
  );
}
