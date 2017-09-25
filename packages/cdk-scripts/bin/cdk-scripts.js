#!/usr/bin/env node

'use strict';

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

const args = process.argv.slice(2);
const script = args[0] || 'welcome';
const scriptArgs = args.slice(1);

const appDirectory = fs.realpathSync(process.cwd());
const scriptPath = path.resolve(appDirectory, `../scripts/${script}.js`);

if (!fs.existsSync(scriptPath)) {
  childProcess.spawnSync(
    'node',
    [require.resolve('../scripts/unknown'), script],
    {
      stdio: [0, 1, 2],
  });
  process.exit(0);
}

shell.echo(chalk.yellow(`

you have ran cdk-script:
${script}
with args:
${scriptArgs}
in folder:
${process.cwd()}
(appDirectory)
${appDirectory}
scriptPath:
${scriptPath}
`));


const result = childProcess.spawnSync('node', [scriptPath], {
  stdio: [0, 1, 2], // 'inherit'
});

console.log(result.status);
console.log(result.error);
