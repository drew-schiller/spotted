import React, { useContext, useEffect } from "react";
import { RoundContext } from "./Game";
import styles from "./Game.module.sass";
import { VotingContext } from "./GameBottomSect";
import { GameData, Track } from "./Game";

type Props = { gameData: React.MutableRefObject<GameData>, id: string, name: string, profilePictureURL: string };

const BottomVoteBtn = (props: Props) => {
  const { round, state, setState, roundStateByRound } = useContext(RoundContext);
  const { selected, setSelected } = useContext(VotingContext);

  const isSelected = () => {
    return selected.includes(props.id);
  }

  const getCorrectColor = () => {
    if (props.gameData.current.item_type == "track") {
      return (props.gameData.current.round_items[round-1] as Track).listener_ids.includes(props.id) ? "#2cc714" : "#bf1111";
    }
  }

  const onClick = () => {
    let new_state = state;
    let new_selected = selected;
    if (state == "voted") return;
    if (state == "unselected") {
      new_state = "selected"
    }
    if (isSelected()) {
      new_state = "unselected";
      new_selected = [];
    } else {
      new_selected = [ props.id ];
    }
    
    setState(new_state);
    roundStateByRound.set(round, new_state);
    setSelected(new_selected);
  };

  useEffect(() => {
    setSelected([]);
  }, [round]);

  return (
    <div className={styles.bottomVoteBtn} onClick={onClick} style={isSelected() ? {border:"5px solid #eb7434", margin:"0px"} : (state == "voted") ? {border: `5px solid ${getCorrectColor()}`, margin:"0px"} : {}}>
      <div className={styles.profilePicture}>
        {<img
          className={styles.profilePictureImg}
          src={props.profilePictureURL}
          alt="profile picture"
        />}
      </div>
      <div className={styles.username}>{props.name}</div>
    </div>
  );
};

export default BottomVoteBtn;
