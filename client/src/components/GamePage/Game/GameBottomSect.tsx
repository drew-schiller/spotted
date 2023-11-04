import React from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./bottomVoteBtn";

type Props = {};

const GameBottomSect = (props: Props) => {
  return (
    <div className={styles.gameBottomSect}>
      <div className={styles.gameBarContainer}>gameBar</div>
      <div className={styles.votingContainer}>
        <BottomVoteBtn />
        <BottomVoteBtn />
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
