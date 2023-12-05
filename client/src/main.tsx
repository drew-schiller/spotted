import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.tsx";
import GamePage from "./components/GamePage/GamePage.tsx";
import CallbackPage from "./components/CallbackPage/CallbackPage.tsx"
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "game",
    element: <GamePage />,
  },
  {
    path: "callback",
    element: <CallbackPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
