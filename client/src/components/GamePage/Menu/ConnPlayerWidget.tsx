import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.sass";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ClearIcon from "@mui/icons-material/Clear";
import PlayerPlaylistItem from "./PlayerPlaylistItem";
import { Config } from './Menu';
import { Playlist } from '../Game/Game';

type WidgetProps = { config: React.MutableRefObject<Config>, removePlayer: (id: string) => void, id: string, name: string, profilePictureURL: string, playlists: Array<Playlist> };

const ConnPlayerWidget: React.FC<WidgetProps> = (props) => {
  const [bottomHidden, setBottomHidden] = useState(false);

  const handleSavedTracksCheck = (id: string, checked: boolean) => {
    if (!props.config.current.users.has(props.id)) {
      props.config.current.users.set(props.id, { playlists: new Set<string>(), saved_tracks: false });
    }
    props.config.current.users.get(props.id)!.saved_tracks = checked;
  };

  const handlePlaylistCheck = (playlistId: string, checked: boolean) => {
    if (!props.config.current.users.has(props.id)) {
      props.config.current.users.set(props.id, { playlists: new Set<string>(), saved_tracks: false });
    }
    if (checked) {
      props.config.current.users.get(props.id)!.playlists.add(playlistId);
    } else {
      props.config.current.users.get(props.id)!.playlists.delete(playlistId);
    }
  };

  const [playlistItems] = useState<Array<JSX.Element>>(() => {
    return props.playlists.map(playlist => <PlayerPlaylistItem key={playlist['id']} handleCheck={handlePlaylistCheck} playlistId={playlist['id']} playlistName={playlist['name']}/>);
  });

  return (
    <div className={styles.connPlayerWidget}>
      <div className={styles.connPlayerWidgetTop}>
        <div className={styles.profilePictureContainer}>
          <Link
            to={`https://open.spotify.com/user/${props.id}`}
            target="_blank"
          >
            <img
              className={styles.profilePictureImg}
              src={props.profilePictureURL}
              alt="profile picture"
            />
          </Link>
        </div>

        <div className={styles.usernameContainer}>
          <button className={styles.username}>
            {props.name}
          </button>
          <div className={styles.removePlayerBtnContainer}>
            <button className={styles.removePlayerBtn} onClick={() => props.removePlayer(props.id)}>
              <ClearIcon
                fontSize="large"
                color="inherit"
                style={{ margin: 0 }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.connPlayerWidgetBottom}>
        <div className={styles.playerPlaylistStack}>
          <PlayerPlaylistItem handleCheck={handleSavedTracksCheck} playlistId="saved_tracks" playlistName="Saved Tracks"/>
          {playlistItems}
        </div>
        <div className={styles.displayStackBtnContainer}>
          <button className={styles.displayStackBtn}>
            <ExpandCircleDownIcon
              fontSize="large"
              color="inherit"
              style={{ margin: 0 }}
            />
          </button>
        </div>
      </div>
    </div>
  );

  // Username (link)
  // Profile Picture
  //
};

export default ConnPlayerWidget;
