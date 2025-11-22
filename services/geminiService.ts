import { GoogleGenAI, Modality } from "@google/genai";

// Using a singleton pattern for the client
let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is missing");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

// Helper to decode base64 to AudioBuffer
const decodeAudioData = async (
  base64String: string,
  audioContext: AudioContext
): Promise<AudioBuffer> => {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  // We have to copy the buffer because decodeAudioData detaches it
  const bufferCopy = bytes.buffer.slice(0); 
  return await audioContext.decodeAudioData(bufferCopy);
};

export const generateSpeech = async (text: string): Promise<AudioBuffer> => {
  const ai = getClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Using 'Kore' for a narrator feel
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data received from Gemini");
    }

    // Decode audio
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await decodeAudioData(base64Audio, audioContext);
    
    return audioBuffer;
  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
};