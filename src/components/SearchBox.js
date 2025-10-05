import React, { useState, useEffect, useRef } from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearch, placeholder = "搜索文章..." }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // 全局键盘快捷键支持
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Ctrl+K 或 Cmd+K 聚焦搜索框
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // ESC 清空搜索
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        handleClear();
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // 移除搜索建议功能，仅保留基本搜索

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e) => {
    // 仅处理 Escape 键
    if (e.key === 'Escape') {
      handleClear();
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  // 移除 handleBlur，因为没有建议需要处理

  return (
    <div className="search-box">
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {!query && (
            <div className="search-shortcut-hint">
              <span className="search-shortcut-key">Ctrl</span>
              <span>+</span>
              <span className="search-shortcut-key">K</span>
            </div>
          )}
          {query && (
            <button
              className="search-clear"
              onClick={handleClear}
              type="button"
              aria-label="清除搜索"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {query && (
        <div className="search-info">
          <span className="search-query">搜索: "{query}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBox;