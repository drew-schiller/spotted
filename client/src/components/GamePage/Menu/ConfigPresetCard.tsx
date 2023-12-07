import React, { useContext } from "react";
import styles from "./Menu.module.sass";
import { Config } from "./Menu";
import { SelectedPresetContext } from "./ConfigPresetsTab";

type Props = { config: React.MutableRefObject<Config>, id: string; presetIcon: null, item_type: string, gamemode: string };

const ConfigPresetCard = (props: Props) => {
  const { selected, setSelected } = useContext(SelectedPresetContext);

  const selectPreset = () => {
    props.config.current.item_type = props.item_type;
    props.config.current.gamemode = props.gamemode;
    setSelected(props.id);
  };

  return (
    <button className={styles.configPresetCard} onClick={() => selectPreset()} style={(selected == props.id) ? {border:"3px solid #8644ca"} : {}}>
      <div className={styles.iconContainer}></div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{props.id}</p>
      </div>
    </button>
  );
};

export default ConfigPresetCard;
