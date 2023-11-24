import Game from "./Game/Game";
import { useState, useEffect, createContext } from "react";
import styles from "./GamePage.module.sass";
import Menu from "./Menu/Menu";

type Props = {};
export const GamePageUpdateContext = createContext({
  gamePageUpdate: true,
  setGamePageUpdate: (update: boolean) => {},
});

const MenuPage: React.FC = (props: Props) => {
  const [page, setPage] = useState(<></>);
  const [gamePageUpdate, setGamePageUpdate] = useState(true);
  const context = { gamePageUpdate, setGamePageUpdate };

  useEffect(() => {
    const checkState = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/game_exists", {
          credentials: "include",
          method: "GET",
        });
        const responseJson = await response.json();
        if (responseJson["flag"] == true) {
          setPage(<Game />);
          return;
        }
      } catch {
        console.error("ERROR: Unable to determine session state.");
      }
      setPage(<Menu />);
    };

    checkState();
    setGamePageUpdate(false);
  }, [gamePageUpdate]);

  return (
    <div className={styles.page}>
      <GamePageUpdateContext.Provider value={context}>
        {page}
      </GamePageUpdateContext.Provider>
    </div>
  );
};

export default MenuPage;
