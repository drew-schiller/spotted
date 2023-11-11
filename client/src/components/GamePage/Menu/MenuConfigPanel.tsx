import React, { useState, useContext, useRef } from "react";
import styles from "./Menu.module.sass";
import ConfigPresetsTab from "./ConfigPresetsTab";
import ConfigSettingsTab from "./ConfigSettingsTab";
import { GamePageUpdateContext } from '../GamePage';

type Props = {};

const MenuConfigPanel: React.FC = (props: Props) => {
  const [ activeTab, setActiveTab ] = useState("configPresetsTab");
  const gameSettings = useRef(new Map<string, string>());
  const [ configSettingsTab ] = useState(<ConfigSettingsTab settings={gameSettings}/>);
  const [ configPresetsTab ] = useState(<ConfigPresetsTab />);
  const { gamePageUpdate, setGamePageUpdate } = useContext(GamePageUpdateContext);

  const switchTab = (tabState: string) => {
    setActiveTab(tabState);
  };

  const createGame = async () => {
    let createUrl = 'http://127.0.0.1:5000/api/create_game?';
    for (const [key, value] of gameSettings.current) {
      createUrl += `${key}=${value}&`;
    }
    if (createUrl.slice(-1) === "&") createUrl = createUrl.slice(0, -1);
    try {
      await fetch(createUrl, {credentials: "include", method: "POST", mode: "cors"});
      setGamePageUpdate(true);
    } catch {
      console.error("ERROR: Unable to create game in session.");
    }
  };

  return (
    <div className={styles.menuConfigPanel}>
      <div className={styles.tabbedHeader}>
        <button
          className={`${styles.presetsBtn} ${styles.panelHeaderText} ${
            activeTab === "configPresetsTab" ? styles.activeTab : ""
          }`}
          onClick={() => switchTab("configPresetsTab")}
        >
          presets
        </button>
        <button
          className={`${styles.settingsBtn} ${styles.panelHeaderText} ${
            activeTab === "configSettingsTab" ? styles.activeTab : ""
          }`}
          onClick={() => switchTab("configSettingsTab")}
        >
          settings
        </button>
      </div>
      <div className={styles.configInterface}>
        {activeTab === "configSettingsTab" ? configSettingsTab : configPresetsTab }
      </div>
      <div className={`${styles.playBtnContainer}`}>
        <button className={`${styles.playBtn} ${styles.playBtnText}`} onClick={createGame}>
          PLAY
        </button>
      </div>
    </div>
  );
};

export default MenuConfigPanel;
