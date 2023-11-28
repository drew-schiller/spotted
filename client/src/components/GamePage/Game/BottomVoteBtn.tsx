import React from "react";
import styles from "./Game.module.sass";

type Props = { name: string; profilePictureURL: string };

const BottomVoteBtn = (props: Props) => {
  return (
    <div className={styles.bottomVoteBtn}>
      <div className={styles.profilePicture}>
        {/* <img
          className={styles.profilePictureImg}
          src={props.profilePictureURL}
          alt="profile picture"
        /> */}
      </div>
      <div className={styles.username}>{props.name}</div>
    </div>
  );
};

export default BottomVoteBtn;
