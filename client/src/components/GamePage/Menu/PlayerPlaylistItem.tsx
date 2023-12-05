import { useState } from 'react';
import styles from "./Menu.module.sass";
import Checkbox from "@mui/material/Checkbox";
import { Config } from './Menu';

type Props = { config: React.MutableRefObject<Config>, playerId: string, playlistId: string, playlistName: string };

const PlayerPlaylistItem = (props: Props) => {
  const [ value, setValue ] = useState(() => {
    if (!props.config.current.users.has(props.playerId)) {
      props.config.current.users.set(props.playerId, { playlists: new Set<string>(), saved_tracks: false });
      return false;
    }
    if (props.playlistId == "saved_tracks") {
      return props.config.current.users.get(props.playerId)!.saved_tracks;
    }
    return props.config.current.users.get(props.playerId)!.playlists.has(props.playlistId);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    const b = event.target.checked;
    setValue(b);
    if (props.playlistId == "saved_tracks") {
      props.config.current.users.get(props.playerId)!.saved_tracks = b;
    } else {
      if (b) {
        props.config.current.users.get(props.playerId)!.playlists.add(props.playlistId);
      } else {
        props.config.current.users.get(props.playerId)!.playlists.delete(props.playlistId);
      }
    }
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
