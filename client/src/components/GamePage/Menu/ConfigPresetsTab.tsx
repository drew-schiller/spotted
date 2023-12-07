import React from "react";
import ConfigPresetCard from "./ConfigPresetCard";
import styles from "./Menu.module.sass";
import { Config } from "./Menu";

type Props = { config: React.MutableRefObject<Config> };

const ConfigPresetsTab: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.configPresetsTab}>
      <ConfigPresetCard config={props.config} title="classic" presetIcon={null} item_type="track" gamemode="vote" />
      <ConfigPresetCard config={props.config} title="album" presetIcon={null} item_type="album" gamemode="vote" />
      <ConfigPresetCard config={props.config} title="artist" presetIcon={null} item_type="artist" gamemode="vote" />
    </div>
  );
};

export default ConfigPresetsTab;
