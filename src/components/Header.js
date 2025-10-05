import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site-header">
      <div className="wrapper">
        <Link className="site-title" to="/">StarDust0083 Blog</Link>
        <nav className="site-nav">
          <div className="trigger">
            <Link className="page-link" to="/">Home</Link>
            <Link className="page-link" to="/about">About</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;