import React, { useEffect, useState, useContext } from "react";
import styles from "./Game.module.sass";
import GameTopSect from "./GameTopSect";
import GameMidSect from "./GameMidSect";
import GameBottomSect from "./GameBottomSect";
import { GamePageUpdateContext } from "../GamePage";

type Props = {};

const Game: React.FC = (_props: Props) => {
  const [minimized, setMinimized] = useState(false);
  const { gamePageUpdate, setGamePageUpdate } = useContext(
    GamePageUpdateContext
  );

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
      await fetch("http://127.0.0.1:5000/api/end_game", {
        credentials: "include",
        method: "POST",
        mode: "cors",
      });
      setGamePageUpdate(true);
    } catch {
      console.error("ERROR: Unable to end game in session.");
    }
  };

  return (
    <div className={` ${minimized ? styles.minimized : styles.gameModule}`}>
      <GameTopSect />
      <GameMidSect />
      <GameBottomSect />
      {/* <button onClick={endGame}>
        End Game
      </button> */}
    </div>
  );
};

export default Game;
