# GitHub Pages 部署配置指南

## 🚀 **配置步骤**

### **1. 仓库设置**
1. 进入 GitHub 仓库页面
2. 点击 **Settings** → **Pages**
3. 配置以下设置：
   - **Source**: GitHub Actions
   - **Branch**: 无需选择（由 Actions 自动处理）

### **2. 权限设置**
1. 进入 **Settings** → **Actions** → **General**
2. 确保以下权限已启用：
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

### **3. 部署流程**

#### **自动部署**
- 推送代码到 `main` 分支会自动触发部署
- 部署状态可在 **Actions** 标签页查看

#### **手动部署**
1. 进入 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow** → **Run workflow**

### **4. 部署状态检查**

#### **成功标志**
- ✅ Actions 工作流显示绿色 ✓
- ✅ GitHub Pages 显示绿色 ✓
- ✅ 网站可访问：https://stardust0083-gp03.github.io/

#### **常见问题**

**问题1：权限错误**
```
Permission denied to github-actions[bot]
```
**解决**：检查仓库的 Actions 权限设置

**问题2：构建失败**
```
npm ERR! missing script: build
```
**解决**：确保 package.json 中有 build 脚本

**问题3：页面空白**
**解决**：检查是否已经创建 `.nojekyll` 文件

### **5. 新部署流程特点**

✅ **官方推荐**：使用 GitHub 官方的部署动作
✅ **权限友好**：避免第三方动作的权限问题
✅ **并发控制**：防止多个部署同时进行
✅ **环境管理**：自动管理部署环境
✅ **URL 获取**：自动获取部署后的页面 URL

### **6. 本地测试**

在推送前，可以本地测试构建：
```bash
# 安装依赖
npm install

# 本地开发
npm start

# 生产构建测试
npm run build

# 本地预览构建结果
npx serve -s build
```

### **7. 部署验证**

部署完成后，检查以下内容：
- [ ] 网站可以正常访问
- [ ] 所有链接都能正常工作
- [ ] 样式正确加载
- [ ] 交互功能正常

## 🎯 **下一步**

1. 推送这个配置文件到 main 分支
2. 等待自动部署完成（约2-3分钟）
3. 检查部署状态
4. 访问你的网站验证功能