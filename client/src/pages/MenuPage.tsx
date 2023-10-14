import React from "react";
import ReactDOM from "react-dom/client";
import GameConfigPanel from "../components/MenuPage/GameConfigPanel";
import PlayerConnectPanel from "../components/MenuPage/PlayerConnectPanel";
import styles from "../styles/MenuPage.module.sass";
type Props = {};

const MenuPage: React.FC = (props: Props) => {
  return (
    <div className="page">
      <div className="app-module-main-container">
        <GameConfigPanel />
        <PlayerConnectPanel />
      </div>
    </div>
  );
};

export default MenuPage;
