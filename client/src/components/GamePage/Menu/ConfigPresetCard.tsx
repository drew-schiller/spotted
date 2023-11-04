import React from "react";
import styles from "./Menu.module.sass";

type Props = { title: string; presetIcon: null };

const ConfigPresetCard = (props: Props) => {
  return (
    <button className={styles.configPresetCard}>
      <div className={styles.iconContainer}></div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{props.title}</p>
      </div>
    </button>
  );
};

export default ConfigPresetCard;
