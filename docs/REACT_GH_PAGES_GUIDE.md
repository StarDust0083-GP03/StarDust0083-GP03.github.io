# React + GitHub Pages 部署指南

基于 [react-gh-pages](https://github.com/gitname/react-gh-pages) 最佳实践

## 🚀 **部署流程特点**

### **方案优势**
✅ **简单直接**：单 job 工作流，构建和部署一体化
✅ **权限友好**：使用 `GITHUB_TOKEN`，无需复杂权限配置
✅ **历史保留**：保留提交历史，便于回滚
✅ **自定义提交**：使用原始提交信息作为部署消息
✅ **文件保护**：保留 `.nojekyll` 等重要文件

### **与传统方案对比**
| 特性 | 当前方案 | 官方 Actions 方案 |
|------|----------|-------------------|
| 复杂度 | 简单 | 复杂 |
| 权限要求 | 低 | 高 |
| 部署速度 | 快 | 中等 |
| 历史记录 | 保留 | 覆盖 |
| 错误恢复 | 容易 | 困难 |

## 📋 **配置步骤**

### **1. 仓库设置**
1. 进入 **Settings** → **Pages**
2. **Source**: 选择 "Deploy from a branch"
3. **Branch**: 选择 "gh-pages" / "root"
4. 点击 **Save**

### **2. 环境变量**
确保 `package.json` 中有：
```json
{
  "homepage": "https://your-username.github.io/your-repo-name"
}
```

### **3. 部署触发**

#### **自动部署**
- 推送代码到 `main` 分支
- GitHub Actions 自动构建并部署到 `gh-pages` 分支

#### **手动部署**
```bash
# 本地构建和部署
npm run deploy

# 或者使用 CI 专用脚本
npm run deploy:ci
```

## 🔧 **工作流详解**

### **触发条件**
```yaml
on:
  push:
    branches: [ main ]  # main 分支推送时触发
  workflow_dispatch:    # 支持手动触发
```

### **构建配置**
```yaml
env:
  CI: false              # 避免警告中断构建
  PUBLIC_URL: https://stardust0083-gp03.github.io  # 设置正确的公共URL
```

### **部署配置**
```yaml
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}  # 自动获取的token
    publish_dir: ./build                       # 构建输出目录
    publish_branch: gh-pages                   # 部署目标分支
    commit_message: ${{ github.event.head_commit.message }}  # 使用原始提交信息
    keep_files: true                           # 保留现有文件
    force_orphan: false                        # 不强制覆盖历史
```

## 🎯 **部署验证**

### **成功标志**
- ✅ Actions 工作流显示绿色 ✓
- ✅ `gh-pages` 分支有新的提交
- ✅ GitHub Pages 显示绿色 ✓
- ✅ 网站可正常访问

### **检查要点**
1. **构建日志**：检查是否有构建错误
2. **部署日志**：确认文件是否正确上传
3. **网站访问**：验证页面是否正常加载
4. **资源加载**：检查 CSS、JS 是否正确加载

## 🛠️ **常见问题解决**

### **问题1：404 错误**
**原因**：`homepage` 设置不正确
**解决**：检查 `package.json` 中的 `homepage` 字段

### **问题2：空白页面**
**原因**：路由配置问题
**解决**：确保使用 `HashRouter` 或正确配置 `BrowserRouter`

### **问题3：样式丢失**
**原因**：资源路径错误
**解决**：检查 `PUBLIC_URL` 环境变量

### **问题4：部署权限错误**
**原因**：GitHub Token 权限不足
**解决**：检查仓库的 Actions 权限设置

## 🚀 **高级配置**

### **自定义域名**
如果你有自定义域名：
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为你的域名（如：example.com）
3. 更新 `package.json` 中的 `homepage`

### **环境区分**
```json
{
  "scripts": {
    "deploy:dev": "npm run build && gh-pages -d build -r dev-repo",
    "deploy:prod": "npm run build && gh-pages -d build -r prod-repo"
  }
}
```

## 📊 **性能优化**

### **构建优化**
- 启用代码分割
- 压缩资源文件
- 使用 CDN 加速

### **部署优化**
- 缓存依赖包
- 并行化构建步骤
- 增量部署

这个方案结合了 react-gh-pages 的简洁性和 GitHub Actions 的自动化优势！