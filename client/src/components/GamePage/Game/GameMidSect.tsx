import React from "react";
import styles from "./Game.module.sass";

type Props = {};

const GameMidSect = (props: Props) => {
  return (
    <div className={styles.gameMidSect}>
      <div className={styles.leftBody}>
        <button className={styles.navBtn}>PREV</button>
      </div>
      <div className={styles.songContainer}>
        <div className={styles.albumCover}>albumCover</div>
        <div className={styles.trackDetailsBox}>details</div>
      </div>

      <div className={styles.rightBody}>
        <button className={styles.navBtn}>NEXT</button>
      </div>
    </div>
  );
};

export default GameMidSect;
