import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';
import { highlightSearchTerm } from '../utils/searchUtils';
import './SearchResults.css';

const SearchResults = ({ posts, searchQuery, totalPosts, onTagClick }) => {
  const renderHighlightedText = (text, query) => {
    if (!query) return text;
    
    const highlightedText = highlightSearchTerm(text, query);
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const renderHighlightedArray = (items, query, tagType = 'tag') => {
    return items.map((item, index) => (
      <button 
        key={index} 
        className={`tag tag-clickable tag-${tagType}`}
        onClick={() => onTagClick && onTagClick(item)}
        title={`点击筛选 "${item}" 标签`}
      >
        {renderHighlightedText(item, query)}
      </button>
    ));
  };

  if (posts.length === 0 && searchQuery) {
    return (
      <div className="search-results">
        <div className="search-no-results">
          <div className="no-results-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <h3>未找到相关文章</h3>
          <p>没有找到包含 "{searchQuery}" 的文章。</p>
          <div className="search-suggestions-text">
            <p>建议：</p>
            <ul>
              <li>检查拼写是否正确</li>
              <li>尝试使用不同的关键词</li>
              <li>使用更通用的搜索词</li>
              <li>搜索相关的标签或分类</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      {searchQuery && (
        <div className="search-results-header">
          <h2>搜索结果</h2>
          <p className="search-results-count">
            找到 <strong>{posts.length}</strong> 篇相关文章
            {totalPosts && totalPosts !== posts.length && (
              <span className="total-posts"> (共 {totalPosts} 篇文章)</span>
            )}
          </p>
        </div>
      )}
      
      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="post-preview">
            <div className="post-header">
              <h3 className="post-title">
                <Link to={`/post/${post.slug}`}>
                  {renderHighlightedText(post.title, searchQuery)}
                </Link>
              </h3>
              <div className="post-meta">
                <time className="post-date" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
            </div>
            
            <div className="post-content">
              <div className="post-excerpt">
                {renderHighlightedText(post.excerpt, searchQuery)}
              </div>
              
              <div className="post-tags">
                {post.tags.length > 0 && (
                  <div className="tags-container">
                    <span className="label">标签:</span>
                    <div className="tags-list">
                      {renderHighlightedArray(post.tags, searchQuery, 'tag')}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="post-footer">
              <Link to={`/post/${post.slug}`} className="read-more">
                阅读全文 →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;