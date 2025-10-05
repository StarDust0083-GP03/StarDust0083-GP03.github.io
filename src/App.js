import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBox from './components/SearchBox';
import CollapsiblePost from './components/CollapsiblePost';
import About from './pages/About';
import { loadPosts } from './utils/postLoader';
import { searchPosts } from './utils/searchUtils';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const loadPostsData = async () => {
      try {
        setLoading(true);
        const loadedPosts = await loadPosts();
        setPosts(loadedPosts);
      } catch (error) {
        console.error('加载文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPostsData();
  }, []);

  const filteredPosts = useMemo(() => {
    return searchPosts(posts, searchQuery, selectedTag);
  }, [posts, searchQuery, selectedTag]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearchQuery('');
  };

  const clearTagFilter = () => {
    setSelectedTag(null);
  };

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="page-content">
        <div className="wrapper">
          {/* Hero Section */}
          <section id="home" className="hero-section">
            <div className="hero-content">
              <h1>欢迎来到我的博客</h1>
              <p>分享技术、生活与思考</p>
            </div>
          </section>

          {/* Search Section */}
          <section className="search-section">
            <div className="container">
              <SearchBox onSearch={handleSearch} />
              {selectedTag && (
                <div className="tag-filter-status">
                  <span className="tag-filter-label">标签筛选:</span>
                  <span className="tag-filter-tag">{selectedTag}</span>
                  <button className="tag-filter-clear" onClick={clearTagFilter}>
                    ✕
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Posts Section */}
          <section id="posts" className="posts-section">
            <div className="container">
              <h2>
                {searchQuery || selectedTag ? '搜索结果' : '所有文章'}
                {(searchQuery || selectedTag) && (
                  <span className="results-count"> ({filteredPosts.length} 篇)</span>
                )}
              </h2>
              
              {loading ? (
                <div className="loading">
                  <p>正在加载文章...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="posts-list">
                  {filteredPosts.map(post => (
                    <CollapsiblePost 
                      key={post.id} 
                      post={post}
                      onTagClick={handleTagClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-posts">
                  <p>没有找到匹配的文章。</p>
                </div>
              )}
            </div>
          </section>

          {/* About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <About onTagClick={handleTagClick} />
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;