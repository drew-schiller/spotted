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

  const [playlistItems] = useState<Array<JSX.Element>>(
    props.playlists.map(playlist => <PlayerPlaylistItem key={playlist.id} config={props.config} playerId={props.id} playlistId={playlist.id} playlistName={playlist.name}/>)
  );

  const getBottom = () => {
    if (bottomHidden) return;
    return (
      <div className={styles.connPlayerWidgetBottom}>
        <div className={styles.playerPlaylistStack}>
          <PlayerPlaylistItem key="saved_tracks" config={props.config} playerId={props.id} playlistId="saved_tracks" playlistName="Saved Tracks"/>
          {playlistItems}
        </div>
        <div className={styles.displayStackBtnContainer}>
          <button className={styles.displayStackBtn} onClick={() => setBottomHidden(!bottomHidden)}>
            <ExpandCircleDownIcon
              fontSize="large"
              color="inherit"
              style={{ margin: 0 }}
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.connPlayerWidget}>
      <div className={styles.connPlayerWidgetTop} onClick={() => setBottomHidden(!bottomHidden)}>
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
      {getBottom()}
    </div>
  );

  // Username (link)
  // Profile Picture
  //
};

export default ConnPlayerWidget;
