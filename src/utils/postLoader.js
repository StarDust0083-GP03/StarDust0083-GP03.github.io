/**
 * 从 _posts 目录加载 Markdown 文章
 * 支持 Jekyll 格式的 front matter
 */

/**
 * 解析 Jekyll 格式的 front matter (增强版本，支持 YAML 数组格式)
 */
const parseFrontMatter = (content) => {
    try {
        // 提取 front matter
        const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

        if (!frontMatterMatch) {
            return { metadata: {}, body: content };
        }

        const frontMatterText = frontMatterMatch[1];
        const mainContent = frontMatterMatch[2];
        const metadata = {};
        const lines = frontMatterText.split('\n');
        
        let i = 0;
        while (i < lines.length) {
            const line = lines[i].trim();
            
            // 跳过空行
            if (!line) {
                i++;
                continue;
            }
            
            // 处理数组格式 (tags, categories 等)
            if (line.match(/^(.+?):\s*$/)) {
                const key = line.match(/^(.+?):\s*$/)[1].trim();
                const arrayValues = [];
                i++;
                
                // 收集数组元素
                while (i < lines.length && lines[i].match(/^\s*-\s+(.+)$/)) {
                    const arrayItem = lines[i].match(/^\s*-\s+(.+)$/)[1].trim();
                    arrayValues.push(arrayItem);
                    i++;
                }
                
                if (arrayValues.length > 0) {
                    metadata[key] = arrayValues;
                }
            }
            // 处理简单的键值对
            else if (line.match(/^(.+?):\s*(.+)$/)) {
                const match = line.match(/^(.+?):\s*(.+)$/);
                const key = match[1].trim();
                let value = match[2].trim();
                
                // 处理引号字符串
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                metadata[key] = value;
                i++;
            } else {
                i++;
            }
        }

        return { metadata, body: mainContent };
    } catch (error) {
        console.error('解析 front matter 失败:', error);
        return { metadata: {}, body: content };
    }
};

// 从文件名生成 slug
const generateSlug = (filename) => {
    // 移除日期部分 (YYYY-MM-DD-)
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    return slug;
};

import { loadMarkdownFile, getAvailableMarkdownFiles } from './markdownLoader';

// 从日期字符串提取纯日期（移除时间部分）
const extractDate = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0];

    // 处理 Jekyll 日期格式：2025-10-04 01:30:00 +0800
    const dateMatch = dateString.match(/^(\d{4}-\d{2}-\d{2})/);
    return dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
};

