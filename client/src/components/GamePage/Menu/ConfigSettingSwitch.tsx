import React, { useState } from "react";
import styles from "./Menu.module.sass";
import Switch, { SwitchProps } from "@mui/material/Switch";

type Props = { settings: React.MutableRefObject<Map<string, string>>, name: string, id: string, defaultValue: string };

const GameSettingSwitch = (props: Props) => {
  const [ value, setValue ] = useState(props.defaultValue);
  
  const setSetting = (setting: string) => {
    setValue(setting);
    if (setting == "on") setting = "True";
    else setting = "False";
    props.settings.current.set(props.id, setting);
  };

  return (
    <button className={styles.configSetting}>
      <Switch name={props.name} value={value} onChange={(e) => setSetting(e.target.value)} />
    </button>
  );
};

export default GameSettingSwitch;
