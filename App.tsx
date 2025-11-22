import React, { useState, useRef, useEffect } from 'react';
import { STORY_SCRIPT, DIAGRAM_IMAGE_URL } from './constants';
import { PlaybackState } from './types';
import { generateSpeech } from './services/geminiService';
import SpotlightImage from './components/SpotlightImage';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>(PlaybackState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const currentStep = STORY_SCRIPT[currentStepIndex];

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Stop audio when changing steps manually
  useEffect(() => {
    stopAudio();
  }, [currentStepIndex]);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Ignore error if already stopped
      }
      sourceNodeRef.current = null;
    }
    if (playbackState === PlaybackState.PLAYING) {
      setPlaybackState(PlaybackState.IDLE);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < STORY_SCRIPT.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handlePlayAudio = async () => {
    if (playbackState === PlaybackState.LOADING || playbackState === PlaybackState.PLAYING) return;

    setPlaybackState(PlaybackState.LOADING);
    setErrorMessage(null);

    try {
      // Init Audio Context if needed (must be user interaction triggered initially)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Generate Audio via Gemini
      const audioBuffer = await generateSpeech(currentStep.narration);
      
      // Play Audio
      if (audioContextRef.current) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        
        source.onended = () => {
            setPlaybackState(PlaybackState.IDLE);
            sourceNodeRef.current = null;
        };

        sourceNodeRef.current = source;
        source.start(0);
        setPlaybackState(PlaybackState.PLAYING);
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível gerar o áudio. Verifique sua chave de API.");
      setPlaybackState(PlaybackState.IDLE);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="mb-6 text-center relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#8c7b6c] -z-10 transform -translate-y-1/2 opacity-50"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5a381a] bg-[#f0e6d2] inline-block px-6 border-2 border-[#8c7b6c] shadow-md transform -rotate-1">
          A Engenharia do Conhecimento
        </h1>
        <p className="text-[#8c7b6c] mt-2 text-lg italic">Uma Jornada Interativa pelo Pipeline RAG</p>
      </header>

      {/* Main Content Area */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Visual Column */}
        <div className="lg:col-span-8 w-full aspect-[16/9] relative">
          <SpotlightImage 
            imageUrl={DIAGRAM_IMAGE_URL}
            coordinate={currentStep.visual}
            isImageLoaded={isImageLoaded}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        {/* Text/Story Column */}
        <div className="lg:col-span-4 flex flex-col h-full justify-between">
          <div className="bg-[#eaddcf] p-6 rounded-lg border border-[#bdaea2] shadow-inner relative overflow-hidden">
            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8c7b6c]"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8c7b6c]"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8c7b6c]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8c7b6c]"></div>

            <h2 className="text-2xl font-bold text-[#5a381a] mb-4 font-serif border-b border-[#bdaea2] pb-2">
              {currentStep.title}
            </h2>
            
            <div className="prose prose-amber text-[#4a3b2c] leading-relaxed text-lg min-h-[200px]">
              <p className="animate-fadeIn">
                {currentStep.narration}
              </p>
            </div>
            
            {errorMessage && (
                <p className="text-red-800 text-sm mt-4 bg-red-100 p-2 rounded border border-red-300">
                    {errorMessage}
                </p>
            )}
          </div>

          {/* Controls */}
          <Controls 
            currentStep={currentStepIndex}
            totalSteps={STORY_SCRIPT.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onPlayAudio={handlePlayAudio}
            playbackState={playbackState}
          />

          <div className="mt-6 text-center text-[#8c7b6c]/60 text-sm italic font-serif">
            Imagem ilustrativa. Conceito Steampunk.
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;