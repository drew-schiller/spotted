import React from "react";
import styles from "./Menu.module.sass";
import GameSettingSwitch from "./ConfigSettingSwitch";
import ConfigSettingInput from "./ConfigSettingInput";

type Props = { settings: React.MutableRefObject<Map<string, string>> };

const ConfigSettingsTab = (props: Props) => {

  return (
    <div className={styles.configSettingsTab}>
      <ConfigSettingInput settings={props.settings} name="Rounds" id="rounds" defaultValue={10} />
      <GameSettingSwitch settings={props.settings} name="Allow Explicit Tracks" id="allow_explicit" defaultValue={"on"} />
    </div>
  );
};

export default ConfigSettingsTab;
