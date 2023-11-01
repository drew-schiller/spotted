import React, { useState } from "react";

import styles from "./Menu.module.sass";
import PresetsTab from "./PresetsTab";
import SettingsTab from "./SettingsTab";

type Props = {};

const GameConfigPanel: React.FC = (props: Props) => {
  const [activeTab, setActiveTab] = useState("presetsTab");

  const switchTab = (tabState: string) => {
    setActiveTab(tabState);
  };

  return (
    <div className={styles.gameConfigPanel}>
      <div className={styles.tabbedHeader}>
        <button
          className={`${styles.presetsBtn} ${styles.panelHeaderText} ${
            activeTab === "presetsTab" ? styles.activeTab : ""
          }`}
          onClick={() => switchTab("presetsTab")}
        >
          presets
        </button>
        <button
          className={`${styles.settingsBtn} ${styles.panelHeaderText} ${
            activeTab === "settingsTab" ? styles.activeTab : ""
          }`}
          onClick={() => switchTab("settingsTab")}
        >
          settings
        </button>
      </div>
      <div className={styles.configInterface}>
        {activeTab === "settingsTab" ? <SettingsTab /> : <PresetsTab />}
      </div>
      <div className={`${styles.playBtnContainer}`}>
        <button className={`${styles.playBtn} ${styles.playBtnText}`}>
          PLAY
        </button>
      </div>
    </div>
  );
};

export default GameConfigPanel;
