import React from "react";
import styles from "../../styles/MenuPage.module.sass";
import Checkbox from "@mui/material/Checkbox";

type PlaylistItemProps = { id: string; name: string; };

const PlaylistItem = (props: PlaylistItemProps) => {
  return (
    <div className={styles.playlistItem}>
      <Checkbox className={styles.playlistItemLeft} style={{ padding: 0 }} />
      <p className={styles.playlistItemRight}> {props.name}</p>
    </div>
  );
};

export default PlaylistItem;
