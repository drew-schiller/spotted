import React from "react";
import HeroSection from "../components/LandingPage/HeroSection";
import InfoSections from "../components/LandingPage/InfoSection";
import { Form } from "react-router-dom";
import styles from "../styles/LandingPage.module.sass";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <HeroSection />
      <InfoSections />
    </div>
  );
};

export default LandingPage;
