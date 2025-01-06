const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');

const argv = yargs(hideBin(process.argv)).argv;

let command = 'cross-env NODE_ENV=dev webpack serve --mode development --config webpack/dev.js';

process.env.ARGVS = JSON.stringify(argv);

execSync(command, { stdio: 'inherit' });
