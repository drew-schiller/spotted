import React from "react";
import styles from "./Menu.module.sass";
import Checkbox from "@mui/material/Checkbox";

type Props = { playlistId: string, playlistName: string };

const playerPlaylistItem = (props: Props) => {
  return (
    <div className={styles.playerPlaylistItem}>
      <Checkbox
        className={styles.playerPlaylistItemLeft}
        style={{ padding: 0 }}
      />
      <p className={styles.playerPlaylistItemRight}> {props.playlistName}</p>
    </div>
  );
};

export default playerPlaylistItem;
