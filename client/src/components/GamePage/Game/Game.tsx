import React, { useEffect, useState } from "react";
import styles from "./Game.module.sass";
import GameTopSect from "./gameTopSect";
import GameMidSect from "./gameMidSect";
import GameBottomSect from "./GameBottomSect";

type Props = {};

const Game: React.FC = (_props: Props) => {
  const [minimized, setMinimized] = useState(false);

  const handleResize = () => {
    setMinimized(window.innerWidth < 750 || window.innerHeight < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={` ${minimized ? styles.minimized : styles.gameModule}`}>
      <GameTopSect />
      <GameMidSect />
      <GameBottomSect />
    </div>
  );
};

export default Game;
