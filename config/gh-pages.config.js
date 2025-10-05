// gh-pages 部署配置
const ghpages = require('gh-pages');

// 部署配置选项
const options = {
  branch: 'gh-pages',
  
  repo: process.env.GITHUB_TOKEN 
    ? `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/StarDust0083-GP03/StarDust0083-GP03.github.io.git`
    : 'origin',
  
  message: `Deploy: ${new Date().toISOString()}`,
  
  user: {
    name: 'GitHub Actions Bot',
    email: 'actions@github.com'
  },
  
  push: true,
  force: true,
  dotfiles: true
};

// 执行部署
console.log('Deploying to GitHub Pages...');
ghpages.publish('build', options, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } else {
    console.log('Deployment successful!');
  }
});