import React, { useState } from "react";

import styles from "./Menu.module.sass";
import ConfigPresetsTab from "./ConfigPresetsTab";
import ConfigSettingsTab from "./ConfigSettingsTab";

type Props = {};

const menuConfigPanel: React.FC = (props: Props) => {
  const [activeTab, setActiveTab] = useState("configPresetsTab");

  const switchTab = (tabState: string) => {
    setActiveTab(tabState);
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
        {activeTab === "configSettingsTab" ? (
          <ConfigSettingsTab />
        ) : (
          <ConfigPresetsTab />
        )}
      </div>
      <div className={`${styles.playBtnContainer}`}>
        <button className={`${styles.playBtn} ${styles.playBtnText}`}>
          PLAY
        </button>
      </div>
    </div>
  );
};

export default menuConfigPanel;
