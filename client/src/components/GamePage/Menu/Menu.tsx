import React, { useState, useEffect, useRef } from "react";
import MenuConfigPanel from "./MenuConfigPanel";
import MenuConnPanel from "./MenuConnPanel";
import styles from "./Menu.module.sass";

type Props = {};
export type Config = { settings: Map<string, number | boolean>, users: Map<string, Set<string>> };

const Menu: React.FC = (props: Props) => {
  const config: React.MutableRefObject<Config> = useRef({
    settings: new Map<string, number | boolean>(),
    users: new Map<string, Set<string>>()
  });
  const [ minimized, setMinimized ] = useState(false);

  const handleResize = () => {
    setMinimized(window.innerWidth < 810 || window.innerHeight < 700);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={` ${minimized ? styles.minimized : styles.menuModule}`}>
      <MenuConnPanel config={config} maxPlayers={8}/>
      <MenuConfigPanel config={config} />
    </div>
  );
};

export default Menu;