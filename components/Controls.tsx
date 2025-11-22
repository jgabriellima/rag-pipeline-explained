import React from 'react';
import { ChevronLeft, ChevronRight, Volume2, Loader2 } from 'lucide-react';
import { PlaybackState } from '../types';

interface ControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onPlayAudio: () => void;
  playbackState: PlaybackState;
}

const Controls: React.FC<ControlsProps> = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  onPlayAudio, 
  playbackState 
}) => {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const isLoading = playbackState === PlaybackState.LOADING;
  const isPlaying = playbackState === PlaybackState.PLAYING;

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto p-4 bg-[#eaddcf] border-2 border-[#8c7b6c] rounded-lg shadow-lg mt-6">
      
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`flex items-center px-4 py-2 font-serif text-[#5c4b3c] transition-all border border-[#8c7b6c] rounded hover:bg-[#dccbb8] active:translate-y-0.5 ${isFirst ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Anterior
      </button>

      <div className="flex flex-col items-center">
        <span className="text-sm font-bold tracking-widest text-[#8c7b6c] uppercase mb-1">
           Passo {currentStep + 1} de {totalSteps}
        </span>
        <button
          onClick={onPlayAudio}
          disabled={isLoading || isPlaying}
          className={`flex items-center px-6 py-2 text-[#f0e6d2] bg-[#8b5a2b] rounded hover:bg-[#7a4e24] transition-all shadow-md border-b-4 border-[#5a381a] active:border-b-0 active:translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px] justify-center`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Gerando...
            </>
          ) : isPlaying ? (
            <>
              <Volume2 className="w-5 h-5 mr-2 animate-pulse text-green-300" />
              Ouvindo...
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 mr-2" />
              Narrar Cena
            </>
          )}
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={isLast}
        className={`flex items-center px-4 py-2 font-serif text-[#5c4b3c] transition-all border border-[#8c7b6c] rounded hover:bg-[#dccbb8] active:translate-y-0.5 ${isLast ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
      >
        Próximo
        <ChevronRight className="w-5 h-5 ml-1" />
      </button>

    </div>
  );
};

export default Controls;