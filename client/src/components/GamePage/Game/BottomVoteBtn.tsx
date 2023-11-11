import React from "react";
import styles from "./Game.module.sass";

type Props = {};

const BottomVoteBtn = (props: Props) => {
  return (
    <div className={styles.bottomVoteBtn}>
      <div className={styles.profilePicture}></div>
      <div className={styles.username}>username</div>
    </div>
  );
};

export default BottomVoteBtn;
