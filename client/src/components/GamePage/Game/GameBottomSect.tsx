import React from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./BottomVoteBtn";
import BottomPlaybackBar from "./BottomPlaybackBar";
import { PlaybackProvider } from "./BottomPlaybackBar"; // change later
import { GameData, RoundContext, Player } from "./Game";

type GameBottomSectProps = { gameData: React.MutableRefObject<GameData>, players: Array<Player> };

const GameBottomSect = (props: GameBottomSectProps) => {

  const getLowerContainer = () => {
    if (props.gameData.current.gamemode == "vote") {
      return (
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
      );
    } else {
      return (
        <div className={styles.guessContainer}>
          
        </div>
      );
    }
  };

  return (
    <PlaybackProvider>
      <div className={styles.gameBottomSect}>
        {props.gameData.current.item_type == "track" ? <BottomPlaybackBar gameData={props.gameData} /> : <></>}
        {getLowerContainer()}
      </div>
    </PlaybackProvider>
  );
};

export default GameBottomSect;
