import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import MenuConfigPanel from "./MenuConfigPanel";
import MenuConnPanel from "./MenuConnPanel";
import styles from "./Menu.module.sass";

type Props = {};

const Menu: React.FC = (props: Props) => {
  const [minimized, setMinimized] = useState(false);

  const handleResize = () => {
    setMinimized(window.innerWidth < 750 || window.innerHeight < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={` ${minimized ? styles.minimized : styles.menuModule}`}>
      <MenuConnPanel maxPlayers={8}/>
      <MenuConfigPanel />
    </div>
  );
};

export default Menu;
