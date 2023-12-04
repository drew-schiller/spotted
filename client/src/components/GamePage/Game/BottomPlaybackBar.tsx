import { useRef, useState, createContext, useContext, useEffect } from "react";
import PlaybackActionsButton from "./PlaybackActionsButton";
import styles from "./Game.module.sass";
import PlaybackSideButton from "./PlaybackSideButton";
import { GameData, RoundContext } from "./Game";

interface PlaybackContextType {
  isPlaying: boolean;
  togglePlayback: () => void;
  elapsedTime: number;
  setElapsedTime: (milliseconds: number) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(
  undefined
);

// Manages the playback state and provides it to its children.
export const PlaybackProvider = (props: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const togglePlayback = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  useEffect(() => {
    let intervalId: number = 0;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setElapsedTime((elapsedTime) => elapsedTime + 100);
      }, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  const contextValue = {
    isPlaying,
    togglePlayback,
    elapsedTime,
    setElapsedTime,
  };

  return (
    <PlaybackContext.Provider value={contextValue}>
      {props.children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error("usePlayback must be used within a PlaybackProvider");
  }
  return context;
};

// Consumes the playback state using the usePlayback hook to control the audio playback based on the state.
type AudioPlayerProps = { audioFileUrl: string };

const AudioPlayer = (props: AudioPlayerProps) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const { isPlaying, elapsedTime, setElapsedTime } = usePlayback();

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    let intervalId: number;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio src={props.audioFileUrl} ref={audioRef}></audio>
    </>
  );
};

type BottomPlaybackBarProps = { gameData: React.MutableRefObject<GameData> };

const BottomPlaybackBar = (props: BottomPlaybackBarProps) => {
  const { elapsedTime } = usePlayback();
  const { round, setRound } = useContext(RoundContext);
  const audioFileUrl =
    props.gameData.current.round_tracks[round - 1].preview_url;

  const progressBarRef = useRef<HTMLDivElement>(null);

  // Show progress
  useEffect(() => {
    const progressBar = progressBarRef.current;

    if (progressBar) {
      const percentage = (elapsedTime / 30000) * 100;
      progressBar.style.setProperty("--progress", `${percentage}%`);
    }
  }, [elapsedTime]);
  return (
    <div className={styles.gameBarContainer}>
      <PlaybackSideButton />
      <div className={styles.playbackProgressBar} ref={progressBarRef}>
        <AudioPlayer audioFileUrl={audioFileUrl} />
        <PlaybackActionsButton />
      </div>
      <PlaybackSideButton />
    </div>
  );
};

export default BottomPlaybackBar;
