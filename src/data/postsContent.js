/**
 * 文章内容数据
 * 这里存储实际的 Markdown 内容，模拟从 _posts 目录加载
 * 此文件由 scripts/syncPosts.js 自动生成
 */

export const postsContent = {
  '2025-10-06 第一条博客.md': `---
title: 第一条博客
date: 2025-10-06
tags:
  - 杂谈
  - 日记
excerpt: 新建博客的原因
---

换新工作一年了，有点失去新鲜感。在Folo上每天都能看到大量的ai相关新闻，想着应该记录下自己的学习记录作为tracking，并且也算是给自己的一个督促。这个博客将会包含：读书笔记，agent构建尝试，前端自学记录……

五月天有首歌我很喜欢，“想象你的孙子孙女充满光的瞳孔，正等着你说你最光辉的一次传说”，有些事情现在不做，一辈子都不会做了。`,
  '2025-10-07 TODO&进度Track（定期更新）.md': `---
title: TODO&进度Track
date: 2025-10-07
tags:
  - TODO
excerpt: TODO&进度Track
---

## 书
DDIA 10%
谈判术 100% 博客 TODO
金字塔原理 0%
## 项目
React教程 30%
Agent练手项目 10%
6.824 
`
};

// 添加更多文章内容的方法
export const addPostContent = (fileName, content) => {
  postsContent[fileName] = content;
};

// 获取所有可用的文章文件
export const getAvailablePostFiles = () => {
  return Object.keys(postsContent);
};