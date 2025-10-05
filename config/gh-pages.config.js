// gh-pages 部署配置
const ghpages = require('gh-pages');

// 部署配置选项
const options = {
  // 分支名称
  branch: 'gh-pages',
  
  // 远程仓库名称
  repo: process.env.GITHUB_TOKEN 
    ? `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/StarDust0083-GP03/StarDust0083-GP03.github.io.git`
    : 'origin',
  
  // 构建目录
  src: 'build/**/*',
  
  // 提交信息
  message: `Deploy: ${new Date().toISOString()}`,
  
  // Git 配置
  git: 'git',
  
  // 用户信息
  user: {
    name: 'GitHub Actions Bot',
    email: 'actions@github.com'
  },
  
  // 克隆选项
  clone: '.gh-pages-cache',
  
  // 推送到远程
  push: true,
  
  // 强制推送（解决冲突）
  force: true,
  
  // 静默模式
  silent: false,
  
  // 忽略文件
  dotfiles: true,
  
  // 添加 .nojekyll 文件
  beforeAdd: function(git) {
    git.add('.nojekyll', 'build/.nojekyll');
  },
  
  // 部署完成回调
  callback: function(err) {
    if (err) {
      console.error('❌ 部署失败:', err);
      process.exit(1);
    } else {
      console.log('✅ 部署成功！');
      console.log('🌐 访问地址: https://stardust0083-gp03.github.io/');
    }
  }
};

// 执行部署
console.log('🚀 开始部署到 GitHub Pages...');
ghpages.publish('build', options, function(err) {
  if (err) {
    console.error('❌ 部署失败:', err);
    process.exit(1);
  } else {
    console.log('✅ 部署完成！');
  }
});