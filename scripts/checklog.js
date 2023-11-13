const { execSync } = require('child_process');

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function checkMerge() {
  const currentBranch = getCurrentBranch();
  console.log('currentBranch', currentBranch)
  const mergeLog = execSync(`git log origin/${currentBranch}..${currentBranch} --merges --pretty=format:"%s"`).toString(); // --merges --pretty=format:"%s"
  if (!!mergeLog) {
    const msgs = mergeLog.split('\n');
    console.log(msgs)
    process.exit(1);
  }
//   process.exit(1);

//   // 检查逻辑q
//   const hasForbiddenMerge = mergeLog.split('\n').some(commitMessage => {
//     return commitMessage.startsWith('f') && commitMessage.includes('merge') && commitMessage.includes('bg');
//   });

//   if (hasForbiddenMerge) {
//     console.error('Error: Found a forbidden merge commit from "f" branch to "bg" branch.');
//     process.exit(1);
//   }
}

checkMerge();
