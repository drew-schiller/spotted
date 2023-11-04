import React from "react";
import styles from "./Game.module.sass";

type Props = {};

const GameTopSect = (props: Props) => {
  return (
    <div className={styles.gameTopSect}>
      <div className={styles.leftLogoContainer}>leftLogoContainer</div>
      <div className={styles.gameTitleContainer}>
        gameTitleContainer
        {/* <div className={styles.gameTitle}>SPOTTED!</div> */}
      </div>
      <div className={styles.rightBtnsContainer}>rightContainer</div>
    </div>
  );
};

export default GameTopSect;
// (className=)"([a-z,A-Z]*)"
// $1{styles.$2}
