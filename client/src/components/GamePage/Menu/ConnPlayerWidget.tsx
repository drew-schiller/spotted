import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.sass";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ClearIcon from "@mui/icons-material/Clear";
import PlayerPlaylistItem from "./PlayerPlaylistItem";

type Playlist = { id: string, name: string };
type WidgetProps = { removePlayer: (id: string) => void, id: string, name: string, profilePictureURL: string, playlists: Array<Playlist> };

const ConnPlayerWidget: React.FC<WidgetProps> = (props) => {
  const [bottomHidden, setBottomHidden] = useState(false);
  const [playlistItems, setPlaylistItems]= useState<Array<JSX.Element>>(() => {
    return props.playlists.map(playlist => <PlayerPlaylistItem key={playlist['id']} playlistId={playlist['id']} playlistName={playlist['name']}/>)
  });
  const removePlayer = () => props.removePlayer(props.id);

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
            <button className={styles.removePlayerBtn} onClick={removePlayer}>
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
