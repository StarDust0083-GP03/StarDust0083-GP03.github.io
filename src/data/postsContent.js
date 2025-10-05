/**
 * 文章内容数据
 * 这里存储实际的 Markdown 内容，模拟从 _posts 目录加载
 * 此文件由 scripts/syncPosts.js 自动生成
 */

export const postsContent = {
  '2025-10-04-welcome-to-my-blog.md': `---
layout: post
title: "Welcome to My Blog"
date: 2025-10-04 01:30:00 +0800
categories: [general, introduction]
tags: [welcome, blog, introduction]
excerpt: "Welcome to my new blog powered by Jekyll and GitHub Pages!"
---

# Welcome to StarDust0083 Blog

This is the first post on my new blog! I'm excited to share my thoughts, experiences, and knowledge with you.

## About This Blog

This blog is built using [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/). It's a simple, fast, and secure way to create a blog without worrying about databases or complex hosting setups.

## What to Expect

Here you'll find posts about:
- Technology and programming
- Personal projects and experiences
- Thoughts on various topics
- Tutorials and guides

## Get Started

Feel free to explore the blog and check out future posts. You can also:
- Follow me on social media
- Subscribe to the RSS feed
- Leave comments on posts

Thank you for visiting, and I hope you enjoy reading!

---

*This blog is powered by Jekyll and GitHub Pages.*`,
  '2025-10-05-test-search.md': `---
layout: post
title: "测试搜索功能"
date: 2025-10-05 10:00:00 +0800
categories: [test, search]
tags: [search, testing, react]
excerpt: "这篇文章用于测试搜索功能是否正常工作"
---

# 测试搜索功能

这是用于测试搜索功能的文章。这篇文章包含了各种关键词，比如 React、JavaScript、博客、搜索等。

## 功能测试

搜索功能应该能够找到包含以下关键词的内容：
- React 组件
- JavaScript 代码
- 博客文章
- 搜索优化

## 技术细节

这个博客使用了以下技术：
- React 18
- React Router
- Markdown 解析
- 智能搜索算法

希望搜索功能能够正常工作！`,
  '2025-10-06-react-blog-development-guide.md': `---
layout: post
title: "React Blog 开发指南"
date: 2025-10-06 15:30:00 +0800
categories: [tutorial, react]
tags: [react, blog, development, guide]
excerpt: "详细介绍如何使用 React 构建一个功能完整的博客系统"
---

# React Blog 开发指南

本文将介绍如何使用 React 构建一个功能完整的博客系统，包括文章管理、搜索功能、响应式设计等。

## 技术栈

- **React 18** - 前端框架
- **React Router** - 路由管理
- **Markdown** - 文章格式
- **GitHub Pages** - 免费托管

## 核心功能

### 1. 文章管理系统
- 支持 Markdown 格式
- 自动生成文章列表
- 文章分类和标签

### 2. 搜索功能
- 全文搜索
- 关键词高亮
- 实时搜索结果

### 3. 响应式设计
- 移动端适配
- 灵活的布局系统
- 优化的用户体验

## 部署流程

1. 本地开发测试
2. 构建生产版本
3. 部署到 GitHub Pages
4. 自定义域名配置

## 最佳实践

- 代码组织结构
- 性能优化技巧
- SEO 优化建议

希望这个指南对你有所帮助！`
};

// 添加更多文章内容的方法
export const addPostContent = (fileName, content) => {
  postsContent[fileName] = content;
};

// 获取所有可用的文章文件
export const getAvailablePostFiles = () => {
  return Object.keys(postsContent);
};