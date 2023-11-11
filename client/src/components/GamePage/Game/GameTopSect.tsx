import React from "react";
import styles from "./Game.module.sass";
import TopMiscButton from "./TopMiscButton";

type Props = {};

const GameTopSect = (props: Props) => {
  return (
    <div className={styles.gameTopSect}>
      <div className={styles.leftLogoContainer}>leftLogoContainer</div>
      <div className={styles.gameTitleContainer}>
        <div className={styles.gameTitle}>SPOTTED!</div>
        <div className={styles.roundNumber}>ROUND 1/10</div>
      </div>
      <div className={styles.rightBtnsContainer}>
        <TopMiscButton />
        <TopMiscButton />
        <TopMiscButton />
      </div>
    </div>
  );
};

export default GameTopSect;
// (className=)"([a-z,A-Z]*)"
// $1{styles.$2}
