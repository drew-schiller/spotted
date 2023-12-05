import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.sass";

type Props = {};

const HeroSection: React.FC = (props: Props) => {
  const description: string =
    "How well do you know your friend's music taste?\n";
  const description2: string = "Guess Groove and Grow with Spotted! ";

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <h1 className={styles.appTitle}>Spotted</h1>
        <p className={styles.appDescription}>{description}</p>
        <p className={styles.appDescription}>{description2}</p>
        <div className={styles.playBtnContainer}>
          <Link to="game">
            <button className={[styles.playBtnContainer, styles.btn].join(" ")}>
              PLAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
