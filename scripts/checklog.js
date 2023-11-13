const { execSync } = require('child_process');

function checkMerge() {
  const mergeLog = execSync('git log --merges --pretty=format:"%s"').toString();
  if (mergeLog.includes('f') && mergeLog.includes('bg')) {
    console.error('Error: Found a merge commit from "f" branch to "bg" branch.');
    process.exit(1);
  }
}

checkMerge();