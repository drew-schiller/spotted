import React from "react";
import { Link } from "react-router-dom";
import styles from "./common.module.sass";
import monkeySnorkel from "../../assets/monkeyheadsnorkel.png";
import monkeyHead from "../../assets/monkeyHead.png";

const AppHeader: React.FC = () => {
  return (
    <div className={styles.appHeader}>
      {/* <div className={styles.headerLogoContainer}> */}
      <Link className={styles.headerLogoLink} to="./">
        <img
          className={styles.headerLogo}
          src={monkeyHead}
          alt="Monkey Logo"
        />
      </Link>
      <Link className={styles.headerLogoLink} to="dive">
        <img
          className={styles.headerLogo}
          src={monkeySnorkel}
          alt="Monkey Dive Logo"
        />
      </Link>
      {/* </div> */}
    </div>
  );
};

export default AppHeader;
