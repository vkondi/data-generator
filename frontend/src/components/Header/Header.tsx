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
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Rapid Data</h1>
      </div>
    </header>
  );
};

export default Header;
