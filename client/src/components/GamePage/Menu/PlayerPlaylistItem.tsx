import { useState } from 'react';
import styles from "./Menu.module.sass";
import Checkbox from "@mui/material/Checkbox";

type Props = { handleCheck: (playlistId: string, checked: boolean) => void, playlistId: string, playlistName: string };

const PlayerPlaylistItem = (props: Props) => {
  const [ value, setValue ] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    const b = event.target.checked;
    setValue(b);
    props.handleCheck(props.playlistId, b);
  };

  return (
    <div className={styles.playerPlaylistItem}>
      <Checkbox
        className={styles.playerPlaylistItemLeft}
        style={{ padding: 0 }}
        checked={value}
        onChange={handleChange}
      />
      <p className={styles.playerPlaylistItemRight}> {props.playlistName}</p>
    </div>
  );
};

export default PlayerPlaylistItem;
