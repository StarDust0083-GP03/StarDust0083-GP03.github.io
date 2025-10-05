import React from 'react';

const MarkdownRenderer = ({ content }) => {
  // 简单的Markdown渲染器
  const renderMarkdown = (text) => {
    // 处理标题
    text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 处理粗体
    text = text.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    
    // 处理斜体
    text = text.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // 处理链接
    text = text.replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // 处理代码块
    text = text.replace(/```([^`]*)```/gim, '<pre><code>$1</code></pre>');
    
    // 处理行内代码
    text = text.replace(/`([^`]*)`/gim, '<code>$1</code>');
    
    // 处理分隔线
    text = text.replace(/^---$/gim, '<hr>');
    
    // 处理段落
    text = text.replace(/\n\n/gim, '</p><p>');
    text = '<p>' + text + '</p>';
    
    // 清理空段落
    text = text.replace(/<p><\/p>/gim, '');
    text = text.replace(/<p><h/gim, '<h');
    text = text.replace(/<\/h([1-6])><\/p>/gim, '</h$1>');
    text = text.replace(/<p><hr><\/p>/gim, '<hr>');
    text = text.replace(/<p><pre>/gim, '<pre>');
    text = text.replace(/<\/pre><\/p>/gim, '</pre>');
    
    return text;
  };

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;