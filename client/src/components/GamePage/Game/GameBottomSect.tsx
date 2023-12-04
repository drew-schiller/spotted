import React from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./BottomVoteBtn";
import BottomPlaybackBar from "./BottomPlaybackBar";
import { GameData, RoundContext, Player } from "./Game";

type GameBottomSectProps = { gameData: React.MutableRefObject<GameData>, players: Array<Player> };

const GameBottomSect = (props: GameBottomSectProps) => {
  return (
    <div className={styles.gameBottomSect}>
      <BottomPlaybackBar gameData={props.gameData} />
      <div className={styles.votingContainer}>
        {props.players.map(player =>
          <BottomVoteBtn
            key={player.id}
            id={player.id}
            name={player.name}
            profilePictureURL={player.profile_pictures[1].url}
          />
        )}
      </div>
    </div>
  );
};

export default GameBottomSect;
