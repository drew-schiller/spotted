import React from "react";
import styles from "./Menu.module.sass";
import Switch, { SwitchProps } from "@mui/material/Switch";

type Props = { name: string };

const GameSettingSwitch = (props: Props) => {
  return (
    <button className={styles.gameSetting}>
      <Switch />
      GameSetting
    </button>
  );
};

export default GameSettingSwitch;
