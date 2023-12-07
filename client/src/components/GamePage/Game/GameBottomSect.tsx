import { useRef, useState, createContext, useContext, useEffect } from "react";
import styles from "./Game.module.sass";
import BottomVoteBtn from "./BottomVoteBtn";
import BottomPlaybackBar from "./BottomPlaybackBar";
import { PlaybackProvider } from "./BottomPlaybackBar"; // change later
import { GameData, RoundContext, Player } from "./Game";

interface PlayersSelectedContextType {
  isSelected: boolean;
  setIsSelected: () => void;
  selectedPlayerIds: Array<string>;
}

const PlayersSelectedContext = createContext<
  PlayersSelectedContextType | undefined
>(undefined);

export const PlayersSelectedProvider = (props: {
  children: React.ReactNode;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      // Change Playback Button to Voting state
    }
  });
};

type GameBottomSectProps = {
  gameData: React.MutableRefObject<GameData>;
  players: Array<Player>;
};

const GameBottomSect = (props: GameBottomSectProps) => {
  return (
    <div className={styles.gameBottomSect}>
      <PlaybackProvider>
        <BottomPlaybackBar gameData={props.gameData} />
      </PlaybackProvider>
      <div className={styles.votingContainer}>
        {props.players.map((player) => (
          <BottomVoteBtn
            key={player.id}
            id={player.id}
            name={player.name}
            profilePictureURL={player.profile_pictures[1].url}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBottomSect;
