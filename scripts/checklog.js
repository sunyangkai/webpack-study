const { execSync } = require('child_process');

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function checkMerge() {
  const currentBranch = getCurrentBranch();
  console.log('currentBranch', currentBranch)
  const mergeLog = execSync(`git log origin/${currentBranch}..${currentBranch}`).toString(); // --merges --pretty=format:"%s"
  console.log('mergeLog')
  console.log(mergeLog)
  
  console.log('xx')
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