// 动态加载 Markdown 文件
const loadMarkdownFiles = () => {
    try {
        const availableFiles = getAvailableMarkdownFiles();
        const posts = [];

        availableFiles.forEach(fileName => {
            const fileContent = loadMarkdownFile(fileName);

            if (fileContent) {
                try {
                    const { metadata, body } = parseFrontMatter(fileContent);
                    const slug = generateSlug(fileName);

                    console.log(metadata);
                    posts.push({
                        slug,
                        title: metadata.title || 'Untitled',
                        date: extractDate(metadata.date),
                        tags: metadata.tags || [],
                        excerpt: metadata.excerpt || body.substring(0, 200).replace(/[#*`]/g, '') + '...',
                        content: body
                    });
                } catch (error) {
                    console.error(`解析文件 ${fileName} 失败:`, error);
                }
            }
        });

        // 如果没有找到任何 Markdown 文件，使用模拟数据
        if (posts.length === 0) {
            console.warn('未找到任何 Markdown 文件，使用模拟数据');
            return getMockPosts();
        }

        return posts;
    } catch (error) {
        console.error('加载 Markdown 文件失败:', error);
        // 如果动态加载失败，使用模拟数据
        return getMockPosts();
    }
};

// 模拟数据作为后备
const getMockPosts = () => ([
    {
        slug: 'welcome-to-my-blog',
        title: 'Welcome to My Blog',
        date: '2025-10-04',
        categories: ['general', 'introduction'],
        tags: ['welcome', 'blog', 'introduction'],
        excerpt: 'Welcome to my new blog powered by Jekyll and GitHub Pages!',
        content: `# Welcome to StarDust0083 Blog

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

*This blog is powered by Jekyll and GitHub Pages.*`
    },
    {
        slug: 'react-vs-jekyll',
        title: 'Why I Migrated from Jekyll to React',
        date: '2025-10-05',
        categories: ['technology', 'web-development'],
        tags: ['react', 'jekyll', 'migration', 'frontend'],
        excerpt: 'A detailed comparison of Jekyll and React for building static blogs, and why I chose to migrate.',
        content: `# Why I Migrated from Jekyll to React

After using Jekyll for my blog, I decided to migrate to React. Here's why and how I did it.

## The Limitations of Jekyll

While Jekyll is great for simple blogs, I found some limitations:
- Limited interactivity
- Ruby dependency management
- Slower build times for larger sites
- Less flexibility for custom components

## Benefits of React

React offers several advantages:
- **Component-based architecture**: Reusable UI components
- **Rich ecosystem**: Vast library of packages and tools
- **Better developer experience**: Hot reloading, debugging tools
- **Modern JavaScript**: ES6+ features and modern development practices
- **Flexibility**: Easy to add interactive features

## Migration Process

The migration involved:
1. Setting up a new React project
2. Converting Jekyll templates to React components
3. Migrating content and styling
4. Setting up GitHub Pages deployment

## Conclusion

While Jekyll served me well initially, React provides the flexibility and modern development experience I was looking for. The migration was worth the effort!`
    },
    {
        slug: 'javascript-tips-and-tricks',
        title: 'JavaScript Tips and Tricks for Better Code',
        date: '2025-10-06',
        categories: ['programming', 'javascript'],
        tags: ['javascript', 'tips', 'best-practices', 'coding'],
        excerpt: 'A collection of useful JavaScript tips and tricks to write cleaner, more efficient code.',
        content: `# JavaScript Tips and Tricks for Better Code

Here are some useful JavaScript tips that can help you write better, more efficient code.

## 1. Use Destructuring Assignment

` + "```javascript\n// Instead of this\nconst name = user.name;\nconst email = user.email;\n\n// Use this\nconst { name, email } = user;\n```" + `

## 2. Template Literals for String Interpolation

` + "```javascript\n// Instead of this\nconst message = 'Hello ' + name + ', welcome to ' + siteName;\n\n// Use this\nconst message = \`Hello \${name}, welcome to \${siteName}\`;\n```" + `

## 3. Arrow Functions for Cleaner Code

` + "```javascript\n// Instead of this\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(function(num) {\n  return num * 2;\n});\n\n// Use this\nconst doubled = numbers.map(num => num * 2);\n```" + `

## 4. Use Optional Chaining

` + "```javascript\n// Instead of this\nif (user && user.address && user.address.street) {\n  console.log(user.address.street);\n}\n\n// Use this\nconsole.log(user?.address?.street);\n```" + `

## 5. Array Methods for Data Manipulation

` + "```javascript\nconst users = [\n  { name: 'Alice', age: 25, active: true },\n  { name: 'Bob', age: 30, active: false },\n  { name: 'Charlie', age: 35, active: true }\n];\n\n// Filter active users\nconst activeUsers = users.filter(user => user.active);\n\n// Get user names\nconst names = users.map(user => user.name);\n\n// Find a specific user\nconst alice = users.find(user => user.name === 'Alice');\n```" + `

These tips can help you write more readable and maintainable JavaScript code!`
    }
]);

// 异步加载文章
export const loadPosts = async () => {
    try {
        // 首先尝试加载实际的 Markdown 文件
        const posts = loadMarkdownFiles();

        return posts.map(post => ({
            ...post,
            id: post.slug // 使用 slug 作为 ID
        }));
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
};

// 根据 slug 获取单篇文章
export const getPostBySlug = async (slug) => {
    const posts = await loadPosts();
    return posts.find(post => post.slug === slug);
};

// 获取所有文章（按日期排序）
export const getAllPosts = async () => {
    const posts = await loadPosts();
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// 根据分类获取文章
export const getPostsByCategory = async (category) => {
    const posts = await loadPosts();
    return posts.filter(post => post.categories.includes(category));
};

// 根据标签获取文章
export const getPostsByTag = async (tag) => {
    const posts = await loadPosts();
    return posts.filter(post => post.tags.includes(tag));
};

// 获取所有分类
export const getAllCategories = async () => {
    const posts = await loadPosts();
    const categories = new Set();
    posts.forEach(post => {
        post.categories.forEach(category => categories.add(category));
    });
    return Array.from(categories).sort();
};

// 获取所有标签
export const getAllTags = async () => {
    const posts = await loadPosts();
    const tags = new Set();
    posts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
};