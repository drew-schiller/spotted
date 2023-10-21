import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom/client";
import GameConfigPanel from "../../components/MenuPage/GameConfigPanel";
import PlayerConnectPanel from "../../components/MenuPage/PlayerConnectPanel";
import PlayerWidget from "../../components/MenuPage/PlayerWidget";

import styles from "../../styles/MenuPage.module.sass";
type Props = {};

const AppModuleMainContainer: React.FC = (props: Props) => {
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
    <div
      className={` ${
        minimized ? styles.minimized : styles.appModuleMainContainer
      }`}
    >
      <PlayerConnectPanel />
      <GameConfigPanel />
    </div>
  );
};

export default AppModuleMainContainer;
