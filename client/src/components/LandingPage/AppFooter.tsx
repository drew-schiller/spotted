import React from "react";
import { Link } from "react-router-dom";
import rcos_logo_red from "../../assets/rcos_logo_red.png";
import github_logo from "../../assets/github_logo.png";

type Props = {};

const AppFooter = (props: Props) => {
  return (
    <footer className="app-footer">
      <div className="footer-credits">
        © 2023 Spotted by Jesse Gabriel and Drew Schiller
      </div>
      <div className="footer-social">
        <ul>
          <li>
            <a className="footer-logo-link" href="https://new.rcos.io/">
              <img
                className="footer-logo-img"
                src={rcos_logo_red}
                alt="rcos logo"
              />
            </a>
          </li>
          <li>
            <a
              className="footer-logo-link"
              href="https://github.com/drew-schiller/spotted"
            >
              <img
                className="footer-logo-img"
                src={github_logo}
                alt="github logo"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default AppFooter;
