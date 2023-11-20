import React from "react";
import PlaybackActionsButton from "./PlaybackActionsButton";
import styles from "./Game.module.sass";
import PlaybackSideButton from "./PlaybackSideButton";

type Props = {};

const BottomPlaybackBar = (props: Props) => {
  return (
    <div className={styles.gameBarContainer}>
      <PlaybackSideButton />
      <div className={styles.playbackProgressBar}>
        <PlaybackActionsButton />
      </div>
      <PlaybackSideButton />
    </div>
  );
};

export default BottomPlaybackBar;
