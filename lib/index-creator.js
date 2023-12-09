const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

/**
 * Generates an index.js file with a basic structure.
 * @param {string} mainFile - The name of the main file to create.
 */
function createIndex(mainFile) {
  const content = `'use strict';

// Entry point of the package
function main() {
  console.log('Package initialized successfully.');
}

module.exports = { main };
`;

  const filePath = path.join(process.cwd(), mainFile);

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      console.error(chalk.red(`Error creating ${mainFile}: ${err.message}`));
      process.exit(1);
    }
    console.log(chalk.green(`${mainFile} was created successfully.`));
  });
}

module.exports = { createIndex };
