import React, { useContext } from "react";
import styles from "./Game.module.sass";
import TopMiscButton from "./TopMiscButton";
import { GameData, RoundContext } from './Game';

type Props = { gameData: React.MutableRefObject<GameData>, endGame: () => void};

const GameTopSect = (props: Props) => {
  const { round } = useContext(RoundContext);

  return (
    <div className={styles.gameTopSect}>
      <div className={styles.leftLogoContainer}>leftLogoContainer</div>
      <div className={styles.gameTitleContainer}>
        <div className={styles.gameTitle}>SPOTTED!</div>
        <div className={styles.roundNumber}>ROUND {round}/{props.gameData.current.rounds}</div>
      </div>
      <div className={styles.rightBtnsContainer}>
        <TopMiscButton />
        <TopMiscButton />
        <div className={styles.topMiscButton} onClick={props.endGame}>X</div>
      </div>
    </div>
  );
};

export default GameTopSect;
// (className=)"([a-z,A-Z]*)"
// $1{styles.$2}
