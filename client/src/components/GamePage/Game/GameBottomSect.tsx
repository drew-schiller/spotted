import React from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./BottomVoteBtn";
import BottomPlaybackBar from "./BottomPlaybackBar";

type Props = {};

const GameBottomSect = (props: Props) => {
  return (
    <div className={styles.gameBottomSect}>
      <BottomPlaybackBar />
      <div className={styles.votingContainer}>
        <BottomVoteBtn name="Drew" />
        <BottomVoteBtn name="jesse" />
        <BottomVoteBtn name="jesse" />
        <BottomVoteBtn name="jesse" />
        <BottomVoteBtn />
        <BottomVoteBtn />
        <BottomVoteBtn />
        <BottomVoteBtn />
        <BottomVoteBtn />
        <BottomVoteBtn />
      </div>
    </div>
  );
};

export default GameBottomSect;
