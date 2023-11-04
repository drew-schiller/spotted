import React from "react";
import { useEffect, useMemo, useState, useCallback } from "react";
import GameConfigPanel from "./GameConfigPanel";
import PlayerWidget from "./PlayerWidget";
import styles from "../../styles/MenuPage.module.sass";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = {};

type Image = {
  url: string,
  width: number,
  height: number
}

type Player = {
  id: string,
  name: string,
  profile_pictures: Array<Image>
}

const PlayerConnectPanel = (props: Props) => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const player_widgets: Array<JSX.Element> = useMemo(() => [], []);

  const addPlayer = useCallback((player: Player) => {
    console.log(player['name']);
    player_widgets.push(<div><PlayerWidget id={player['id']} name={player['name']} profilePictureURL={player['profile_pictures'][0]['url']}/></div>);
  }, [player_widgets]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/users', {credentials: "include", method: "GET"}).then(response => response.json()).then(json => {
      for(let i = 0; i < json['count']; ++i) {
        const player = json['users'][i];
        player_widgets.push(<div><PlayerWidget id={player['id']} name={player['name']} profilePictureURL={player['profile_pictures'][0]['url']}/></div>);
      }
    });
    return () => {
      player_widgets.length = 0;
    }
  }, [player_widgets]);

  const openAuth = async () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = `Spotify Authentification`;
    const response = await fetch('http://127.0.0.1:5000/api/add_user', {credentials: "include", method: "POST"});
    const url = await response.json();
    const popup = window.open(url["url"], title, `width=${width},height=${height},left=${left},top=${top}`);
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) return;

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      let currentUrl;
      try {
        currentUrl = externalPopup.location.href;
      } catch {
        console.log("Failed capturing HREF.");
      }
      if (!currentUrl) return;
      const searchParams = new URL(currentUrl).searchParams;
      const code = searchParams.get('code');
      if (code) {
        externalPopup.close();
        fetch(`http://127.0.0.1:5000/api/callback?code=${code}`, {
          method: "POST",
          credentials: "include",
          mode: "cors"
        }).then(response => response.json()).then(player => {
          addPlayer(player);
        }).catch(() => {
          console.error("API error while adding user.");
        }).finally(() => {
          setExternalPopup(null);
          timer && clearInterval(timer);
        });
      }
    }, 500);
  }, [externalPopup, addPlayer]);

  return (
    <div className={styles.playerConnectPanel}>
      <div
        className={`${styles.playerConnectHeader} ${styles.panelHeaderText}`}
      >
        Players {`${player_widgets.length}/${8}`}
      </div>
      <div className={styles.playersContainer}>
        {player_widgets}
      </div>
      <div className={styles.addPlayerBtnContainer}>
        <button className={`${styles.addPlayerBtn} ${styles.addPlayerBtnText}`} onClick={openAuth}>
          <PersonAddIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default PlayerConnectPanel;
