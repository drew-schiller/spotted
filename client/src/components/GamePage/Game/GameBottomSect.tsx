import React, { useState, createContext } from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./BottomVoteBtn";
import BottomPlaybackBar from "./BottomPlaybackBar";
import { PlaybackProvider } from "./BottomPlaybackBar"; // change later
import { GameData, Player } from "./Game";

type GameBottomSectProps = { gameData: React.MutableRefObject<GameData>, players: Array<Player> };
export const VotingContext = createContext({selected: new Array<string>(), setSelected: (s: Array<string>) => { s }});

const GameBottomSect = (props: GameBottomSectProps) => {
  const [ selected, setSelected ] = useState<Array<string>>([]);
  const contextValue = { selected, setSelected };

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
    <VotingContext.Provider value={contextValue}>
      <PlaybackProvider>
        <div className={styles.gameBottomSect}>
          {props.gameData.current.item_type == "track" ? <BottomPlaybackBar gameData={props.gameData} /> : <></>}
          {getLowerContainer()}
        </div>
      </PlaybackProvider>
    </VotingContext.Provider>
  );
};

export default GameBottomSect;
