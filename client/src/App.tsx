import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.tsx";
import AppHeader from "./components/common/AppHeader.tsx";
import AppFooter from "./components/common/AppFooter.tsx";
import GamePage from "./components/GamePage/GamePage.tsx";
import "../index.sass";

type Props = {};

const App: React.FC = (props: Props) => {
  return (
    <div className="app">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="menu" element={<GamePage />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </div>
  );
};

export default App;
