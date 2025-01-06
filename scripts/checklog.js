const execSync = require('child_process').execSync;

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

// function checkEslint() {
//   console.log('eslint 检测')
//   exec('eslint .', (err, stdout, stderr) => {
//     if (err) {
//         console.error(`ESLint 检查失败:\n${stdout}`);
//         console.log(err)
//         process.exit(1); // 非零退出码表示错误
//     }
//     console.log('ESLint 检查通过');
// });



// }



function checkMerge() {
  console.log('提交记录校验')
  const currentBranch = getCurrentBranch();
  console.log('当前分支', currentBranch)
  //   本地和远程分支之间的所有提交记录。通过 .. 范围，可以得到这两个分支之间的所有变更。
  //   --merges：这个选项限制只显示合并提交，即那些将不同分支的变更合并到当前分支的提交。
   //  --pretty=format:"%s"：只输出每个提交的提交信息（即提交的标题，不包含详细的提交内容）。
  const mergeLog = execSync(`git log origin/${currentBranch}..${currentBranch} --merges --pretty=format:"%s"`).toString(); 
  console.log('mergeLog', mergeLog)
  if (mergeLog) {
    const msgs = mergeLog.split('\n');
    console.log('合并分支记录:')
    msgs.forEach(msg => {
      console.log(msg)
    })
    for (let msg of msgs) {
        if (msg.includes('f-') && msg.includes('bg-')) {
            console.error('不能把bg分支合并进f分支，这样导致错误的代码上线!')
            console.error('错误合并信息:' + msg)
            process.exit(1);
        }
    }
  }
}
// checkEslint();
checkMerge();
