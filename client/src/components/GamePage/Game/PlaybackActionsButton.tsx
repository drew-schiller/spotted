import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import styles from "./Game.module.sass";
import { usePlayback } from "./BottomPlaybackBar"; // change later

type Props = {};

const PlaybackActionsButton = (props: Props) => {
  const { isPlaying, setIsPlaying } = usePlayback();

  // Actions button will have multiple states, the default of which being playback
  // Within the "playback" state, the button can toggle between play and pause.
  const [buttonState, setButtonState] = React.useState("playback");

  const handleClick = () => {
    switch (buttonState) {
      case "playback":
        setIsPlaying(!isPlaying);
        break;
      case "voting":
        // Handle click in voting state
        break;
      default:
        break;
    }
  };

  const renderButtonIcon = () => {
    switch (buttonState) {
      case "playback":
        return isPlaying ? <FaPause /> : <FaPlay />;
      case "voting":
        return "Vote";
      default:
        return "";
    }
  };

  return (
    <button onClick={handleClick} className={styles.playbackActionsButton}>
      {renderButtonIcon()}
    </button>
  );
};

export default PlaybackActionsButton;
