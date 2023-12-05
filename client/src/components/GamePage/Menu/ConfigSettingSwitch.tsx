import React, { useState } from 'react';
import styles from "./Menu.module.sass";
import Switch from "@mui/material/Switch";
import { Config } from './Menu';

type Props = { config: React.MutableRefObject<Config>, id: string, name: string };

const ConfigSettingSwitch = (props: Props) => {
  const [ value, setValue ] = useState(() => {
    if (!props.config.current.settings.has(props.id)) {
      props.config.current.settings.set(props.id, false);
    }
    return Boolean(props.config.current.settings.get(props.id));
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    const b = Boolean(event.target.checked);
    setValue(b);
    props.config.current.settings.set(props.id, b);
  };

  return (
    <button className={styles.configSetting}>
      <div className={styles.configSettingTxt}>
        {props.name}
      </div>
      <Switch name={props.name} checked={value} onChange={handleChange} />
    </button>
  );
};

export default ConfigSettingSwitch;