/**
 * 同步脚本：将 _posts 目录中的 Markdown 文件同步到 postsContent.js
 * 使用方法：node scripts/syncPosts.js
 */

const fs = require('fs');
const path = require('path');

// 读取 _posts 目录
const postsDir = path.join(__dirname, '..', '_posts');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'postsContent.js');

function escapeJsString(str) {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function generatePostsContent() {
  try {
    // 读取目录中的所有 .md 文件
    const files = fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .sort(); // 按文件名排序

    if (files.length === 0) {
      console.log('未找到任何 Markdown 文件');
      return;
    }

    let content = `/**
 * 文章内容数据
 * 这里存储实际的 Markdown 内容，模拟从 _posts 目录加载
 * 此文件由 scripts/syncPosts.js 自动生成
 */

export const postsContent = {\n`;

    files.forEach((file, index) => {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const escapedContent = escapeJsString(fileContent);
      
      content += `  '${file}': \`${escapedContent}\``;
      
      if (index < files.length - 1) {
        content += ',';
      }
      content += '\n';
    });

    content += `};

// 添加更多文章内容的方法
export const addPostContent = (fileName, content) => {
  postsContent[fileName] = content;
};

// 获取所有可用的文章文件
export const getAvailablePostFiles = () => {
  return Object.keys(postsContent);
};`;

    // 写入文件
    fs.writeFileSync(outputFile, content, 'utf8');
    
    console.log(`✅ 成功同步 ${files.length} 个 Markdown 文件`);
    console.log('📁 文件列表：');
    files.forEach(file => console.log(`  - ${file}`));
    
  } catch (error) {
    console.error('同步失败:', error.message);
    process.exit(1);
  }
}

// 运行同步
console.log('🔄 开始同步 Markdown 文件...');
generatePostsContent();