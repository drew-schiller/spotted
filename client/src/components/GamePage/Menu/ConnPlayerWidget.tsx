import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.sass";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PlayerPlaylistItem from "./PlayerPlaylistItem";

type WidgetProps = { profilePictureURL: string; username: string };

const ConnPlayerWidget: React.FC<WidgetProps> = (props) => {
  const [bottomHidden, setBottomHidden] = useState(false);
  return (
    <div className={styles.connPlayerWidget}>
      <div className={styles.connPlayerWidgetTop}>
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
      <div className={styles.connPlayerWidgetBottom}>
        <div className={styles.playerPlaylistStack}>
          <PlayerPlaylistItem playlistName="playlistName" />
          <PlayerPlaylistItem playlistName="playlist2" />
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
