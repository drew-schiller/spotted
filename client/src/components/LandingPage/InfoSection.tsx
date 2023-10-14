import React from "react";
import styles from "../../styles/LandingPage.module.sass";

const InfoSections = () => {
  return (
    <div className={styles.infoSectionsContainer}>
      <section className={styles.infoSection}>
        <h2>ABOUT THE GAME:</h2>
        <p className={styles.description}>
          Spotted is a web game that involves your music taste and challenges
          you to see how well you know your friends. The game is meant to be
          played with your friends present, with each person joined on their
          individual devices. In the default game mode, players submit links to
          one of their Spotify playlists, and the game pools together all songs
          from every playlist. Each round, a new song is chosen, and players
          have to guess which one of their friends has this song in their
          playlist. Players with the most number of right guesses after every
          round win.
        </p>
      </section>
      <section className={styles.infoSection}>
        <h2>HOW TO PLAY:</h2> <p className={styles.description}>TODO</p>
      </section>
      <section className={styles.infoSection}>
        <h2>HOW IT WORKS:</h2>
        <p className={styles.description}>TODO</p>
      </section>
    </div>
  );
};

export default InfoSections;
