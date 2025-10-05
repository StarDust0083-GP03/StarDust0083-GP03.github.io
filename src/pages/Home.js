import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchPosts } from '../utils/searchUtils';
import { loadPosts } from '../utils/postLoader';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import './Home.css';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const loadPostsData = async () => {
      try {
        setLoading(true);
        const loadedPosts = await loadPosts();
        setPosts(loadedPosts);
        
        // 从URL参数中获取标签
        const tagFromUrl = searchParams.get('tag');
        if (tagFromUrl) {
          setSelectedTag(decodeURIComponent(tagFromUrl));
        }
      } catch (error) {
        console.error('加载文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPostsData();
  }, [searchParams]);
  
  const filteredPosts = useMemo(() => {
    return searchPosts(posts, searchQuery, selectedTag);
  }, [posts, searchQuery, selectedTag]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearchQuery(''); // 清除搜索查询
    // 更新URL参数
    setSearchParams({ tag: encodeURIComponent(tag) });
  };

  const clearTagFilter = () => {
    setSelectedTag(null);
    // 清除URL参数
    setSearchParams({});
  };

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>欢迎来到我的博客</h1>
          <p>分享技术、生活与思考</p>
        </div>
      </section>

      <section className="search-section">
        <div className="container">
          <SearchBox onSearch={handleSearch} />
        </div>
      </section>

      <section className="posts-section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <p>正在加载文章...</p>
            </div>
          ) : (
            <>
              {/* 标签筛选状态显示 */}
              {selectedTag && (
                <div className="tag-filter-status">
                  <span className="tag-filter-label">标签筛选:</span>
                  <span className="tag-filter-tag">{selectedTag}</span>
                  <button className="tag-filter-clear" onClick={clearTagFilter}>
                    ✕
                  </button>
                </div>
              )}
              
              {searchQuery || selectedTag ? (
                <SearchResults 
                  posts={filteredPosts} 
                  searchQuery={searchQuery}
                  onTagClick={handleTagClick}
                />
              ) : (
                <>
                  <h2>最新文章</h2>
                  <SearchResults 
                    posts={filteredPosts} 
                    searchQuery={searchQuery}
                    onTagClick={handleTagClick}
                  />
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;