import React from "react";
import styles from "./Menu.module.sass";
import GameSettingSwitch from "./GameSettingSwitch";
import GameSettingInput from "./GameSettingInput";

type Props = {};

const SettingsTab = (props: Props) => {
  return (
    <div className={styles.settingsTab}>
      <GameSettingSwitch name="setting1" />
      <GameSettingSwitch name="setting2" />
      <GameSettingInput name="setting3" />
      <GameSettingSwitch name="setting2" />
      <GameSettingInput name="setting3" />
      <GameSettingInput name="setting3" />
    </div>
  );
};

export default SettingsTab;
