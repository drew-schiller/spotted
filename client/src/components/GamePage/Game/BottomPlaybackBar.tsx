import { useRef, useState, createContext, useContext, useEffect } from "react";
import PlaybackActionsButton from "./PlaybackActionsButton";
import styles from "./Game.module.sass";
import { FaUndo } from "react-icons/fa";
import { IoVolumeOff, IoVolumeLow, IoVolumeMedium, IoVolumeHigh } from 'react-icons/io5'
import { GameData, RoundContext, Track } from "./Game";

interface PlaybackContextType {
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  elapsedTime: number;
  setElapsedTime: (milliseconds: number) => void;
  volume: number;
  setVolume: (v: number) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(
  undefined
);

// Manages the playback state and provides it to its children.
export const PlaybackProvider = (props: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [volume, setVolume] = useState(1.0);

  useEffect(() => {
    let intervalId: number = 0;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setElapsedTime(elapsedTime => elapsedTime + 25);
      }, 25);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  const contextValue = {
    isPlaying,
    setIsPlaying,
    elapsedTime,
    setElapsedTime,
    volume,
    setVolume
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
type AudioPlayerProps = { audioFileUrl: string, audioRef: React.RefObject<HTMLAudioElement> };

const AudioPlayer = (props: AudioPlayerProps) => {
  const { isPlaying, volume } = usePlayback();

  useEffect(() => {
    const playAndWait = async (audio: HTMLAudioElement) => {
      await audio.play();
    };

    const audio = props.audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.volume = volume;
        playAndWait(audio);
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio src={props.audioFileUrl} ref={props.audioRef}></audio>
    </>
  );
};

type BottomPlaybackBarProps = { gameData: React.MutableRefObject<GameData>};

const BottomPlaybackBar = (props: BottomPlaybackBarProps) => {
  const { elapsedTime, setElapsedTime, setIsPlaying, volume, setVolume } = usePlayback();
  const [ showVolumeBar, setShowVolumeBar ] = useState(false);
  const { round } = useContext(RoundContext);
  const audioFileUrl = (props.gameData.current.round_items[round - 1] as Track).preview_url;

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Show progress
  useEffect(() => {
    const audio = audioRef.current
    const progressBar = progressBarRef.current;
    if (audio && progressBar) {
      const percentage = Math.min((audio.currentTime / audio.duration * 100), 100);
      progressBar.style.setProperty("--progress", `${percentage}%`);
      if (percentage == 100.0) setIsPlaying(false);
    }
  }, [elapsedTime]);

  // Reset progress on round change
  useEffect(() => {
    setIsPlaying(false);
    setElapsedTime(0);
    setShowVolumeBar(false);
  }, [round]);

  // Change audio volume when user changes it
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const restartPlayback = () => {
    setElapsedTime(0);
    const audio = audioRef.current;
    if (audio) audio.currentTime = 0;
  };

  const getVolumeIcon = () => {
    if (volume == 0.0) return (<IoVolumeOff />);
    else if (volume < 0.33) return (<IoVolumeLow />);
    else if (volume < 0.66) return (<IoVolumeMedium />);
    else return (<IoVolumeHigh />);
  };

  const getVolumeBar = () => {
    if (!showVolumeBar) return;
    return (
      <div className={styles.playbackVolumeSlider}>
        {<input type="range" orient="vertical" min={0} max={100} step={1} value={volume * 100} onChange={e => setVolume(Number(e.target.value) / 100.0)}/>}
      </div> /* IDK why this ^^^ is an error but it can't be removed. */
    );
  };

  return (
    <div className={styles.gameBarContainer}>
      <button className={styles.playbackRestartButton} onClick={() => restartPlayback()}><FaUndo /></button>
      <div className={styles.playbackProgressBar} ref={progressBarRef}>
        <div className={styles.progress}/>
        <AudioPlayer audioFileUrl={audioFileUrl} audioRef={audioRef}/>
      </div>
      <PlaybackActionsButton />
      <div className={styles.playbackVolumeButton}>
        <div className={styles.playbackVolumeIcon} onClick={() => setShowVolumeBar(!showVolumeBar)}>{getVolumeIcon()}</div>
        {getVolumeBar()}
      </div>
    </div>
  );
};

export default BottomPlaybackBar;
