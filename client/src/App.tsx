import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import AppHeader from "./components/LandingPage/AppHeader.tsx";
import AppFooter from "./components/LandingPage/AppFooter.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import "../index.sass";
type Props = {};

const App: React.FC = (props: Props) => {
  return (
    <div className="app">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="menu" element={<MenuPage />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </div>
  );
};

export default App;
