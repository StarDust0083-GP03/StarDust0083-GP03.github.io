// 部署测试脚本
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始测试 gh-pages 部署配置...\n');

// 测试1：检查必要的文件和目录
console.log('📁 检查项目结构...');
const requiredFiles = [
  'package.json',
  'public/index.html',
  'src/App.js',
  '.nojekyll'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file} 存在`);
  } else {
    console.log(`  ❌ ${file} 不存在`);
  }
});

// 测试2：检查 package.json 配置
console.log('\n📦 检查 package.json 配置...');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // 检查 homepage
  if (pkg.homepage) {
    console.log(`  ✅ homepage: ${pkg.homepage}`);
  } else {
    console.log(`  ⚠️  未设置 homepage`);
  }
  
  // 检查脚本
  const scripts = ['predeploy', 'deploy', 'deploy:ci', 'deploy:local'];
  scripts.forEach(script => {
    if (pkg.scripts && pkg.scripts[script]) {
      console.log(`  ✅ ${script}: ${pkg.scripts[script]}`);
    } else {
      console.log(`  ❌ 缺少 ${script} 脚本`);
    }
  });
  
  // 检查依赖
  if (pkg.devDependencies && pkg.devDependencies['gh-pages']) {
    console.log(`  ✅ gh-pages 版本: ${pkg.devDependencies['gh-pages']}`);
  } else {
    console.log(`  ❌ 未安装 gh-pages`);
  }
  
} catch (error) {
  console.log(`  ❌ 读取 package.json 失败: ${error.message}`);
}

// 测试3：检查 GitHub Actions 配置
console.log('\n🔄 检查 GitHub Actions 配置...');
const workflowPath = '.github/workflows/deploy.yml';
if (fs.existsSync(workflowPath)) {
  console.log(`  ✅ deploy.yml 存在`);
  
  const workflow = fs.readFileSync(workflowPath, 'utf8');
  const checks = [
    { name: 'Node.js 设置', pattern: /actions\/setup-node@v4/ },
    { name: 'Git 配置', pattern: /git config/ },
    { name: 'gh-pages 部署', pattern: /deploy:ci/ },
    { name: '权限设置', pattern: /permissions:/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(workflow)) {
      console.log(`    ✅ ${check.name}`);
    } else {
      console.log(`    ⚠️  ${check.name} 未找到`);
    }
  });
} else {
  console.log(`  ❌ deploy.yml 不存在`);
}

// 测试4：检查 .nojekyll 文件
console.log('\n🚫 检查 .nojekyll 文件...');
if (fs.existsSync('.nojekyll')) {
  console.log(`  ✅ .nojekyll 文件存在`);
} else {
  console.log(`  ❌ .nojekyll 文件不存在`);
}

// 测试5：环境变量检查
console.log('\n🔐 检查环境变量...');
if (process.env.GITHUB_TOKEN) {
  console.log(`  ✅ GITHUB_TOKEN 已设置`);
} else {
  console.log(`  ℹ️  GITHUB_TOKEN 未设置（在 GitHub Actions 中会提供）`);
}

// 测试6：构建测试（可选）
console.log('\n🏗️  构建测试...');
if (fs.existsSync('src/App.js')) {
  console.log(`  ✅ React 应用源文件存在`);
  console.log(`  💡 运行 "npm run build" 测试构建`);
} else {
  console.log(`  ❌ React 应用源文件不存在`);
}

console.log('\n📋 部署准备检查完成！');
console.log('\n🎯 **下一步操作：**');
console.log('1. 本地测试: npm run deploy:local');
console.log('2. 推送到 GitHub: git push origin main');
console.log('3. 监控部署: 查看 GitHub Actions 状态');
console.log('\n🔗 部署地址: https://stardust0083-gp03.github.io/');