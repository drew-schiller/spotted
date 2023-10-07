import React from 'react';
import AppHeader from '../components/AppHeader';
import HeroSection from '../components/HeroSection';
import AppFooter from '../components/AppFooter';
import InfoSection from '../components/InfoSection';


const LandingPage: React.FC = () => {
  return (
    <>
        <AppHeader/>
        <HeroSection />
        <div className="main-content-container">
          <InfoSection header="ABOUT THE GAME"/>
          <InfoSection header="HOW TO PLAY"/>
          <InfoSection header="ANOTHER SECTION"/>
        </div>
        <AppFooter/>
    </>
  );
};

export default LandingPage;
