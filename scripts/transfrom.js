const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

//npm install @babel/parser @babel/traverse @babel/generator

function transformFile(filePath) {
  // 读取文件内容
  const code = fs.readFileSync(filePath, 'utf-8');
  // 解析代码为 AST
  const ast = parser.parse(code, {
    sourceType: 'module',
  });

  // 遍历 AST 并修改 require 语句
  traverse(ast, {
    CallExpression(path) {
      if (
        path.node.callee.name === 'require' &&
        path.parentPath.isVariableDeclarator()
      ) {
        const varName = path.parentPath.node.id.name;
        const requirePath = path.node.arguments[0].value;
        path.parentPath.replaceWithSourceString(`import ${varName} from '${requirePath}';`);
      }
    },
  });

  // 生成新代码
  const newCode = generator(ast, {}, code).code;

  // 覆盖原文件
  fs.writeFileSync(filePath, newCode);
}

// 遍历你的项目目录并处理每个文件
// 注意：这里需要根据你的项目结构来调整
function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile() && file.endsWith('.js')) {
      transformFile(fullPath);
    } else if (stat.isDirectory()) {
      processDirectory(fullPath);
    }
  });
}

processDirectory('src'); // 'src' 是你的源代码目录
