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

希望搜索功能能够正常工作！`
};

// 添加更多文章内容的方法
export const addPostContent = (fileName, content) => {
  postsContent[fileName] = content;
};

// 获取所有可用的文章文件
export const getAvailablePostFiles = () => {
  return Object.keys(postsContent);
};