import React from "react";
import styles from "./Menu.module.sass";
import { Config } from "./Menu";

type Props = { config: React.MutableRefObject<Config>, title: string; presetIcon: null, item_type: string, gamemode: string };

const ConfigPresetCard = (props: Props) => {

  const selectPreset = () => {
    props.config.current.item_type = props.item_type;
    props.config.current.gamemode = props.gamemode;
  };

  return (
    <button className={styles.configPresetCard} onClick={() => selectPreset()}>
      <div className={styles.iconContainer}></div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{props.title}</p>
      </div>
    </button>
  );
};

export default ConfigPresetCard;
