import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getAllPosts } from '../utils/postLoader';
import { formatDate } from '../utils/dateUtils';
import MarkdownRenderer from '../components/MarkdownRenderer';
import './PostDetail.css';

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const postData = await getPostBySlug(slug);
        const postsData = await getAllPosts();
        setPost(postData);
        setAllPosts(postsData);
      } catch (error) {
        console.error('加载文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="post-detail">
        <div className="container">
          <div className="loading">
            <p>正在加载文章...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail">
        <div className="container">
          <div className="post-not-found">
            <h1>文章未找到</h1>
            <p>抱歉，找不到这篇文章。</p>
            <Link to="/" className="back-link">返回首页</Link>
          </div>
        </div>
      </div>
    );
  }

  // 找到上一篇和下一篇文章
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // 处理标签点击
  const handleTagClick = (tag) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </p>
        
        {post.tags.length > 0 && (
          <div className="post-tags">
            <span>标签:</span>
            {post.tags.map(tag => (
              <button 
                key={tag} 
                className="tag tag-clickable"
                onClick={() => handleTagClick(tag)}
                title={`点击筛选 "${tag}" 标签`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="post-content">
        <MarkdownRenderer content={post.content} />
      </div>

      <footer className="post-footer">
        <div className="post-navigation">
          {prevPost && (
            <Link className="prev-post" to={`/post/${prevPost.slug}`}>
              ← {prevPost.title}
            </Link>
          )}
          
          {nextPost && (
            <Link className="next-post" to={`/post/${nextPost.slug}`}>
              {nextPost.title} →
            </Link>
          )}
        </div>
        
        <div className="back-to-home">
          <Link to="/" className="back-home">← Back to All Posts</Link>
        </div>
      </footer>
    </article>
  );
};

export default PostDetail;