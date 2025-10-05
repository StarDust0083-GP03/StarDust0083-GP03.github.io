import React from 'react';

const Header = ({ activeSection, setActiveSection }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection && setActiveSection(sectionId);
    }
  };

  return (
    <header className="site-header">
      <div className="wrapper">
        <button 
          className="site-title" 
          onClick={() => scrollToSection('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          StarDust0083 Blog
        </button>
        <nav className="site-nav">
          <div className="trigger">
            <button 
              className={`page-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              首页
            </button>
            <button 
              className={`page-link ${activeSection === 'posts' ? 'active' : ''}`}
              onClick={() => scrollToSection('posts')}
            >
              文章
            </button>
            <button 
              className={`page-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              关于
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;