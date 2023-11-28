import React, { useEffect, useState, useContext, useRef, createContext } from "react";
import styles from "./Game.module.sass";
import GameTopSect from "./GameTopSect";
import GameMidSect from "./GameMidSect";
import GameBottomSect from "./GameBottomSect";
import { GamePageUpdateContext } from '../GamePage';

type Props = {};
export type Image = { url: string, height: number, width: number };
export type Artist = { id: string, name: string }
export type Album = { name: string, id: string, images: Array<Image>, artists: Array<Artist> }
export type Track = { name: string, id: string, album: Album };
export type GameData = { round_tracks: Array<Track>, rounds: number };
export const RoundContext = createContext({ round: 0, setRound: (r: number) => { r } });

const Game: React.FC = (_props: Props) => {
  const [minimized, setMinimized] = useState(false);
  const { setGamePageUpdate } = useContext(GamePageUpdateContext);
  const [ round, setRound ] = useState(0);
  const contextValue = { round, setRound };
  const gameData = useRef<GameData>({ round_tracks: [], rounds: 0});

  useEffect(() => {
    const getGameData = async () => {
      console.log("Fetching game data...");
      try {
        const response = await fetch('http://127.0.0.1:5000/api/game_data', {credentials: "include", method: "GET"});
        const responseJson = await response.json();
        gameData.current = responseJson;
        setRound(1);
      } catch {
        console.error("ERROR: Unable to read game data from session.");
      }
    };
    
    getGameData();
  }, []);

  const handleResize = () => {
    setMinimized(window.innerWidth < 810 || window.innerHeight < 700);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const endGame = async () => {
    try {
      await fetch('http://127.0.0.1:5000/api/end_game', {credentials: "include", method: "POST", mode: "cors"});
      setGamePageUpdate(true);
    } catch {
      console.error("ERROR: Unable to end game in session.");
    }
  };

  const gameSections = () => {
    if (gameData.current.round_tracks.length == 0) return;
    return (
      <RoundContext.Provider value={contextValue}>
        <GameTopSect gameData={gameData} endGame={endGame} />
        <GameMidSect gameData={gameData} />
        <GameBottomSect />
      </RoundContext.Provider>
    )
  };

  return (
    <div className={` ${minimized ? styles.minimized : styles.gameModule}`}>
      {gameSections()}
    </div>
  );
};

export default Game;
