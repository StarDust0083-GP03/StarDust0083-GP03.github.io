# 使用 gh-pages 包部署 GitHub Pages 指南

## 🚀 **gh-pages 包的优势**

- ✅ **简单易用** - 一行命令即可部署
- ✅ **自动处理** - 自动创建和管理 gh-pages 分支
- ✅ **灵活配置** - 支持多种部署选项
- ✅ **CI/CD 友好** - 完美集成 GitHub Actions
- ✅ **历史保留** - 保留部署历史记录

## 📦 **安装和配置**

你的项目已经安装了 `gh-pages` 包：
```bash
npm install --save-dev gh-pages
```

## 🎯 **部署方式**

### **方式1：本地部署（推荐）**
```bash
# 构建并部署
npm run deploy

# 或者分别执行
npm run build
npm run deploy
```

### **方式2：CI/CD 自动部署**
每次推送到 main 分支时自动部署：
```bash
git push origin main
```

### **方式3：手动部署**
```bash
# 手动构建和部署
npm run build
npm run deploy:manual
```

## ⚙️ **配置选项**

### **package.json 脚本**
```json
{
  "scripts": {
    "predeploy": "npm run build",      // 预部署：自动构建
    "deploy": "gh-pages -d build",     // 基础部署
    "deploy:ci": "npm run build && node gh-pages.config.js",  // CI 部署
    "deploy:local": "npm run build && gh-pages -d build -b gh-pages",  // 本地部署
    "deploy:manual": "gh-pages -d build -b gh-pages --repo https://github.com/用户名/仓库名.git"
  }
}
```

### **gh-pages.config.js 配置**
配置文件包含以下优化：
- 🔐 **自动认证** - 使用 GITHUB_TOKEN
- 📝 **自定义提交信息** - 包含时间戳
- 🚀 **强制推送** - 解决冲突问题
- 📁 **缓存管理** - 使用本地缓存目录
- 🎯 **错误处理** - 详细的错误信息

## 🔧 **高级用法**

### **自定义部署分支**
```bash
# 部署到自定义分支
gh-pages -d build -b my-pages-branch
```

### **指定远程仓库**
```bash
# 使用 HTTPS
gh-pages -d build --repo https://github.com/用户名/仓库名.git

# 使用 SSH
gh-pages -d build --repo git@github.com:用户名/仓库名.git
```

### **自定义提交信息**
```bash
gh-pages -d build -m "自定义提交信息"
```

### **保留文件**
```bash
# 保留某些文件不被删除
gh-pages -d build --add
```

## 🚨 **常见问题解决**

### **问题1：权限拒绝**
```
remote: Permission to ... denied
```
**解决方案**：
1. 检查 GitHub Actions 权限设置
2. 使用个人访问令牌（PAT）
3. 确保仓库设置正确

### **问题2：构建失败**
```
Build failed
```
**解决方案**：
```bash
# 设置 CI=false 避免警告中断构建
CI=false npm run build
```

### **问题3：404 错误**
**解决方案**：
1. 检查 `homepage` 字段设置
2. 确认 gh-pages 分支已创建
3. 等待 GitHub Pages 构建完成

### **问题4：样式丢失**
**解决方案**：
```json
{
  "homepage": "https://你的用户名.github.io/仓库名"
}
```

## 📊 **部署状态检查**

### **查看部署历史**
```bash
# 查看 gh-pages 分支提交历史
git log --oneline origin/gh-pages
```

### **检查 GitHub Actions**
1. 进入仓库的 **Actions** 标签页
2. 查看最新的部署工作流
3. 检查是否有错误信息

### **验证部署结果**
```bash
# 检查网站是否可访问
curl -I https://stardust0083-gp03.github.io/
```

## 🎯 **最佳实践**

### **1. 分支管理**
- **main 分支** - 源代码
- **gh-pages 分支** - 部署文件
- 保持两个分支独立

### **2. 提交信息**
- 使用有意义的提交信息
- 包含部署时间戳
- 记录变更内容

### **3. 构建优化**
```bash
# 清理构建缓存
rm -rf build
rm -rf node_modules/.cache

# 重新构建
npm run build
```

### **4. 本地测试**
```bash
# 本地预览构建结果
npm run build
npx serve build
```

## 🚀 **立即开始**

### **第1步：本地测试部署**
```bash
npm run deploy
```

### **第2步：推送到 GitHub**
```bash
git add .
git commit -m "Configure gh-pages deployment"
git push origin main
```

### **第3步：监控部署**
- 查看 GitHub Actions 状态
- 访问部署后的网站
- 检查 gh-pages 分支

## 📚 **相关资源**

- [gh-pages 官方文档](https://github.com/tschaub/gh-pages)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [React 部署指南](https://create-react-app.dev/docs/deployment/#github-pages)

---

✅ **你的部署已经配置完成！**
- 🎯 使用 `npm run deploy` 进行本地部署
- 🔄 推送到 main 分支自动触发 CI 部署
- 📊 详细的配置和错误处理
- 🚀 优化的部署流程