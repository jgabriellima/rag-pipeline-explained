import React, { useMemo } from 'react';
import { Coordinate } from '../types';

interface SpotlightImageProps {
  imageUrl: string;
  coordinate: Coordinate;
  isImageLoaded: boolean;
  onLoad: () => void;
}

const SpotlightImage: React.FC<SpotlightImageProps> = ({ imageUrl, coordinate, isImageLoaded, onLoad }) => {
  
  // Calculate the spotlight styles using a large box-shadow hack which is performant and smooth
  const spotlightStyle = useMemo(() => {
    if (coordinate.fullView) {
      return {
        opacity: 0, // Hide the dark overlay
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
      };
    }
    return {
      opacity: 1,
      top: `${coordinate.top}%`,
      left: `${coordinate.left}%`,
      width: `${coordinate.width}%`,
      height: `${coordinate.height}%`,
    };
  }, [coordinate]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border-4 border-[#8c7b6c] bg-[#2a2420]">
      {/* Base Image */}
      <img
        src={imageUrl}
        alt="RAG Pipeline Diagram"
        className={`w-full h-full object-contain transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={onLoad}
      />
      
      {/* Loading State */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-[#eaddcf]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-amber-600 border-r-amber-600 border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <span className="font-serif text-xl tracking-widest">CARREGANDO ARQUIVOS...</span>
          </div>
        </div>
      )}

      {/* Spotlight Overlay */}
      {isImageLoaded && (
        <div 
          className="absolute z-10 transition-all duration-1000 ease-in-out pointer-events-none shadow-[0_0_0_100vmax_rgba(0,0,0,0.7)] rounded-sm"
          style={{
            ...spotlightStyle,
            boxShadow: coordinate.fullView ? 'none' : '0 0 0 100vmax rgba(0,0,0,0.75)', // Darkens the rest
          }}
        >
           {/* Optional: Add a glowing border to the spotlight area */}
           {!coordinate.fullView && (
             <div className="w-full h-full border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse"></div>
           )}
        </div>
      )}
      
      {/* Vignette for style */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(50,30,10,0.6)]"></div>
    </div>
  );
};

export default SpotlightImage;