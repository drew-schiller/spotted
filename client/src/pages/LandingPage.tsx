import React from "react";
import AppHeader from "../components/LandingPage/AppHeader";
import HeroSection from "../components/LandingPage/HeroSection";
import AppFooter from "../components/LandingPage/AppFooter";
import InfoSections from "../components/LandingPage/InfoSection";

import "../styles/LandingPage.sass";

const LandingPage: React.FC = () => {
  return (
    <div className="page">
      <HeroSection />
      <InfoSections />
    </div>
  );
};

export default LandingPage;
