import React from "react";
import GamePresetCard from "./GamePresetCard";
import styles from "../../styles/MenuPage.module.sass";

type Props = {};

const PresetsTab: React.FC = (props: Props) => {
  return (
    <div className={styles.presetsTab}>
      <GamePresetCard title="test" presetIcon={null}></GamePresetCard>
      <GamePresetCard title="test" presetIcon={null}></GamePresetCard>
      <GamePresetCard title="test" presetIcon={null}></GamePresetCard>
      <GamePresetCard title="test" presetIcon={null}></GamePresetCard>
    </div>
  );
};

export default PresetsTab;
