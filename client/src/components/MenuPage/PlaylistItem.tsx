import React from "react";
import styles from "../../styles/MenuPage.module.sass";
import Checkbox from "@mui/material/Checkbox";

type Props = { playlistName: string };

const PlaylistItem = (props: Props) => {
  return (
    <div className={styles.playlistItem}>
      <Checkbox className={styles.playlistItemLeft} style={{ padding: 0 }} />
      <p className={styles.playlistItemRight}> {props.playlistName}</p>
    </div>
  );
};

export default PlaylistItem;
