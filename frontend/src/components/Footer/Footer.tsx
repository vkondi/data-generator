/**
 * Footer component that displays the current year and a copyright notice.
 *
 * @returns {JSX.Element} The rendered footer component.
 */

import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">{`© ${currentYear} Data Generator`}</p>
      </div>
    </footer>
  );
};

export default Footer;
