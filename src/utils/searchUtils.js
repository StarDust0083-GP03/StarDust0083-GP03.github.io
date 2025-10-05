// 搜索工具函数

/**
 * 搜索博客文章
 * @param {Array} posts - 文章数组
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的文章数组，按相关性排序
 */
export const searchPosts = (posts, query, selectedTag = null) => {
  // 如果选择了标签，先按标签筛选
  let filteredPosts = posts;
  if (selectedTag) {
    filteredPosts = posts.filter(post => 
      post.tags && post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
    );
  }

  // 如果没有搜索查询且没有选择标签，返回所有文章
  if (!query || query.trim() === '') {
    return filteredPosts;
  }

  const searchTerm = query.toLowerCase().trim();
  const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0);
  
  const scoredPosts = filteredPosts.map(post => {
    let score = 0;
    
    // 计算每个搜索词的匹配分数
    searchWords.forEach(word => {
      // 标题匹配 (权重最高)
      if (post.title.toLowerCase().includes(word)) {
        score += post.title.toLowerCase() === word ? 100 : 50;
      }
      
      // 标签匹配 (权重较高)
      (post.tags || []).forEach(tag => {
        if (tag.toLowerCase().includes(word)) {
          score += tag.toLowerCase() === word ? 25 : 12;
        }
      });
      
      // 摘要匹配 (权重中等)
      if ((post.excerpt || '').toLowerCase().includes(word)) {
        score += 10;
      }
      
      // 内容匹配 (权重较低)
      if ((post.content || '').toLowerCase().includes(word)) {
        score += 5;
      }
    });
    
    return { ...post, searchScore: score };
  }).filter(post => post.searchScore > 0);
  
  // 按分数排序，分数相同时按日期排序
  return scoredPosts.sort((a, b) => {
    if (b.searchScore !== a.searchScore) {
      return b.searchScore - a.searchScore;
    }
    return new Date(b.date) - new Date(a.date);
  });
};

/**
 * 高亮搜索关键词
 * @param {string} text - 原始文本
 * @param {string} query - 搜索关键词
 * @returns {string} 包含高亮标记的HTML字符串
 */
export const highlightSearchTerm = (text, query) => {
  if (!query || query.trim() === '') {
    return text;
  }

  const searchTerm = query.trim();
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
};

/**
 * 转义正则表达式特殊字符
 * @param {string} string - 需要转义的字符串
 * @returns {string} 转义后的字符串
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * 获取搜索建议
 * @param {Array} posts - 文章数组
 * @param {string} query - 搜索关键词
 * @returns {Array} 搜索建议数组
 */
export const getSearchSuggestions = (posts, query) => {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const suggestions = new Set();

  posts.forEach(post => {
    // 添加匹配的标题
    if (post.title.toLowerCase().includes(searchTerm)) {
      suggestions.add(post.title);
    }
    
    // 添加匹配的标签
    post.tags.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5); // 限制建议数量
};