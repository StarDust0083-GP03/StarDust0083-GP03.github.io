# GitHub Pages 权限修复指南

## 🚨 **问题诊断**

你遇到的是典型的 **GitHub Pages 权限拒绝** 问题：
```
remote: Permission to StarDust0083-GP03/StarDust0083-GP03.github.io.git denied to github-actions[bot]
fatal: unable to access 'https://github.com/StarDust0083-GP03/StarDust0083-GP03.github.io.git/': The requested URL returned error: 403
```

## 🔧 **解决方案**

### **方案1：仓库设置检查（必须）**

1. **进入仓库设置**
   - 打开你的仓库页面
   - 点击 **Settings** → **Actions** → **General**

2. **配置 Workflow 权限**
   - ✅ 选择 **"Read and write permissions"**
   - ✅ 勾选 **"Allow GitHub Actions to create and approve pull requests"**
   - 点击 **Save**

3. **配置 Pages 设置**
   - 进入 **Settings** → **Pages**
   - **Source**: 选择 **"Deploy from a branch"**
   - **Branch**: 选择 **"gh-pages"** / **"root"**
   - 点击 **Save**

### **方案2：使用个人访问令牌（备选）**

如果方案1无效，创建个人访问令牌：

1. **创建令牌**
   - 进入 GitHub **Settings** → **Developer settings** → **Personal access tokens**
   - 点击 **Generate new token**
   - 名称：`GH_PAGES_TOKEN`
   - 过期时间：90 天或更长
   - 权限：勾选 **repo**（全部）
   - 点击 **Generate token**

2. **添加仓库密钥**
   - 进入你的仓库 **Settings** → **Secrets and variables** → **Actions**
   - 点击 **New repository secret**
   - 名称：`PERSONAL_TOKEN`
   - 值：粘贴刚才生成的令牌
   - 点击 **Add secret**

3. **修改工作流**
   将 `.github/workflows/deploy.yml` 中的：
   ```yaml
   github_token: ${{ secrets.GITHUB_TOKEN }}
   ```
   改为：
   ```yaml
   personal_token: ${{ secrets.PERSONAL_TOKEN }}
   ```

### **方案3：首次部署特殊处理**

对于 **username.github.io** 这种特殊仓库：

1. **手动创建 gh-pages 分支**
   ```bash
   # 本地创建 gh-pages 分支
   git checkout --orphan gh-pages
   git rm -rf .
   echo "Initial commit" > README.md
   git add README.md
   git commit -m "Initial gh-pages commit"
   git push origin gh-pages
   
   # 回到 main 分支
   git checkout main
   ```

2. **首次部署后设置**
   - 第一次部署可能需要在 **Settings** → **Pages** 中手动选择分支
   - 选择 **gh-pages** 分支后保存

## 🎯 **推荐操作顺序**

### **第1步：检查当前配置**
我已经更新了工作流文件，添加了：
- ✅ 必要的权限声明
- ✅ `force_orphan: true` 避免历史冲突
- ✅ `fetch-depth: 0` 获取完整历史

### **第2步：验证仓库设置**
按照 **方案1** 检查你的仓库设置

### **第3步：推送测试**
```bash
git add .github/workflows/deploy.yml
git commit -m "Fix GitHub Pages deployment permissions"
git push origin main
```

### **第4步：监控部署**
- 进入 **Actions** 标签页查看部署状态
- 如果仍然失败，尝试 **方案2** 的个人访问令牌

## 📊 **成功指标**

部署成功时你会看到：
- ✅ Actions 工作流显示绿色 ✓
- ✅ `gh-pages` 分支有新的提交
- ✅ **Settings** → **Pages** 显示绿色对勾
- ✅ 网站可访问：https://stardust0083-gp03.github.io/

## 🚨 **重要提醒**

对于 **StarDust0083-GP03.github.io** 这种用户名仓库：
- 首次部署可能需要手动干预
- 权限要求比普通仓库更严格
- 可能需要多次尝试才能成功

如果所有方案都失败，考虑：
1. 联系 GitHub 支持
2. 使用其他托管服务（如 Netlify、Vercel）
3. 创建新的普通仓库进行部署