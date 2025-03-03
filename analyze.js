// 构建分析脚本
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 分析dist目录下的文件大小
function analyzeFileSize(directory) {
  const results = [];

  function processFile(filePath, relativePath) {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(filePath);
      files.forEach((file) => {
        processFile(path.join(filePath, file), path.join(relativePath, file));
      });
    } else {
      const fileContent = fs.readFileSync(filePath);
      const gzipSize = zlib.gzipSync(fileContent).length;

      results.push({
        path: relativePath,
        size: stats.size,
        gzipSize,
      });
    }
  }

  processFile(directory, '');

  return results.sort((a, b) => b.size - a.size);
}

// 格式化文件大小
function formatSize(size) {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
}

// 主函数
function main() {
  console.log('开始分析构建结果...');

  const distPath = path.resolve(__dirname, 'dist');
  if (!fs.existsSync(distPath)) {
    console.error('dist目录不存在，请先运行 npm run build');
    process.exit(1);
  }

  const results = analyzeFileSize(distPath);

  console.log('\n文件大小分析 (按大小降序排列):');
  console.log('----------------------------------------');
  console.log('文件路径\t\t文件大小\tGzip大小');
  console.log('----------------------------------------');

  results.forEach((item) => {
    console.log(`${item.path}\t\t${formatSize(item.size)}\t${formatSize(item.gzipSize)}`);
  });

  // 计算总大小
  const totalSize = results.reduce((sum, item) => sum + item.size, 0);
  const totalGzipSize = results.reduce((sum, item) => sum + item.gzipSize, 0);

  console.log('----------------------------------------');
  console.log(`总计:\t\t${formatSize(totalSize)}\t${formatSize(totalGzipSize)}`);
  console.log('----------------------------------------');

  console.log('\n分析完成!');
}

main();
