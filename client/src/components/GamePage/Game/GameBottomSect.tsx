import React from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./BottomVoteBtn";
import BottomPlaybackBar from "./BottomPlaybackBar";
import { GameData, RoundContext } from "./Game";
import { PlaybackProvider } from "./BottomPlaybackBar"; // change later

type GameBottomSectProps = { gameData: React.MutableRefObject<GameData> };

const GameBottomSect = (props: GameBottomSectProps) => {
  return (
    <PlaybackProvider>
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
    </PlaybackProvider>
  );
};

export default GameBottomSect;
