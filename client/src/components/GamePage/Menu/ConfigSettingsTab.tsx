import React from 'react';
import styles from "./Menu.module.sass";
import ConfigSettingSwitch from "./ConfigSettingSwitch";
import ConfigSettingInput from "./ConfigSettingInput";
import { Config } from './Menu';

type Props = { config: React.MutableRefObject<Config> };

const ConfigSettingsTab = (props: Props) => {

  return (
    <div className={styles.configSettingsTab}>
      <ConfigSettingInput config={props.config} id="rounds" name="Rounds" />
      <ConfigSettingSwitch config={props.config} id="allow_explicit" name="Allow Explicit Tracks" />
    </div>
  );
};

export default ConfigSettingsTab;
