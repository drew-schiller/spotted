import React from "react";
import { Link } from "react-router-dom";
import github_logo from "../../assets/github_logo.png";
import rcos_logo_red from "../../assets/rcos_logo_red.png";
import styles from "./common.module.sass";
type Props = {};

const AppFooter = (props: Props) => {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.footerCredits}>
        © 2023 Spotted by Jesse Gabriel and Drew Schiller
      </div>
      <div className={styles.footerSocial}>
        <ul>
          <li>
            <a className={styles.footerLogoLink} href="https://new.rcos.io/">
              <img
                className={styles.footerLogoImg}
                src={rcos_logo_red}
                alt="rcos logo"
              />
            </a>
          </li>
          <li>
            <a
              className={styles.footerLogoLink}
              href="https://github.com/drew-schiller/spotted"
            >
              <img
                className={styles.footerLogoImg}
                src={github_logo}
                alt="github logo"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default AppFooter;
