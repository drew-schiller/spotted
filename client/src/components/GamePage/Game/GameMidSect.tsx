import React, { useContext } from "react";
import styles from "./Game.module.sass";
import { GameData, RoundContext } from './Game';

type Props = { gameData: React.MutableRefObject<GameData> };

const GameMidSect = (props: Props) => {
  const { round, setRound } = useContext(RoundContext);

  return (
    <div className={styles.gameMidSect}>
      <div className={styles.leftBody}>
        <button className={styles.navBtn} onClick={() => setRound(Math.max(1, round-1))}>PREV</button>
      </div>
      <div className={styles.songContainer}>
        <div className={styles.albumCover}>
          <img
              className={styles.albumCoverImg}
              src={props.gameData.current.round_tracks[round-1].album.images[0].url}
              alt="album cover"
            />
        </div>
        <div className={styles.trackDetailsBox}>
          <div className={styles.songTitleArea}>{props.gameData.current.round_tracks[round-1].name}</div>
          <div className={styles.artistTitleArea}>{props.gameData.current.round_tracks[round-1].album.artists[0].name}</div>
        </div>
      </div>

      <div className={styles.rightBody}>
        <button className={styles.navBtn} onClick={() => setRound(Math.min(props.gameData.current.rounds, round+1))}>NEXT</button>
      </div>
    </div>
  );
};

export default GameMidSect;
