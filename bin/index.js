#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const packageCreator = require('../lib/package-creator');
const readmeCreator = require('../lib/readme-creator');
const licenseCreator = require('../lib/license-creator');
const indexCreator = require('../lib/index-creator');

console.log(chalk.green('Welcome to Node.js Package Builder!'));

const questions = [
  {
    type: 'input',
    name: 'packageName',
    message: 'Package name:',
    validate: input => !!input || 'Package name is required.'
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version:',
    default: '1.0.0',
    validate: input => !!input || 'Version is required.'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description:',
    validate: input => !!input || 'Description is required.'
  },
  {
    type: 'input',
    name: 'mainFile',
    message: 'Main file:',
    default: 'index.js',
    validate: input => !!input || 'Main file is required.'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author:',
    validate: input => !!input || 'Author is required.'
  },
  {
    type: 'input',
    name: 'license',
    message: 'License:',
    default: 'MIT',
    validate: input => !!input || 'License is required.'
  },
  {
    type: 'input',
    name: 'keywords',
    message: 'Keywords (comma separated):',
    filter: input => input.split(',').map(keyword => keyword.trim())
  },
  {
    type: 'input',
    name: 'scripts',
    message: 'Scripts (comma separated):',
    filter: input => input.split(',').map(script => script.trim())
  }
];

inquirer.prompt(questions).then(answers => {
  const { packageName, version, description, mainFile, author, license, keywords, scripts } = answers;

  // Create package.json
  packageCreator.createPackageJson(packageName, version, description, mainFile, author, license, keywords, scripts);

  // Create README.md
  readmeCreator.createReadme(packageName, description);

  // Create LICENSE
  licenseCreator.createLicense(license, author);

  // Create main file and scripts
  indexCreator.createMainFile(mainFile);
  scripts.forEach(scriptName => {
    indexCreator.createScriptFile(scriptName);
  });

  console.log(chalk.green('Package setup complete!'));
}).catch(error => {
  console.error(chalk.red('An error occurred during package setup:'), error);
});
