import React, { useContext } from "react";
import styles from "./Game.module.sass";
import { GameData, RoundContext } from './Game';
import { FaCaretLeft, FaCaretRight} from 'react-icons/fa';

type Props = { gameData: React.MutableRefObject<GameData> };

const GameMidSect = (props: Props) => {
  const { round, setRound } = useContext(RoundContext);

  const getLeftButton = () => {
    if (round <= 1) return;
    return (
      <button className={styles.navBtn} onClick={() => setRound(Math.max(1, round-1))}>
        <FaCaretLeft/>
      </button>
    )
  }

  const getRightButton = () => {
    if (round >= props.gameData.current.rounds) return;
    return (
      <button className={styles.navBtn} onClick={() => setRound(Math.min(props.gameData.current.rounds, round+1))}>
        <FaCaretRight/>
      </button>
    )
  }

  return (
    <div className={styles.gameMidSect}>
      <div className={styles.leftBody}>
        {getLeftButton()}
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
          <div className={styles.songTitleArea}>
            <div className={styles.titleAreaText}>
              {props.gameData.current.round_tracks[round-1].name}
            </div>
          </div>
          <div className={styles.artistTitleArea}>
            <div className={styles.titleAreaText}>
              {props.gameData.current.round_tracks[round-1].album.artists[0].name}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightBody}>
        {getRightButton()}
      </div>
    </div>
  );
};

export default GameMidSect;
