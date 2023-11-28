import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from "./Game.module.sass";

type Props = {};

const PlaybackActionsButton = (props: Props) => {
  return (
    <div className={styles.playbackActionsButton}>
      <FaPlay size="" />
    </div>
  );
};

export default PlaybackActionsButton;
