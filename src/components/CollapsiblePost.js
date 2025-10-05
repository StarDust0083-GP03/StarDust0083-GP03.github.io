import React, { useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import MarkdownRenderer from './MarkdownRenderer';
import './CollapsiblePost.css';

const CollapsiblePost = ({ post, isExpanded = false, onTagClick }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleTagClick = (tag, event) => {
    event.stopPropagation(); // Prevent post from expanding/collapsing
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <article className={`collapsible-post ${expanded ? 'expanded' : 'collapsed'}`} id={`post-${post.slug}`}>
      <header className="post-header" onClick={toggleExpanded}>
        <div className="post-header-content">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-meta">
            <time className="post-date" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <button 
                    key={index} 
                    className="tag tag-clickable"
                    onClick={(e) => handleTagClick(tag, e)}
                    title={`点击筛选 "${tag}" 标签`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="expand-icon">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={expanded ? 'rotated' : ''}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      </header>
      
      {expanded && (
        <div className="post-content">
          <div className="post-excerpt">
            {post.excerpt}
          </div>
          <div className="post-body">
            <MarkdownRenderer content={post.content} />
          </div>
        </div>
      )}
    </article>
  );
};

export default CollapsiblePost;