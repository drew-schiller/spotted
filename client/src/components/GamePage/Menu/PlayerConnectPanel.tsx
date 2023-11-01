import React from "react";
import GameConfigPanel from "./GameConfigPanel";
import PlayerWidget from "./PlayerWidget";
import styles from "./Menu.module.sass";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = {};

const testImg =
  "https://i.scdn.co/image/ab67616d0000b273de3c04b5fc750b68899b20a9";

const testUser = "d.schiller";

const PlayerConnectPanel = (props: Props) => {
  return (
    <div className={styles.playerConnectPanel}>
      <div
        className={`${styles.playerConnectHeader} ${styles.panelHeaderText}`}
      >
        Players {`${1}/${8}`}
      </div>
      <div className={styles.playersContainer}>
        <PlayerWidget username={testUser} profilePictureURL={testImg} />
        <PlayerWidget username={testUser} profilePictureURL={testImg} />
      </div>
      <div className={styles.addPlayerBtnContainer}>
        <button className={`${styles.addPlayerBtn} ${styles.addPlayerBtnText}`}>
          <PersonAddIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default PlayerConnectPanel;
