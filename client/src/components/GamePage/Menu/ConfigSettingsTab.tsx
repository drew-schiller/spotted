import React from "react";
import styles from "./Menu.module.sass";
import GameSettingSwitch from "./ConfigSettingSwitch";
import ConfigSettingInput from "./ConfigSettingInput";

type Props = {};

const ConfigSettingsTab = (props: Props) => {
  return (
    <div className={styles.configSettingsTab}>
      <GameSettingSwitch name="setting1" />
      <GameSettingSwitch name="setting2" />
      <ConfigSettingInput name="setting3" />
      <GameSettingSwitch name="setting2" />
      <ConfigSettingInput name="setting3" />
      <ConfigSettingInput name="setting3" />
    </div>
  );
};

export default ConfigSettingsTab;
