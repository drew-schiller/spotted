import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  const description: string =
    "How well do you know your friend's music taste?\n";
  const description2: string = "Guess Groove and Grow with Spotted! ";

  return (
    <div className="hero-section">
      <div className="hero-container">
        <h1 className="app-title">Spotted</h1>
        <p className="app-description">{description}</p>
        <p className="app-description">{description2}</p>
        <div className="play-btn-container">
          <button className="play-btn btn">PLAY</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
