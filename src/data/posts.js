// 博客文章数据
export const posts = [
  {
    id: 1,
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    date: '2025-10-04',
    categories: ['general', 'introduction'],
    tags: ['welcome', 'blog', 'introduction'],
    excerpt: 'Welcome to my new blog powered by React and GitHub Pages!',
    content: `# Welcome to StarDust0083 Blog

This is the first post on my new blog! I'm excited to share my thoughts, experiences, and knowledge with you.

## About This Blog

This blog is built using [React](https://reactjs.org/) and hosted on [GitHub Pages](https://pages.github.com/). It's a modern, fast, and interactive way to create a blog with a great user experience.

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

*This blog is powered by React and GitHub Pages.*`
  },
  {
    id: 2,
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
    id: 3,
    slug: 'javascript-tips-and-tricks',
    title: 'JavaScript Tips and Tricks for Better Code',
    date: '2025-10-06',
    categories: ['programming', 'javascript'],
    tags: ['javascript', 'tips', 'best-practices', 'coding'],
    excerpt: 'A collection of useful JavaScript tips and tricks to write cleaner, more efficient code.',
    content: `# JavaScript Tips and Tricks for Better Code

Here are some useful JavaScript tips that can help you write better, more efficient code.

## 1. Use Destructuring Assignment

\`\`\`javascript
// Instead of this
const name = user.name;
const email = user.email;

// Use this
const { name, email } = user;
\`\`\`

## 2. Template Literals for String Interpolation

\`\`\`javascript
// Instead of this
const message = 'Hello ' + name + ', welcome to ' + siteName;

// Use this
const message = \`Hello \${name}, welcome to \${siteName}\`;
\`\`\`

## 3. Arrow Functions for Cleaner Code

\`\`\`javascript
// Instead of this
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
  return num * 2;
});

// Use this
const doubled = numbers.map(num => num * 2);
\`\`\`

## 4. Use Optional Chaining

\`\`\`javascript
// Instead of this
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}

// Use this
console.log(user?.address?.street);
\`\`\`

## 5. Array Methods for Data Manipulation

\`\`\`javascript
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

// Filter active users
const activeUsers = users.filter(user => user.active);

// Get user names
const names = users.map(user => user.name);

// Find a specific user
const alice = users.find(user => user.name === 'Alice');
\`\`\`

These tips can help you write more readable and maintainable JavaScript code!`
  }
];

// 工具函数
export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug);
};

export const getAllPosts = () => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostsByCategory = (category) => {
  return posts.filter(post => post.categories.includes(category));
};

export const getPostsByTag = (tag) => {
  return posts.filter(post => post.tags.includes(tag));
};