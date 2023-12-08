import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import styles from "./Game.module.sass";
import { usePlayback } from "./BottomPlaybackBar"; // change later
import { RoundContext } from './Game';
import { VotingContext } from "./GameBottomSect";

type Props = {};

const PlaybackActionsButton = (props: Props) => {
  const { isPlaying, setIsPlaying } = usePlayback();
  const { round, state, setState, roundStateByRound } = useContext(RoundContext);
  const { setSelected } = useContext(VotingContext);
  // Actions button will have multiple states

  const handleClick = () => {
    switch (state) {
      case "voted":
      case "unselected":
        setIsPlaying(!isPlaying);
        break;
      case "selected":
        // Handle click in voting state
        setState("voted");
        roundStateByRound.set(round, "voted");
        setSelected([]);
        break;
      default:
        break;
    }
  };

  const renderButtonIcon = () => {
    switch (state) {
      case "voted":
      case "unselected":
        return isPlaying ? <FaPause /> : <FaPlay />;
      case "selected":
        return "GUESS";
      default:
        return "";
    }
  };

  return (
    <button onClick={handleClick} className={styles.playbackActionsButton} style={(state == "selected") ? {backgroundColor:"#eb7434", borderColor:"#b34c15"} : {}}>
      {renderButtonIcon()}
    </button>
  );
};

export default PlaybackActionsButton;
