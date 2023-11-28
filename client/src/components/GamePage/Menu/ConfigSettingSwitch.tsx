import React, { useState } from 'react';
import styles from "./Menu.module.sass";
import Switch from "@mui/material/Switch";
import { Config } from './Menu';

type Props = { config: React.MutableRefObject<Config>, id: string, name: string, defaultValue: boolean };

const ConfigSettingSwitch = (props: Props) => {
  const [ value, setValue ] = useState(() => {
    if (!props.config.current.settings.has(props.id)) {
      props.config.current.settings.set(props.id, props.defaultValue);
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
      <Switch name={props.name} checked={value} onChange={handleChange} />
      {props.name}
    </button>
  );
};

export default ConfigSettingSwitch;