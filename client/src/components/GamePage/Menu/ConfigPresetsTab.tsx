import React, { useState, createContext } from "react";
import ConfigPresetCard from "./ConfigPresetCard";
import styles from "./Menu.module.sass";
import { Config } from "./Menu";

type Props = { config: React.MutableRefObject<Config> };
export const SelectedPresetContext = createContext({ selected: "", setSelected: (s: string) => { s }})

const ConfigPresetsTab: React.FC<Props> = (props: Props) => {
  const [ selected, setSelected ] = useState("classic");
  const context = { selected, setSelected };

  return (
    <SelectedPresetContext.Provider value={context}>
      <div className={styles.configPresetsTab}>
        <ConfigPresetCard config={props.config} id="classic" presetIcon={null} item_type="track" gamemode="vote" />
        <ConfigPresetCard config={props.config} id="album" presetIcon={null} item_type="album" gamemode="vote" />
        <ConfigPresetCard config={props.config} id="artist" presetIcon={null} item_type="artist" gamemode="vote" />
      </div>
    </SelectedPresetContext.Provider>
  );
};

export default ConfigPresetsTab;
