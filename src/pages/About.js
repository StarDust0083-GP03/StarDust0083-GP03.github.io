import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTags } from '../utils/postLoader';
import './About.css';

const About = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const tagsData = await getAllTags();
        setTags(tagsData);
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTagClick = (tag) => {
    const encodedTag = encodeURIComponent(tag);
    navigate(`/?tag=${encodedTag}`);
  };

  return (
    <div className="about">
      <div className="container">
        <h1>关于我</h1>
        
        {loading ? (
          <div className="loading">
            <p>正在加载数据...</p>
          </div>
        ) : (
          <div className="about-content">
            <p>欢迎来到我的博客！这里是我分享技术见解、学习心得和生活感悟的地方。</p>
            
            <h2>博客统计</h2>
            <div className="stats">
              <div className="stat-item">
                <h3>标签 ({tags.length})</h3>
                <div className="tags-cloud">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      className="tag-item"
                      onClick={() => handleTagClick(tag)}
                      title={`点击筛选 ${tag} 标签的文章`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="contact-info">
              <h2>联系方式</h2>
              <p>如果您想与我联系，可以通过以下方式：</p>
              <ul>
                <li>GitHub: <a href="https://github.com/StarDust0083-GP03" target="_blank" rel="noopener noreferrer">StarDust0083-GP03</a></li>
                <li>Email: 您的邮箱地址</li>
              </ul>
            </div>
            
            <div className="back-home">
              <Link to="/" className="back-link">← 返回首页</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;