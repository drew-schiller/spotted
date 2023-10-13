import React from "react";
import { Link } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <div className="app-header">
      <div className="logo">
        <Link className="link" to="./">
          logo
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
