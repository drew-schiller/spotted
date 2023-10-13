import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import AppHeader from "./components/LandingPage/AppHeader.tsx";
import AppFooter from "./components/LandingPage/AppFooter.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import App from "./app.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "menu",
    element: <MenuPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
