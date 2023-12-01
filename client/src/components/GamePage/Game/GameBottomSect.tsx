import React from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./BottomVoteBtn";
import BottomPlaybackBar from "./BottomPlaybackBar";
import { GameData, RoundContext } from "./Game";

type GameBottomSectProps = { gameData: React.MutableRefObject<GameData> };

const GameBottomSect = (props: GameBottomSectProps) => {
  return (
    <div className={styles.gameBottomSect}>
      <BottomPlaybackBar gameData={props.gameData} />
      <div className={styles.votingContainer}>
        <BottomVoteBtn name="Drew" />
        <BottomVoteBtn name="jesse" />
        <BottomVoteBtn name="jesse" />
        <BottomVoteBtn name="jesse" />
        <BottomVoteBtn />
        <BottomVoteBtn />
        <BottomVoteBtn />
        <BottomVoteBtn />
      </div>
    </div>
  );
};

export default GameBottomSect;
