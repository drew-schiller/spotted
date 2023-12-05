import React, { useState, useContext } from "react";
import styles from "./Menu.module.sass";
import ConfigPresetsTab from "./ConfigPresetsTab";
import ConfigSettingsTab from "./ConfigSettingsTab";
import { GamePageStateContext } from '../GamePage';
import { Config } from './Menu';

type Props = { config: React.MutableRefObject<Config> };
type UserConfigArray = { playlists: Array<string>, saved_tracks: boolean }

const MenuConfigPanel: React.FC<Props> = (props: Props) => {
  const [ activeTab, setActiveTab ] = useState("configPresetsTab");
  const { setGamePageState } = useContext(GamePageStateContext);

  const switchTab = (tabState: string) => {
    setActiveTab(tabState);
  };

  const createGame = async () => {
    const users = new Map<string, UserConfigArray>(); // fromEntries doesn't like Sets
    props.config.current.users.forEach((v, k) => users.set(k, { playlists: Array.from(v.playlists), saved_tracks: v.saved_tracks}));
    const bodyJson = {
      settings: Object.fromEntries(props.config.current.settings),
      users: Object.fromEntries(users)
    };
    
    try {
      setGamePageState("loading");
      await fetch('http://127.0.0.1:5000/api/create_game', {
        credentials: "include",
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify(bodyJson)
      });
      setGamePageState("game");
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
        {activeTab === "configSettingsTab" ? <ConfigSettingsTab config={props.config} /> : <ConfigPresetsTab/> }
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
