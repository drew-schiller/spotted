import React from "react";
import HeroSection from "./HeroSection";
import InfoSections from "./InfoSection";
import { Form } from "react-router-dom";
import styles from "./LandingPage.module.sass";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <HeroSection />
      <InfoSections />
    </div>
  );
};

export default LandingPage;
