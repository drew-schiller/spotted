import React, { useState } from "react";
import styles from "./Menu.module.sass";
import { Config } from './Menu';

type Props = { config: React.MutableRefObject<Config>, id: string, name: string };

const ConfigSettingInput = (props: Props) => {
  const [ value, setValue ] = useState(() => {
    if (!props.config.current.settings.has(props.id)) {
      props.config.current.settings.set(props.id, 0);
    }
    return Number(props.config.current.settings.get(props.id));
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    const n = Number(event.target.value);
    setValue(n);
    props.config.current.settings.set(props.id, n);
  };

  return (
    <button className={styles.configSetting}>
      <div className={styles.configSettingTxt}>
        {props.name}
      </div>
      <input name={props.name} type="number" min={1} max={99} value={value} onChange={handleChange} />
    </button>
  );
};

export default ConfigSettingInput;