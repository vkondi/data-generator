import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">{`©  ${currentYear} Data Generator`}</p>
      </div>
    </footer>
  );
};

export default Footer;
