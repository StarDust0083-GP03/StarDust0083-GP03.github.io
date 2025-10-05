import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="wrapper">
        <div className="footer-col-wrapper">
          <div className="footer-col">
            <p>A personal blog powered by React and GitHub Pages</p>
          </div>
          <div className="footer-col">
            <p>&copy; {currentYear} StarDust0083. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;