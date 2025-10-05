# StarDust0083 Blog - React Version

这是一个使用React重构的个人博客，原本基于Jekyll构建。新版本提供了更现代的用户体验和更好的交互性。

## 功能特性

- ✨ 现代化的React单页应用
- 📱 响应式设计，支持移动端
- 📝 博客文章统一展示
- 🏷️ 分类和标签系统
- 🔍 文章详情页面
- 📄 关于页面
- 🚀 GitHub Pages自动部署

## 项目结构

```
src/
├── components/          # React组件
│   ├── Header.js       # 页面头部
│   ├── Footer.js       # 页面底部
│   └── MarkdownRenderer.js  # Markdown渲染器
├── pages/              # 页面组件
│   ├── Home.js         # 首页
│   ├── About.js        # 关于页面
│   └── PostDetail.js   # 文章详情页
├── data/               # 数据文件
│   └── posts.js        # 博客文章数据
├── utils/              # 工具函数
│   └── dateUtils.js    # 日期处理工具
├── App.js              # 主应用组件
└── index.js            # 应用入口
```

## 开发指南

### 安装依赖

由于PowerShell执行策略限制，请使用以下方法之一安装依赖：

**方法1：使用CMD**
```cmd
npm install
```

**方法2：临时设置执行策略（管理员权限）**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

### 部署到GitHub Pages

```bash
npm run deploy
```

## 添加新文章

要添加新的博客文章，请编辑 `src/data/posts.js` 文件，在 `posts` 数组中添加新的文章对象：

```javascript
{
  id: 4,
  slug: 'your-post-slug',
  title: 'Your Post Title',
  date: '2025-10-07',
  categories: ['category1', 'category2'],
  tags: ['tag1', 'tag2'],
  excerpt: 'Post excerpt...',
  content: `# Your Post Content
  
  Write your post content here using Markdown syntax.`
}
```

## 自动部署

项目配置了GitHub Actions工作流，当代码推送到main分支时会自动构建并部署到GitHub Pages。

## 技术栈

- **React 18** - 用户界面库
- **React Router** - 客户端路由
- **CSS3** - 样式和布局
- **GitHub Pages** - 静态网站托管
- **GitHub Actions** - 自动化部署

## 从Jekyll迁移的改进

1. **更好的开发体验** - 热重载、现代化工具链
2. **组件化架构** - 可重用的UI组件
3. **更快的页面加载** - 单页应用，无需页面刷新
4. **更灵活的定制** - 易于添加交互功能
5. **现代化的代码** - ES6+语法，更好的代码组织

## 许可证

MIT License

## 联系方式

- GitHub: [StarDust0083-GP03](https://github.com/StarDust0083-GP03)
- Email: your-email@example.com