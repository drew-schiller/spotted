import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/LandingPage.module.sass";
import monkeyTextLogo2 from "../../assets/monkeyText2.png";
import monkeyLogo2 from "../../assets/monkey2.png";

const AppHeader: React.FC = () => {
  return (
    <div className={styles.appHeader}>
      {/* <div className={styles.headerLogoContainer}> */}
      <Link className={styles.headerLogoLink} to="./">
        <img
          className={styles.headerLogo}
          src={monkeyLogo2}
          alt="Monkey Logo"
        />
      </Link>
      {/* </div> */}
    </div>
  );
};

export default AppHeader;
