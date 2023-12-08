import React, { useContext, useEffect } from "react";
import styles from "./Game.module.sass";
import { GameData, RoundContext } from './Game';
import { FaCaretLeft, FaCaretRight} from 'react-icons/fa';
import { Track, Album, Artist } from './Game';
import monkeyGuess from '../../../assets/monkeyGuess.png'

type Props = { gameData: React.MutableRefObject<GameData> };

const GameMidSect = (props: Props) => {
  const { round, setRound, state } = useContext(RoundContext);

  const getLeftButton = () => {
    if (round <= 1) return;
    return (
      <button className={styles.navBtn} onClick={() => setRound(Math.max(1, round-1))}>
        <FaCaretLeft/>
      </button>
    );
  };

  const getRightButton = () => {
    if (round >= props.gameData.current.rounds) return;
    return (
      <button className={styles.navBtn} onClick={() => setRound(Math.min(props.gameData.current.rounds, round+1))}>
        <FaCaretRight/>
      </button>
    );
  };

  const shouldHideDetails = () => {
    if (props.gameData.current.gamemode == "vote" || props.gameData.current.gamemode == "guess") {
      if (state != "voted") {
        return true;
      }
    }
    return false;
  };

  const getImageURL = () => {
    if (shouldHideDetails()) return monkeyGuess;
    switch (props.gameData.current.item_type) {
      case "track":
        return (props.gameData.current.round_items[round-1] as Track).album.images[0].url;
      case "album":
        return (props.gameData.current.round_items[round-1] as Album).images[0].url;
      default:
        return ""
    }
  };

  const getTopText = () => {
    return props.gameData.current.round_items[round-1].name;
  };

  const getBottomText = () => {
    switch (props.gameData.current.item_type) {
      case "track":
        return (props.gameData.current.round_items[round-1] as Track).artists.map(artist => artist.name).join(', ');
      case "album":
        return (props.gameData.current.round_items[round-1] as Album).artists.map(artist => artist.name).join(', ');
      default:
        return ""
    }
  };

  useEffect(() => {
    document.getAnimations().forEach(anim => {
      anim.cancel();
      anim.play();
    });
  }, [round]);

  return (
    <div className={styles.gameMidSect}>
      <div className={styles.leftBody}>
        {getLeftButton()}
      </div>
      <div className={styles.songContainer}>
        <div className={styles.albumCover} style={shouldHideDetails() ? {boxShadow:"0px 0px 0px #fff"} : {}}>
          <img
              className={styles.albumCoverImg}
              src={getImageURL()}
              alt={props.gameData.current.item_type + " cover image"}
            />
        </div>
        <div className={styles.trackDetailsBox} style={{display:`${(shouldHideDetails() ? "none" : "flex")}`}}>
          <div className={styles.songTitleArea}>
            <div className={styles.titleAreaText}>
              {getTopText()}
            </div>
          </div>
          <div className={styles.artistTitleArea}>
            <div className={styles.titleAreaText}>
              {getBottomText()}
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
