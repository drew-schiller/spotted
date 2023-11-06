import React, { useState, useEffect} from "react";
import ConnPlayerWidget from "./ConnPlayerWidget";
import styles from "./Menu.module.sass";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = { maxPlayers: number };
type Image = { url: string, height: number, width: number };
type Playlist = { id: string, name: string };
type Player = { id: string, name: string, profile_pictures: Array<Image>, playlists: Array<Playlist> };

const MenuConnPanel = (props: Props) => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [update, setUpdate] = useState(true);

  const removePlayer = async (id: string) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/remove_user?id=${id}`, {credentials: "include", method: "POST"});
    } catch {
      console.error("ERROR: Unable to remove player from session.");
      return;
    }
    
    setUpdate(true);
  };

  useEffect(() => {
    if (!update) return;
    const getPlayers = async () => {
      console.log("Retrieving players...");
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users', {credentials: "include", method: "GET"});
        const responseJson = await response.json();
        setPlayers(responseJson["users"]);
      } catch {
        console.error("ERROR: Unable to read players from session.");
      }
    };

    getPlayers();
    setUpdate(false);
  }, [update, players]);

  const openAuth = async () => {
    try {
      const width = 500;
      const height = 400;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2.5;
      const title = `Spotify Authentification`;
      const response = await fetch('http://127.0.0.1:5000/api/add_user', {credentials: "include", method: "POST"});
      const url = (await response.json())["url"];
      const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
      setExternalPopup(popup);
    } catch {
      console.error("ERROR: Unable to open Spotify Authentification window.");
    }
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
        console.log("Awaiting authentification...");
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
        }).then(response => response.json()).then(() => {
          setUpdate(true);
        }).catch(() => {
          console.error("ERROR: API exception while adding player.");
        }).finally(() => {
          setExternalPopup(null);
          timer && clearInterval(timer);
        });
      }
    }, 500);
  }, [externalPopup]);

  return (
    <div className={styles.menuConnPanel}>
      <div className={`${styles.connPanelHeader} ${styles.panelHeaderText}`}>
        Players {`${players.length}/${props.maxPlayers}`}
      </div>
      <div className={styles.playersContainer}>
        {players.map(player => (
          <ConnPlayerWidget removePlayer={removePlayer} key={player['id']} id={player['id']} name={player['name']} profilePictureURL={player['profile_pictures'][1]['url']} playlists={player['playlists']}/>
        ))
      }
      </div>
      <div className={styles.addPlayerBtnContainer}>
        <button className={`${styles.addPlayerBtn} ${styles.addPlayerBtnText}`} onClick={openAuth}>
          <PersonAddIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default MenuConnPanel;
