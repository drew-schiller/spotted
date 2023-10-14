import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/LandingPage.module.sass";

const AppHeader: React.FC = () => {
  return (
    <div className={styles.appHeader}>
      <div className={styles.logo}>
        <Link className={styles.link} to="./">
          logo
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
