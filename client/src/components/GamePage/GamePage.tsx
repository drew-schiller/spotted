import Game from "./Game/Game";
import { useState, useEffect, createContext } from "react";
import styles from "./GamePage.module.sass";
import Menu from "./Menu/Menu";
import Loading from "./Loading";

type Props = {};
export const GamePageStateContext = createContext({
  gamePageState: "",
  setGamePageState: (state: string) => { state }
});

const GamePage: React.FC = (props: Props) => {
  const [page, setPage] = useState(<></>);
  const [gamePageState, setGamePageState] = useState("");
  const contextValue = { gamePageState, setGamePageState };

  useEffect(() => {
    const checkState = async () => {
      setPage(<Loading />);
      if (gamePageState == "loading") return;

      try {
        const response = await fetch("http://127.0.0.1:5000/api/game_exists", {
          credentials: "include",
          method: "GET",
        });
        const responseJson = await response.json();
        if (responseJson["flag"] == true) {
          setPage(<Game />);
          setGamePageState("game");
          return;
        }
      } catch {
        console.error("ERROR: Unable to determine session state.");
      }
      setPage(<Menu />);
      setGamePageState("menu");
    };

    checkState();
  }, [gamePageState]);

  return (
    <div className={styles.page}>
      <GamePageStateContext.Provider value={contextValue}>
        {page}
      </GamePageStateContext.Provider>
    </div>
  );
};

export default GamePage;
