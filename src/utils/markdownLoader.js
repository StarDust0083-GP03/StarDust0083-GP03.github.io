/**
 * Markdown 文件加载器
 * 用于在 React 应用中加载 Markdown 文件内容
 */

import { postsContent, getAvailablePostFiles } from '../data/postsContent';

export const loadMarkdownFile = (fileName) => {
  try {
    // 从 postsContent 中获取文章内容
    if (postsContent[fileName]) {
      return postsContent[fileName];
    }
    
    // 如果文件不存在，返回 null
    console.warn(`Markdown 文件 ${fileName} 未找到`);
    return null;
  } catch (error) {
    console.error(`加载 Markdown 文件 ${fileName} 失败:`, error);
    return null;
  }
};

// 获取所有可用的 Markdown 文件
export const getAvailableMarkdownFiles = () => {
  return getAvailablePostFiles();
};

// 动态添加新的 Markdown 文件（用于开发时）
export const addMarkdownFile = (fileName, content) => {
  postsContent[fileName] = content;
};