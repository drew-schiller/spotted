import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/MenuPage.module.sass";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PlaylistItem from "./PlaylistItem";

type PlayerWidgetProps = { profilePictureURL: string; username: string };

const PlayerWidget: React.FC<PlayerWidgetProps> = (props) => {
  const [bottomHidden, setBottomHidden] = useState(false);
  return (
    <div className={styles.playerWidget}>
      <div className={styles.playerWidgetTop}>
        <div className={styles.profilePictureContainer}>
          <Link
            to={`https://open.spotify.com/user/${props.username}`}
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
          <Link
            className={styles.username}
            to={`https://open.spotify.com/user/${props.username}`}
            target="_blank"
          >
            {props.username}
          </Link>
        </div>
      </div>
      <div className={styles.playerWidgetBottom}>
        <div className={styles.playerPlaylistStack}>
          <PlaylistItem playlistName="playlistName" />
          <PlaylistItem playlistName="playlist2" />
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

export default PlayerWidget;
