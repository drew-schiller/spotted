import React from "react";
import AppHeader from "../components/AppHeader";
import HeroSection from "../components/HeroSection";
import AppFooter from "../components/AppFooter";
import InfoSections from "../components/InfoSection";

const LandingPage: React.FC = () => {
  return (
    <>
      <AppHeader />
      <HeroSection />
      <InfoSections />
      <AppFooter />
    </>
  );
};

export default LandingPage;
