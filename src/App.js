import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PostDetail from './pages/PostDetail';
import './App.css';

function App() {
  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/StarDust0083-GP03.github.io' : ''}>
      <div className="App">
        <Header />
        <main className="page-content">
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/post/:slug" element={<PostDetail />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;