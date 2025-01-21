/**
 * Header component that displays the main header of the application.
 *
 * This component includes:
 * - A title "Data Generator"
 * - A navigation section with a "Generator" link
 * - A settings icon
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */

import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Data Generator</h1>
        <nav className="header-nav">
          <div className="nav-link">Generator</div>
          <span className="settings-icon" data-testid="settings-icon">
            <SettingsIcon />
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
