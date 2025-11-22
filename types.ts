export interface Coordinate {
  top: number; // Percentage
  left: number; // Percentage
  width: number; // Percentage
  height: number; // Percentage
  fullView?: boolean; // If true, no spotlight (show full image)
}

export interface ScriptStep {
  id: string;
  title: string;
  narration: string;
  visual: Coordinate;
}

export enum PlaybackState {
  IDLE,
  LOADING,
  PLAYING,
  PAUSED
}