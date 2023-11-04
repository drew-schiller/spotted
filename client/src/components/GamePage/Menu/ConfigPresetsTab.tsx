import React from "react";
import ConfigPresetCard from "./ConfigPresetCard";
import styles from "./Menu.module.sass";

type Props = {};

const ConfigPresetsTab: React.FC = (props: Props) => {
  return (
    <div className={styles.configPresetsTab}>
      <ConfigPresetCard title="test" presetIcon={null}></ConfigPresetCard>
      <ConfigPresetCard title="test" presetIcon={null}></ConfigPresetCard>
      <ConfigPresetCard title="test" presetIcon={null}></ConfigPresetCard>
      <ConfigPresetCard title="test" presetIcon={null}></ConfigPresetCard>
    </div>
  );
};

export default ConfigPresetsTab;
